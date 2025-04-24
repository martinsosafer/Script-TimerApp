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

  const buttonData = [
    {
      icon: <PencilIcon className="h-5 w-5 text-blue-200" />,
      text: "Redo Voice",
      bgColor: "bg-blue-500",
      iconBgColor: "bg-blue-700",
      textColor: "text-blue-200",
      action: () => scrollToTab2(),
      isLink: false,
    },

    {
      icon: <IconImage className="h-5 w-5 text-indigo-200" />,
      text: "Copy script and open Image generator",
      bgColor: "bg-indigo-500",
      iconBgColor: "bg-indigo-700",
      textColor: "text-indigo-200",
      href: "/image-generator",
      isLink: true,
    },
    {
      icon: <IconHeadphones className="h-5 w-5 text-amber-200" />,
      text: "Copy script and open RECORD yourself",
      bgColor: "bg-amber-500",
      iconBgColor: "bg-amber-700",
      textColor: "text-amber-200",
      href: "/speechcoach",
      isLink: true,
    },
    {
      icon: <IconBot className="h-5 w-5 text-teal-200" />,
      text: "Translate Your Script",
      bgColor: "bg-teal-500",
      iconBgColor: "bg-teal-700",
      textColor: "text-teal-200",
      href: "/chat",
      isLink: true,
    },
    {
      icon: <IconMusic className="h-5 w-5 text-orange-200" />,
      text: "Copy and open Sound Effects",
      bgColor: "bg-orange-500",
      iconBgColor: "bg-orange-700",
      textColor: "text-orange-200",
      href: "/sound-effects",
      isLink: true,
    },
  ];

  return (
    <div className={`w-full ${poppins.className}`}>
      <motion.div
        className="bg-cp-primary mx-auto mt-4 w-full max-w-[1340px] overflow-hidden rounded-lg shadow-lg" // Changed bg-gray-100 to bg-cp-primary
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
                  {" "}
                  {/* Changed text-black to text-white */}
                  Great <span className="text-yellow-400">Work</span>
                </h2>
                <div className="mb-4 text-center">
                  <p className="text-lg text-white">
                    {" "}
                    {/* Changed text-black to text-white */}
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
                  {" "}
                  {/* Changed text color */}
                  Start <span className="text-cp-secondary">Creating</span>
                </h2>
                <p className="text-lg font-normal text-gray-200">
                  {" "}
                  {/* Changed text-gray-600 to text-gray-200 */}
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
              {" "}
              {/* Changed text-gray-800 to text-white */}
              {hasAudio ? "Enhance your" : "Create"} content{" "}
              <span className="text-yellow-400">like a pro</span>{" "}
              {/* Changed from yellow-500 to yellow-400 for better contrast */}
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
                    <Link
                      href={button.href || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <div className="flex items-center rounded-lg border border-black bg-white px-4 py-3 transition-all hover:bg-gray-300">
                        {" "}
                        {/* Changed bg-white to bg-gray-800 and hover states */}
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${button.iconBgColor}`}
                        >
                          {button.icon}
                        </div>
                        <span className="ml-4 font-medium text-gray-800">
                          {" "}
                          {/* Changed text-gray-800 to text-white */}
                          {button.text}
                        </span>
                      </div>
                    </Link>
                  ) : (
                    <button
                      onClick={button.action}
                      className="w-full text-left"
                    >
                      <div className="flex items-center rounded-lg border border-black bg-white px-4 py-3 transition-all hover:bg-gray-300">
                        {" "}
                        {/* Changed bg-white to bg-gray-800 and hover states */}
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${button.iconBgColor}`}
                        >
                          {button.icon}
                        </div>
                        <span className="ml-4 font-medium text-gray-800">
                          {" "}
                          {/* Changed text-gray-800 to text-white */}
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
