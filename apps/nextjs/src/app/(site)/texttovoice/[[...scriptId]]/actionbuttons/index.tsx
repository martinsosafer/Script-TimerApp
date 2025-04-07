"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import {
  IconBot,
  IconClipboard,
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
  // Action Buttons data
  const buttonData = [
    {
      icon: <PencilIcon className="h-5 w-5" />,
      text: "Rewrite Your Script",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      action: () => scrollToTab2(),
      isLink: false,
    },
    {
      icon: <IconHeadphones className="h-5 w-5" />,
      text: "Record Yourself & Get Feedback",
      bgColor: "bg-amber-100",
      textColor: "text-amber-600",
      href: "/speechcoach",
      isLink: true,
    },
    {
      icon: <IconBot className="h-5 w-5" />,
      text: "Get Help from our AI",
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
      href: "/chat",
      isLink: true,
    },
    {
      icon: <IconClipboard className="h-5 w-5" />,
      text: "Translate Your Script",
      bgColor: "bg-teal-100",
      textColor: "text-teal-600",
      href: "/translatetext",
      isLink: true,
    },
    {
      icon: <IconMusic className="h-5 w-5" />,
      text: "Add Sound Effects & Music",
      bgColor: "bg-orange-100",
      textColor: "text-orange-600",
      href: "/sound-effects",
      isLink: true,
    },
    {
      icon: <IconImage className="h-5 w-5" />,
      text: "Create Images for Your Script",
      bgColor: "bg-indigo-100",
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
            className="mx-auto mb-12 mt-8 w-full max-w-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="mb-4 ml-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-semibold text-gray-800">
                Create high-impact{" "}
                <span className="text-cp-secondary font-bold">scripts</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {buttonData.map((button, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                    delay: 1 + index * 0.1,
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {button.isLink ? (
                    <Link
                      href={button.href || "#"}
                      className="block h-full"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div
                        className={`flex h-24 items-start rounded-lg p-4 ${button.bgColor} transition-all hover:brightness-95`}
                      >
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${button.textColor} mt-0.5 bg-white`}
                        >
                          {button.icon}
                        </div>
                        <span
                          className={`ml-3 font-medium ${button.textColor} mt-0.5`}
                        >
                          {button.text}
                        </span>
                      </div>
                    </Link>
                  ) : (
                    <button
                      onClick={button.action}
                      className="h-full w-full text-left"
                    >
                      <div
                        className={`flex h-24 items-start rounded-lg p-4 ${button.bgColor} transition-all hover:brightness-95`}
                      >
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${button.textColor} mt-0.5 bg-white`}
                        >
                          {button.icon}
                        </div>
                        <span
                          className={`ml-3 font-medium ${button.textColor} mt-0.5`}
                        >
                          {button.text}
                        </span>
                      </div>
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
