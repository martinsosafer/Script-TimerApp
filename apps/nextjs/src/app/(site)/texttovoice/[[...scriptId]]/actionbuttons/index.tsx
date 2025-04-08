"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import {
  IconBot,
  IconHeadphones,
  IconImage,
  IconMusic,
  PencilIcon,
} from "@voiceai/ui/@/components/ui/icons";

import { poppins } from "~/app/fonts";

interface ActionButtonsProps {
  showPlayer: boolean;
  scrollToTab2: () => void;
}

export function ActionButtons({
  showPlayer,
  scrollToTab2,
}: ActionButtonsProps) {
  // Script stats data
  const scriptStats = {
    wordCount: 1,
    minutes: 0,
    seconds: 1,
    wordsPerSecond: 2.5,
    performance: "Average", // Could be "Slowest", "Average", "Fastest"
  };

  // Action Buttons data
  const buttonData = [
    {
      icon: <PencilIcon className="h-5 w-5 text-blue-600" />,
      text: "Redo Script Timer",
      bgColor: "bg-blue-500",
      iconBgColor: "bg-blue-200",
      textColor: "text-blue-600",
      action: () => scrollToTab2(),
      isLink: false,
    },
    {
      icon: <IconHeadphones className="h-5 w-5 text-amber-600" />,
      text: "Listen to Your Script",
      bgColor: "bg-amber-500",
      iconBgColor: "bg-amber-200",
      textColor: "text-amber-600",
      href: "/speechcoach",
      isLink: true,
    },
    {
      icon: <IconBot className="h-5 w-5 text-teal-600" />,
      text: "Immediate Feedback",
      bgColor: "bg-teal-500",
      iconBgColor: "bg-teal-200",
      textColor: "text-teal-600",
      href: "/chat",
      isLink: true,
    },
    {
      icon: <IconMusic className="h-5 w-5 text-orange-600" />,
      text: "Sound FX & Music",
      bgColor: "bg-orange-500",
      iconBgColor: "bg-orange-200",
      textColor: "text-orange-600",
      href: "/sound-effects",
      isLink: true,
    },
    {
      icon: <IconImage className="h-5 w-5 text-indigo-600" />,
      text: "Create Images",
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
            className="mx-auto mt-4 w-full max-w-6xl overflow-hidden rounded-lg bg-white shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col md:flex-row">
              {/* Left Column - Script Stats */}
              <div className="flex w-full flex-col items-center justify-center bg-slate-900 p-5 text-white md:w-1/2">
                <div className="mb-3">
                  <div className="relative">
                    <img
                      src="/placeholder.svg?height=80&width=80"
                      alt="Star icon"
                      className="h-16 w-16"
                    />
                  </div>
                </div>

                <h2 className="mb-3 text-2xl font-bold">
                  Great <span className="text-yellow-400">Work</span>
                </h2>

                <div className="mb-3 text-center">
                  <p className="mb-1">
                    Your script is{" "}
                    <span className="font-bold">{scriptStats.wordCount}</span>{" "}
                    word(s).
                  </p>
                  <p className="mb-1">
                    It will take{" "}
                    <span className="font-bold">
                      {scriptStats.minutes} minutes and {scriptStats.seconds}{" "}
                      seconds
                    </span>{" "}
                    at{" "}
                    <span className="font-bold">
                      {scriptStats.wordsPerSecond}
                    </span>{" "}
                    words per second.
                  </p>
                </div>

                <div className="w-full max-w-xs">
                  <div className="relative h-1 w-full rounded-full bg-slate-700">
                    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-between px-1">
                      <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                      <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                      <div className="h-4 w-4 rounded-full bg-yellow-400"></div>
                      <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                      <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between text-xs">
                    <span>Slowest</span>
                    <span className="font-medium text-yellow-400">Average</span>
                    <span>Fastest</span>
                  </div>
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
                          className="block w-full"
                        >
                          <div className="flex items-center rounded-lg border border-gray-100 bg-white px-4 py-2 transition-all hover:bg-gray-50">
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
                          <div className="flex items-center rounded-lg border border-gray-100 bg-white px-4 py-2 transition-all hover:bg-gray-50">
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
