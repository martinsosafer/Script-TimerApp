"use client";

import { useEffect, useRef, useState } from "react";

interface AudioPlayerProps {
  src: string;
}

export default function AudioPlayerShare({ src }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onerror = () => {
        setError("Error loading audio. Please try again later.");
      };
    }
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          setError("Error playing audio. Please try again later.");
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={togglePlayPause}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
      <audio ref={audioRef} src={src} />
    </div>
  );
}
