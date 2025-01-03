import React, { useEffect, useRef } from "react";

interface VideoPreviewProps {
  stream: MediaStream | null;
  recordingUrl?: string | null;
  isRecording?: boolean;
}

export function VideoPreview({
  stream,
  recordingUrl,
  isRecording,
}: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (recordingUrl) {
      videoElement.srcObject = null;
      videoElement.src = recordingUrl;
      videoElement.load();
    } else if (stream) {
      videoElement.srcObject = stream;
      videoElement
        .play()
        .catch((err) => console.error("Error playing video:", err));
    }

    return () => {
      if (videoElement.srcObject) {
        videoElement.srcObject = null;
      }
    };
  }, [stream, recordingUrl]);

  return (
    <video
      ref={videoRef}
      className="w-full max-w-2xl rounded-lg shadow-lg"
      autoPlay
      playsInline
      muted={!recordingUrl}
      controls={!!recordingUrl}
    />
  );
}
