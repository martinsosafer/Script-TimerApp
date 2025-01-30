"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import MicrophoneComponent from "../recorder";
import WebcamRecorder from "../webcamrecorder";

interface SelectorProps {
  initialMode?: "audio" | "video";
  userId: string | undefined;
  savedAudios: SavedBlob[];
  savedWebcam: SavedBlob[];
}

interface SavedBlob {
  url: string;
  filename: string;
  uploadedAt: string;
}

export default function ModeSelectorRecorder({
  initialMode = "audio",
  userId,
  savedAudios,
  savedWebcam,
}: SelectorProps) {
  const [activeMode, setActiveMode] = useState(initialMode);

  const handleModeChange = (mode: "audio" | "video") => {
    setActiveMode(mode);
  };

  const renderComponent = () => {
    switch (activeMode) {
      case "audio":
        return (
          <MicrophoneComponent userId={userId} savedAudios={savedAudios} />
        );
      case "video":
        return <WebcamRecorder userId={userId} savedWebcam={savedWebcam} />;
      default:
        return (
          <MicrophoneComponent userId={userId} savedAudios={savedAudios} />
        );
    }
  };

  return (
    <div className="flex w-full flex-col items-center rounded-lg">
      <div className="w-full">
        <div className="mx-auto mb-3 max-w-[500px] border-b">
          <div className="mt-5 lg:mt-10">
            <div className="flex justify-center space-x-6">
              {["audio", "video"].map((mode) => (
                <motion.button
                  key={mode}
                  className={`relative px-1 py-4 text-base transition-colors
                    ${
                      activeMode === mode
                        ? "font-bold text-primary"
                        : "font-normal text-gray-600 hover:text-gray-900"
                    }
                  `}
                  onClick={() => handleModeChange(mode as "audio" | "video")}
                >
                  {mode === "audio" ? "Audio Recorder" : "Video Recorder"}
                  {activeMode === mode && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      layoutId="activeMode"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-[60px] min-h-[calc(100vh-200px)]"
          >
            <div className="h-full w-full">{renderComponent()}</div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
