import { useEffect, useRef, useState } from "react";

import { Button } from "@voiceai/ui";

interface VideoPreviewProps {
  stream: MediaStream | null;
  recordingUrl?: string | null;
  isRecording?: boolean;
  onReset: () => void;
}

export function VideoPreview({
  stream,
  recordingUrl,
  isRecording,
  onReset,
}: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showResetButton, setShowResetButton] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

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

    return () => {
      if (videoElement.srcObject) {
        videoElement.srcObject = null;
      }
    };
  }, [stream, recordingUrl]);

  const handleReset = () => {
    onReset();
    setShowResetButton(false);
  };

  return (
    <div className="relative">
      <video
        ref={videoRef}
        className="w-full max-w-2xl rounded-lg shadow-lg"
        autoPlay
        playsInline
        muted={!recordingUrl}
        controls={!!recordingUrl}
      />
      {showResetButton && (
        <Button className="absolute right-2 top-2" onClick={handleReset}>
          Reset to Webcam
        </Button>
      )}
    </div>
  );
}
