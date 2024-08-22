import { useCallback, useRef, useState } from "react";

import { toast, ToastAction } from "@voiceai/ui/@/components/ui/toast";

export function useTextToSpeech() {
  const [audioSource, setAudioSource] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [downloadLink, setDownloadLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);
  const toggleAudioRef = useRef(null);

  const handleStreaming = async ({
    voice_id,
    voice_actor,
    message,
    stability,
    similarity,
    userPlan,
  }) => {
    if (!message || message.trim() === "") {
      toast({
        title: "Error",
        description: "Please remember to write a script before making a voice!",
      });
      return;
    }

    setLoading(true);
    const charLimit = {
      FREE: 300,
      FREE_TRIAL: 2000,
      STUDENT: 2000,
      CREATOR: 5000,
      BUSINESS: 10000,
    };

    if (message.length > charLimit[userPlan]) {
      const errorMessage = `Your plan only supports up to ${charLimit[userPlan]} characters`;
      setLoading(false);
      toast({ title: "Character Limit Exceeded", description: errorMessage });
      return;
    }

    try {
      const response = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: message,
          voice_id,
          voice_actor,
          stability,
          similarity,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch the text-to-speech stream.");
      }

      const mediaSource = new MediaSource();
      const objectUrl = URL.createObjectURL(mediaSource);
      setAudioSource(objectUrl);
      audioRef.current.src = objectUrl;

      const audioChunks = [];
      mediaSource.addEventListener("sourceopen", async () => {
        const sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");
        const reader = response.body.getReader();

        const readStream = async () => {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            sourceBuffer.appendBuffer(value);
            audioChunks.push(value);
          }
          const audioBlob = new Blob(audioChunks, { type: "audio/mpeg" });
          setDownloadLink(URL.createObjectURL(audioBlob));
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

        audioRef.current.play().catch(console.error);
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

  return {
    audioSource,
    showPlayer,
    downloadLink,
    loading,
    handleStreaming,
    audioRef,
    toggleAudioRef,
  };
}
