"use client";

import { useState } from "react";

import MicrophoneComponent from "../recorder";
import WebcamRecorder from "../webcamrecorder";

interface SelectorProps {
  initialMode?: "audio" | "video" | "screen";
}

export default function ModeSelectorRecorder({
  initialMode = "audio",
}: SelectorProps) {
  const [activeMode, setActiveMode] = useState(initialMode);

  const handleModeChange = (mode: "audio" | "video" | "screen") => {
    setActiveMode(mode);
  };

  const renderComponent = () => {
    switch (activeMode) {
      case "audio":
        return <MicrophoneComponent />;
      case "video":
        return <WebcamRecorder />;
      case "screen":
        return <ScreenRecorder />;
      default:
        return <AudioRecorder />;
    }
  };

  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      {" "}
      {/* Centered the entire component */}
      <div className="mb-4 flex justify-center gap-4 rounded-full border-2 border-gray-500 p-2">
        {" "}
        {/* Centered the buttons */}
        <button
          onClick={() => handleModeChange("audio")}
          className={`${
            activeMode === "audio"
              ? "rounded-full bg-primary font-bold text-white"
              : "rounded-full bg-gray-200 text-gray-400"
          } relative overflow-hidden px-4 py-2 transition-colors duration-300`}
        >
          <span className="relative z-10">Audio Recorder</span>
        </button>
        <button
          onClick={() => handleModeChange("video")}
          className={`${
            activeMode === "video"
              ? "rounded-full bg-primary font-bold text-white"
              : "rounded-full bg-gray-200 text-gray-400"
          } relative overflow-hidden px-4 py-2 transition-colors duration-300`}
        >
          <span className="relative z-10">Video Recorder</span>
        </button>
        <button
          onClick={() => handleModeChange("screen")}
          className={`${
            activeMode === "screen"
              ? "rounded-full bg-primary font-bold text-white"
              : "rounded-full bg-gray-200 text-gray-400"
          } relative overflow-hidden px-4 py-2 transition-colors duration-300`}
        >
          <span className="relative z-10">Screen Recorder</span>
        </button>
      </div>
      <div className="w-full transition-opacity duration-500 ease-in-out">
        {renderComponent()}
      </div>
    </div>
  );
}

// Placeholder components for demonstration
const AudioRecorder = () => (
  <div className="animate-fade-in opacity-0">Audio Recorder Component</div>
);
const VideoRecorder = () => (
  <div className="animate-fade-in opacity-0">Video Recorder Component</div>
);
const ScreenRecorder = () => (
  <div className="animate-fade-in opacity-0">Screen Recorder Component</div>
);
