import { useRef, useState } from "react";

import { toast } from "@voiceai/ui/@/components/ui/toast";

export function useAudioPlayer(audioRef: React.RefObject<HTMLAudioElement>) {
  const [audioSource, setAudioSource] = useState<string | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);

  const handleStreaming = async (params: {
    voice_id: string;
    voice_actor: string;
    message: string;
    stability: number;
    similarity: number;
    setLoading: (loading: boolean) => void;
    userPlan: string;
  }) => {
    const {
      voice_id,
      voice_actor,
      message,
      stability,
      similarity,
      setLoading,
      userPlan,
    } = params;

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
      const errorMessage = `Your plan only supports up to ${charLimit[userPlan]} characters.`;

      setLoading(false);

      toast({
        title: "Character Limit Exceeded",
        description: errorMessage,
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

      const mediaSource = new MediaSource();
      const objectUrl = URL.createObjectURL(mediaSource);
      setAudioSource(objectUrl);

      if (audioRef.current) {
        audioRef.current.src = objectUrl;
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }

      const audioChunks: Uint8Array[] = [];

      mediaSource.addEventListener("sourceopen", async () => {
        const sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");
        const reader = responseBody.getReader();

        const readStream = async () => {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              if (!sourceBuffer.updating && mediaSource.readyState === "open") {
                mediaSource.endOfStream();
              } else {
                sourceBuffer.addEventListener(
                  "updateend",
                  () => {
                    if (mediaSource.readyState === "open") {
                      mediaSource.endOfStream();
                    }
                  },
                  { once: true },
                );
              }
              break;
            }
            sourceBuffer.appendBuffer(value);
            audioChunks.push(value);
          }

          const audioBlob = new Blob(audioChunks, { type: "audio/mpeg" });
          const downloadUrl = URL.createObjectURL(audioBlob);
          setDownloadLink(downloadUrl);

          setLoading(false);
        };

        readStream().catch((error) => {
          console.error("Error streaming audio:", error);
          if (!sourceBuffer.updating && mediaSource.readyState === "open") {
            mediaSource.endOfStream("decode");
          } else {
            sourceBuffer.addEventListener(
              "updateend",
              () => {
                if (mediaSource.readyState === "open") {
                  mediaSource.endOfStream("decode");
                }
              },
              { once: true },
            );
          }
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
    handleStreaming,
    handleCloseAudio,
  };
}
