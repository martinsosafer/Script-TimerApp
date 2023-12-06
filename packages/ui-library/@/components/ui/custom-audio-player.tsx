import React, { useEffect, useState } from "react";
import PauseIcon from "@heroicons/react/24/solid/PauseIcon";
import PlayIcon from "@heroicons/react/24/solid/PlayIcon";

interface CustomAudioPlayerProps {
  src?: string; // src can be optional
}

const CustomAudioPlayer: React.FC<CustomAudioPlayerProps> = ({ src }) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    // Initialize audio only when src is defined
    if (src) {
      const audioEl = new Audio(src);
      setAudio(audioEl);
      audioEl.addEventListener("loadedmetadata", () => {
        setDuration(audioEl.duration);
      });
      audioEl.addEventListener("timeupdate", () => {
        setCurrentTime(audioEl.currentTime);
      });

      // Clean up the event listeners when component unmounts
      return () => {
        audioEl.pause();
        audioEl.removeEventListener("loadedmetadata", () => {});
        audioEl.removeEventListener("timeupdate", () => {});
      };
    }
  }, [src]);

  useEffect(() => {
    if (isPlaying && audio) {
      audio.play();
    } else {
      audio?.pause();
    }
  }, [isPlaying, audio]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <button onClick={togglePlayPause} className="shrink-0">
          {isPlaying ? (
            <PauseIcon className="h-6 w-6" />
          ) : (
            <PlayIcon className="h-6 w-6" />
          )}
        </button>
        <div className="flex-grow">
          <div className="h-1.5 w-full rounded-full bg-gray-200">
            <div
              className="h-1.5 rounded-full bg-blue-600"
              style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
            ></div>
          </div>
        </div>
        <div className="shrink-0 text-xs sm:text-sm">
          {duration
            ? `${formatTime(currentTime)} / ${formatTime(duration)}`
            : "00:00 / 00:00"}
        </div>
      </div>
    </div>
  );
};

export { CustomAudioPlayer };
