import { useRef, useState } from "react";

import { toast } from "@voiceai/ui/@/components/ui/toast";

const useStreamingAudio = () => {
  const [audioSource, setAudioSource] = useState<string | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const toggleAudioRef = useRef<HTMLButtonElement>(null);

  const handleStreaming = async ({
    voice_id,
    voice_actor,
    message,
    stability,
    similarity,
    setLoading,
    userPlan,
  }: {
    voice_id: string;
    voice_actor: string;
    message: string;
    stability: number;
    similarity: number;
    setLoading: (loading: boolean) => void;
    userPlan: string;
  }) => {
    if (!message || message.trim() === "") {
      toast({
        title: "Error",
        description: "Please remember to write a script before making a voice!",
      });
      return;
    }

    setLoading(true);

    const charLimit: Record<string, number> = {
      FREE: 300,
      FREE_TRIAL: 2000,
      STUDENT: 2000,
      CREATOR: 5000,
      BUSINESS: 10000,
    };

    if (message.length > charLimit[userPlan]) {
      const errorMessages: Record<string, string> = {
        FREE: "Free plan only supports up to 300 characters",
        FREE_TRIAL: "Your plan only supports up to 2000 characters",
        STUDENT: "Your plan only supports up to 2000 characters",
        CREATOR: "Your plan only supports up to 5000 characters",
        BUSINESS: "Your plan only supports up to 10000 characters",
      };

      setLoading(false);

      toast({
        title: "Character Limit Exceeded",
        description: errorMessages[userPlan] || "Please try again later",
      });

      return;
    }

    try {
      const response = await fetch("/api/voice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: message,
          voice_id,
          voice_actor,
          stability,
          similarity,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from API:", errorText);
        throw new Error("Failed to fetch the text-to-speech stream.");
      }

      const responseBody = response.body;
      if (!responseBody) {
        throw new Error("Response body is null.");
      }

      const reader = responseBody.getReader();
      const audioChunks: Uint8Array[] = [];

      const readStream = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          audioChunks.push(value);
        }

        const audioBlob = new Blob(audioChunks, { type: "audio/mpeg" });
        const objectUrl = URL.createObjectURL(audioBlob);
        setAudioSource(objectUrl);
        setDownloadLink(objectUrl);

        if (audioRef.current) {
          audioRef.current.src = objectUrl;
          audioRef.current.play().catch((error) => {
            console.error("Error playing audio:", error);
          });
        }

        setLoading(false);
      };

      readStream().catch((error) => {
        console.error("Error streaming audio:", error);
        setLoading(false);
        toast({
          title: "Something went wrong",
          description: "Please try again later",
        });
      });

      setShowPlayer(true);
    } catch (error) {
      console.error("Error streaming audio:", error);
      setLoading(false);
      toast({
        title: "Something went wrong",
        description: "Please try again later",
      });
    }
  };

  const handleCloseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setShowPlayer(false);
    setAudioSource(null);
  };

  return {
    audioSource,
    showPlayer,
    downloadLink,
    audioRef,
    toggleAudioRef,
    handleStreaming,
    handleCloseAudio,
  };
};

export default useStreamingAudio;
