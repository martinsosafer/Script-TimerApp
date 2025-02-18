import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@voiceai/ui";
import { IconSpinner } from "@voiceai/ui/@/components/ui/icons";

interface VideoPreviewProps {
  stream: MediaStream | null;
  recordingUrl?: string | null;
  isRecording?: boolean;
  onReset: () => void;
  countdown: number | null;
  isRendering?: boolean;
}

export function VideoPreview({
  stream,
  recordingUrl,
  isRecording,
  onReset,
  countdown,
  isRendering,
}: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showResetButton, setShowResetButton] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const updateAspectRatio = () => {
      if (videoElement.videoWidth && videoElement.videoHeight) {
        setAspectRatio(videoElement.videoWidth / videoElement.videoHeight);
      }
    };

    if (recordingUrl) {
      videoElement.srcObject = null;
      videoElement.src = recordingUrl;
      videoElement.load();
      videoElement
        .play()
        .catch((err) => console.error("Error playing video:", err));
      setShowResetButton(true);
    } else if (stream) {
      videoElement.srcObject = stream;
      videoElement
        .play()
        .catch((err) => console.error("Error playing video:", err));
      setShowResetButton(false);
    }

    videoElement.addEventListener("loadedmetadata", updateAspectRatio);

    return () => {
      if (videoElement.srcObject) {
        videoElement.srcObject = null;
      }
      videoElement.removeEventListener("loadedmetadata", updateAspectRatio);
    };
  }, [stream, recordingUrl]);

  const handleReset = () => {
    onReset();
    setShowResetButton(false);
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div
        className="relative w-full"
        style={{
          paddingBottom: aspectRatio ? `${100 / aspectRatio}%` : "56.25%",
        }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full rounded-lg object-cover shadow-lg"
          autoPlay
          playsInline
          muted={!recordingUrl}
          controls={!!recordingUrl}
        />
        {isRecording && (
          <div className="absolute left-2 top-2 flex items-center rounded-full bg-red-500 px-2 py-1 text-sm text-white">
            <IconSpinner className="mr-2 h-4 w-4 animate-spin" />
            Recording
          </div>
        )}
        {showResetButton && (
          <Button className="absolute right-2 top-2" onClick={handleReset}>
            Start New Recording
          </Button>
        )}
        <AnimatePresence>
          {countdown !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
            >
              <motion.div
                key={countdown}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5 }}
                className="text-6xl font-bold text-white"
              >
                {countdown === 0 ? "Go!" : countdown}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isRendering && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50"
            >
              <IconSpinner className="mb-4 h-8 w-8 animate-spin text-white" />
              <p className="text-lg font-medium text-white">
                Please wait, we are rendering your video...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
