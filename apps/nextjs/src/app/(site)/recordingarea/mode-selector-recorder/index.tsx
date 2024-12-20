"use client";

import { useState } from "react";

import MicrophoneComponent from "../recorder";
import ScreenRecorder from "../screenrecorder";
import WebcamRecorder from "../webcamrecorder";

interface SelectorProps {
  initialMode?: "audio" | "video" | "screen";
  userId: string | undefined;
  savedAudios: SavedAudio[];
}

interface SavedAudio {
  url: string;
  filename: string;
  uploadedAt: string;
}

export default function ModeSelectorRecorder({
  initialMode = "audio",
  userId,
  savedAudios,
}: SelectorProps) {
  const [activeMode, setActiveMode] = useState(initialMode);

  const handleModeChange = (mode: "audio" | "video" | "screen") => {
    setActiveMode(mode);
  };

  const renderComponent = () => {
    switch (activeMode) {
      case "audio":
        return (
          <MicrophoneComponent userId={userId} savedAudios={savedAudios} />
        );
      case "video":
        return <WebcamRecorder />;
      case "screen":
        return <ScreenRecorder />;
      default:
        return (
          <MicrophoneComponent userId={userId} savedAudios={savedAudios} />
        );
    }
  };

  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      <div className="mb-4 flex justify-center gap-4 rounded-full border-2 border-gray-500 p-2">
        <button
          onClick={() => handleModeChange("audio")}
          className={`${
            activeMode === "audio"
              ? "rounded-full bg-primary font-bold text-white"
              : "rounded-full bg-gray-200 text-gray-400"
          } px-4 py-2`}
        >
          Audio Recorder
        </button>
        <button
          onClick={() => handleModeChange("video")}
          className={`${
            activeMode === "video"
              ? "rounded-full bg-primary font-bold text-white"
              : "rounded-full bg-gray-200 text-gray-400"
          } px-4 py-2`}
        >
          Video Recorder
        </button>
        <button
          onClick={() => handleModeChange("screen")}
          className={`${
            activeMode === "screen"
              ? "rounded-full bg-primary font-bold text-white"
              : "rounded-full bg-gray-200 text-gray-400"
          } px-4 py-2`}
        >
          Screen Recorder
        </button>
      </div>
      <div className="w-full">{renderComponent()}</div>
    </div>
  );
}
