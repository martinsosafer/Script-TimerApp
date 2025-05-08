"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import {
  IconBot,
  IconHeadphones,
  IconImage,
  IconMusic,
  PencilIcon,
  StarIcon,
} from "@voiceai/ui/@/components/ui/icons";

import { poppins } from "~/app/fonts";
import { AudioPlayerControls } from "../audioplayer";

interface ActionButtonsProps {
  script: string;
  showPlayer: boolean;
  scrollToTab2: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
  downloadLink: string;
  loading: boolean;
  isSubscriptionActive: boolean;
  setShowConfetti: (show: boolean) => void;
  audioSource: string;
  resetAudio: () => void;
}

export function ActionButtons({
  showPlayer,
  scrollToTab2,
  audioRef,
  downloadLink,
  loading,
  isSubscriptionActive,
  setShowConfetti,
  audioSource,
  resetAudio,
  script,
}: ActionButtonsProps) {
  const hasPlayedRef = useRef(false);
  const prevAudioSourceRef = useRef<string | null>(null);
  const hasAudio = !!audioSource;

  useEffect(() => {
    if (!showPlayer || !audioSource || !audioRef.current) {
      hasPlayedRef.current = false;
      return;
    }

    if (audioSource !== prevAudioSourceRef.current && !hasPlayedRef.current) {
      const handlePlayback = async () => {
        try {
          resetAudio();
          audioRef.current!.src = audioSource;
          await audioRef.current!.load();

          const playPromise = audioRef.current!.play();

          if (playPromise !== undefined) {
            await playPromise;
            setShowConfetti(true);
            hasPlayedRef.current = true;
            prevAudioSourceRef.current = audioSource;
          }
        } catch (error) {
          console.error("Playback error:", error);
        }
      };

      const timer = setTimeout(handlePlayback, 100);
      return () => clearTimeout(timer);
    }
  }, [showPlayer, audioSource, audioRef, setShowConfetti, resetAudio]);

  const handleCopyAndOpen = (url: string) => {
    // Copy script to clipboard
    navigator.clipboard
      .writeText(script)
      .then(() => {
        console.log("Script copied to clipboard");
        // Open new tab
        window.open(url, "_blank");
      })
      .catch((err) => {
        console.error("Failed to copy script: ", err);
        // Fallback for browsers that don't support clipboard API
        const textarea = document.createElement("textarea");
        textarea.value = script;
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand("copy");
          window.open(url, "_blank");
        } catch (err) {
          console.error("Fallback copy failed: ", err);
        }
        document.body.removeChild(textarea);
      });
  };

  const buttonData = [
    {
      icon: <PencilIcon className="h-5 w-5 text-blue-200" />,
      text: "Redo voice over",
      bgColor: "bg-blue-500",
      iconBgColor: "bg-blue-700",
      textColor: "text-blue-200",
      action: () => scrollToTab2(),
      isLink: false,
    },
    {
      icon: <IconMusic className="h-5 w-5 text-orange-200" />,
      text: "Create Sound Effects & Music",
      bgColor: "bg-orange-500",
      iconBgColor: "bg-orange-700",
      textColor: "text-orange-200",
      href: "/soundeffects",
      isLink: true,
    },
    {
      icon: <IconBot className="h-5 w-5 text-teal-200" />,
      text: "Copy script and open Ai Script Writer",
      bgColor: "bg-teal-500",
      iconBgColor: "bg-teal-700",
      textColor: "text-teal-200",
      href: "/chat",
      isLink: true,
      hasCopyAction: true,
    },
    {
      icon: <IconImage className="h-5 w-5 text-indigo-200" />,
      text: "Copy script and open Image Generator",
      bgColor: "bg-indigo-500",
      iconBgColor: "bg-indigo-700",
      textColor: "text-indigo-200",
      href: "/image-generator",
      isLink: true,
      hasCopyAction: true,
    },
    {
      icon: <IconHeadphones className="h-5 w-5 text-amber-200" />,
      text: "Copy script and Record Yourself",
      bgColor: "bg-amber-500",
      iconBgColor: "bg-amber-700",
      textColor: "text-amber-200",
      href: "/speechcoach",
      isLink: true,
      hasCopyAction: true,
    },
  ];

  return (
    <div className={`w-full ${poppins.className}`}>
      <motion.div
        className="bg-cp-primary mx-auto mt-4 w-full max-w-[1340px] overflow-hidden rounded-lg shadow-lg"
        layout
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row">
          {/* Left Column - Dynamic Content */}
          <motion.div
            className={`flex w-full flex-col items-center justify-center p-6 md:w-1/2 ${
              hasAudio ? "min-h-[300px]" : "min-h-[200px]"
            }`}
            layout
          >
            {hasAudio ? (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mb-3"
                >
                  <StarIcon className="h-16 w-16 text-yellow-400" />
                </motion.div>
                <h2 className="mb-3 text-3xl font-bold text-white">
                  Great <span className="text-yellow-400">Work</span>
                </h2>
                <div className="mb-4 text-center">
                  <p className="text-lg text-white">
                    Your audio is ready to play
                  </p>
                </div>
                <div className="w-full px-4">
                  <AudioPlayerControls
                    audioRef={audioRef}
                    downloadLink={downloadLink}
                    loading={loading}
                    isSubscriptionActive={isSubscriptionActive}
                    setShowConfetti={setShowConfetti}
                  />
                </div>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-4"
                >
                  <IconBot className="text-cp-secondary h-16 w-16" />
                </motion.div>
                <h2 className="mb-3 text-3xl font-bold text-white">
                  Start <span className="text-cp-secondary">Creating</span>
                </h2>
                <p className="text-lg font-normal text-gray-200">
                  Generate your audio to unlock full features
                </p>
              </>
            )}
          </motion.div>

          {/* Right Column - Always Visible Action Buttons */}
          <motion.div
            className="w-full p-6 md:w-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="mb-5 text-2xl font-semibold text-white">
              {hasAudio ? "Enhance your" : "Create"} content{" "}
              <span className="text-yellow-400">like a pro</span>
            </h2>
            <div className="space-y-3">
              {buttonData.map((button, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                    delay: index * 0.05,
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {button.isLink ? (
                    <button
                      onClick={() => {
                        if (button.text.toLowerCase().includes("copy")) {
                          handleCopyAndOpen(button.href || "#");
                        } else {
                          window.open(button.href, "_blank");
                        }
                      }}
                      className="block w-full text-left"
                    >
                      <div className="flex items-center rounded-lg border border-black bg-white px-4 py-3 transition-all hover:bg-gray-300">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${button.iconBgColor}`}
                        >
                          {button.icon}
                        </div>
                        <span className="ml-4 font-medium text-gray-800">
                          {button.text}
                        </span>
                      </div>
                    </button>
                  ) : (
                    <button
                      onClick={button.action}
                      className="w-full text-left"
                    >
                      <div className="flex items-center rounded-lg border border-black bg-white px-4 py-3 transition-all hover:bg-gray-300">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${button.iconBgColor}`}
                        >
                          {button.icon}
                        </div>
                        <span className="ml-4 font-medium text-gray-800">
                          {button.text}
                        </span>
                      </div>
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
