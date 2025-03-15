import { useRef, useState } from "react";

import { toast } from "@voiceai/ui/@/components/ui/toast";

const useStreamingAudio = () => {
  const [audioSource, setAudioSource] = useState<string | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const toggleAudioRef = useRef<HTMLButtonElement>(null);

  // Feature detection for MediaSource support (replaces user-agent sniffing)
  const isMediaSourceSupported =
    typeof MediaSource !== "undefined" &&
    MediaSource.isTypeSupported("audio/mpeg");

  const handleStreaming = async ({
    voice_id,
    voice_actor,
    message,
    stability,
    similarity,
    setLoading,
    userPlan,
  }: {
    voice_id: any;
    voice_actor: any;
    message: any;
    stability: any;
    similarity: any;
    setLoading: any;
    userPlan: any;
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
      FREE: 500,
      FREE_TRIAL: 1600,
      STUDENT: 2000,
      STUDENTCLMONTHLY: 2000,
      STUDENTCLYEARLY: 2000,
      CREATOR: 5000,
      CREATORCLMO: 5000,
      CREATORCLYR: 5000,
      BUSINESS: 10000,
      BUSINESSCLMO: 10000,
      BUSINESSCLYR: 10000,
    };

    if (message.length > charLimit[userPlan]) {
      const errorMessages: Record<string, string> = {
        FREE: "Free plan only supports up to 300 characters",
        FREE_TRIAL: "Your plan only supports up to 2000 characters",
        STUDENT: "Your plan only supports up to 2000 characters",
        STUDENTCLMONTHLY: "Your plan only supports up to 2000 characters",
        STUDENTCLYEARLY: "Your plan only supports up to 2000 characters",
        CREATOR: "Your plan only supports up to 5000 characters",
        CREATORCLMO: "Your plan only supports up to 5000 characters",
        CREATORCLYR: "Your plan only supports up to 5000 characters",
        BUSINESS: "Your plan only supports up to 10000 characters",
        BUSINESSCLMO: "Your plan only supports up to 10000 characters",
        BUSINESSCLYR: "Your plan only supports up to 10000 characters",
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
        const errorData = await response.json();
        console.error("Error response from API:", errorData);
        throw new Error(
          errorData.error || "Failed to fetch the text-to-speech stream.",
        );
      }

      const responseBody = response.body;
      if (!responseBody) {
        throw new Error("Response body is null.");
      }

      if (!isMediaSourceSupported) {
        // Fallback for browsers without MediaSource support (iOS, Firefox, etc.)
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
            title: "Error",
            description: error.message || "Please try again later",
          });
        });

        setShowPlayer(true);
      } else {
        // MediaSource streaming for supported browsers (Chrome, Edge, etc.)
        const mediaSource = new MediaSource();
        const objectUrl = URL.createObjectURL(mediaSource);
        setAudioSource(objectUrl);
        if (audioRef.current) {
          audioRef.current.src = objectUrl;
        }

        const audioChunks: Uint8Array[] = [];

        mediaSource.addEventListener("sourceopen", async () => {
          const sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");
          const reader = responseBody.getReader();

          const readStream = async () => {
            const processBuffer = async (value: Uint8Array) => {
              return new Promise<void>((resolve, reject) => {
                const onBufferAppended = () => {
                  sourceBuffer.removeEventListener(
                    "updateend",
                    onBufferAppended,
                  );
                  resolve();
                };
                sourceBuffer.addEventListener("updateend", onBufferAppended);
                try {
                  sourceBuffer.appendBuffer(value);
                  audioChunks.push(value);
                } catch (error) {
                  reject(error);
                }
              });
            };

            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                if (
                  !sourceBuffer.updating &&
                  mediaSource.readyState === "open"
                ) {
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
              await processBuffer(value);
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

          if (audioRef.current) {
            audioRef.current.play().catch((error) => {
              console.error("Error playing audio:", error);
            });
          }
        });

        setShowPlayer(true);
      }
    } catch (error) {
      console.error("Error streaming audio:", error);
      setLoading(false);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again later.";

      toast({
        title: "Error",
        description: errorMessage,
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
