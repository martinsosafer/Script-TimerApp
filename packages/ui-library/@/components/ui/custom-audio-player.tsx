"use client";

import React, { useEffect, useRef, useState } from "react";
import PauseIcon from "@heroicons/react/24/solid/PauseIcon";
import PlayIcon from "@heroicons/react/24/solid/PlayIcon";

interface CustomAudioPlayerProps {
  src?: string;
}

const CustomAudioPlayer: React.FC<CustomAudioPlayerProps> = ({ src }) => {
  const [audio, setAudio] = useState(new Audio(src));
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioEl = audio;
    audioRef.current = audioEl;
    setAudio(audioEl);

    const onLoadedMetadata = () => {
      setDuration(audioEl.duration);
    };

    const onTimeUpdate = () => {
      setCurrentTime(audioEl.currentTime);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audioEl.addEventListener("loadedmetadata", onLoadedMetadata);
    audioEl.addEventListener("timeupdate", onTimeUpdate);
    audioEl.addEventListener("ended", onEnded);

    if (src) {
      audioEl.src = src;
      audioEl.load();
      audioEl
        .play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    }

    return () => {
      audioEl.removeEventListener("loadedmetadata", onLoadedMetadata);
      audioEl.removeEventListener("timeupdate", onTimeUpdate);
      audioEl.removeEventListener("ended", onEnded);
    };
  }, [src]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (e.target.valueAsNumber * duration) / 100;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-4">
        <button
          onClick={handlePlayPause}
          disabled={!src}
          className="text-gray-700"
        >
          {isPlaying ? (
            <PauseIcon className="h-6 w-6" />
          ) : (
            <PlayIcon className="h-6 w-6" />
          )}
        </button>
        <div className="relative flex-grow">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              style={{
                width: `${(currentTime / duration) * 100 || 0}%`,
                backgroundColor: isPlaying ? "blue" : "transparent",
                height: "100%",
              }}
            ></div>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeek}
            className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
          />
        </div>
        <div className="text-gray-700">
          {`${formatTime(currentTime)} / ${
            duration ? formatTime(duration) : "00:00"
          }`}
        </div>
      </div>
    </div>
  );
};

export { CustomAudioPlayer };
