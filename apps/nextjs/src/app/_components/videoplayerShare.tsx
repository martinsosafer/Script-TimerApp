"use client";

import { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
  src: string;
}

export default function VideoPlayerShare({ src }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onerror = () => {
        setError("Error loading video. Please try again later.");
      };
    }
  }, []);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {
          setError("Error playing video. Please try again later.");
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <video ref={videoRef} src={src} className="w-full max-w-3xl" />
      <button
        onClick={togglePlayPause}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}
