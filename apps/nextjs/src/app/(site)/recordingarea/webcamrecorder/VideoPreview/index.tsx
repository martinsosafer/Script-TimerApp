import React from "react";

interface VideoPreviewProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}

export function VideoPreview({ videoRef }: VideoPreviewProps) {
  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      className="h-40 w-full rounded-md border"
    />
  );
}