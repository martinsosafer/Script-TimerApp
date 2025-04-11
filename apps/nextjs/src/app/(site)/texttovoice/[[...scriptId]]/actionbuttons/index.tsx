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
}: ActionButtonsProps) {
  const hasPlayedRef = useRef(false);
  const prevAudioSourceRef = useRef<string | null>(null);

  // Handle audio playback exactly once when audio appears
  useEffect(() => {
    if (!showPlayer || !audioSource || !audioRef.current) {
      // Reset flags when player is hidden
      hasPlayedRef.current = false;
      return;
    }

    // Only play if we have a new audio source and haven't played yet
    if (audioSource !== prevAudioSourceRef.current && !hasPlayedRef.current) {
      const handlePlayback = async () => {
        try {
          // Reset and load new audio
          resetAudio();
          audioRef.current!.src = audioSource;
          await audioRef.current!.load();

          // Attempt playback
          const playPromise = audioRef.current!.play();

          if (playPromise !== undefined) {
            await playPromise;
            setShowConfetti(true);
            // Mark as played and store current source
            hasPlayedRef.current = true;
            prevAudioSourceRef.current = audioSource;
          }
        } catch (error) {
          console.error("Playback error:", error);
          // Fallback - let user click play button
        }
      };

      const timer = setTimeout(handlePlayback, 100);
      return () => clearTimeout(timer);
    }
  }, [showPlayer, audioSource, audioRef, setShowConfetti, resetAudio]);

  const buttonData = [
    {
      icon: <PencilIcon className="h-5 w-5 text-blue-600" />,
      text: "Rewrite Your Script",
      bgColor: "bg-blue-500",
      iconBgColor: "bg-blue-200",
      textColor: "text-blue-600",
      action: () => scrollToTab2(),
      isLink: false,
    },
    {
      icon: <IconHeadphones className="h-5 w-5 text-amber-600" />,
      text: "Record & Get Feedback",
      bgColor: "bg-amber-500",
      iconBgColor: "bg-amber-200",
      textColor: "text-amber-600",
      href: "/speechcoach",
      isLink: true,
    },
    {
      icon: <IconBot className="h-5 w-5 text-teal-600" />,
      text: "Translate Your Script",
      bgColor: "bg-teal-500",
      iconBgColor: "bg-teal-200",
      textColor: "text-teal-600",
      href: "/chat",
      isLink: true,
    },
    {
      icon: <IconMusic className="h-5 w-5 text-orange-600" />,
      text: "Add Sound Effects & Music",
      bgColor: "bg-orange-500",
      iconBgColor: "bg-orange-200",
      textColor: "text-orange-600",
      href: "/sound-effects",
      isLink: true,
    },
    {
      icon: <IconImage className="h-5 w-5 text-indigo-600" />,
      text: "Create Images for Your Script",
      bgColor: "bg-indigo-500",
      iconBgColor: "bg-indigo-200",
      textColor: "text-indigo-600",
      href: "/image-generator",
      isLink: true,
    },
  ];

  return (
    <div className={`w-full ${poppins.className}`}>
      <AnimatePresence>
        {showPlayer && (
          <motion.div
            className="mx-auto mt-4 w-full max-w-6xl overflow-hidden rounded-lg bg-gray-100 shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col md:flex-row">
              {/* Left Column - Audio Player */}
              <div className="flex w-full flex-col items-center justify-center p-5 text-black md:w-1/2">
                <div className="mb-3">
                  <StarIcon className="h-16 w-16 text-yellow-400" />
                </div>
                <h2 className="mb-3 text-2xl font-bold">
                  Great <span className="text-yellow-400">Work</span>
                </h2>
                <div className="mb-3 text-center">
                  <p className="mb-1 text-black">Your audio is ready to play</p>
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
              </div>

              {/* Right Column - Action Buttons */}
              <div className="w-full p-5 md:w-1/2">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                  Create high-impact{" "}
                  <span className="text-yellow-500">scripts</span>
                </h2>
                <div className="space-y-2">
                  {buttonData.map((button, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 24,
                        delay: 0.1 + index * 0.1,
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {button.isLink ? (
                        <Link
                          href={button.href || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full"
                        >
                          <div className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 transition-all hover:bg-gray-50">
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-full ${button.iconBgColor}`}
                            >
                              {button.icon}
                            </div>
                            <span className="ml-4 font-medium text-gray-800">
                              {button.text}
                            </span>
                          </div>
                        </Link>
                      ) : (
                        <button
                          onClick={button.action}
                          className="w-full text-left"
                        >
                          <div className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 transition-all hover:bg-gray-50">
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
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
