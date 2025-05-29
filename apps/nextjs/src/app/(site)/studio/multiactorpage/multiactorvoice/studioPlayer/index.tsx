"use client";

import React from "react";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  IconSave as Save,
  IconBot,
  IconHeadphones,
  IconImage,
  IconMusic,
  PencilIcon,
} from "@voiceai/ui/@/components/ui/icons";
import { SpeedButton } from "~/app/(site)/components/texttospeech/Tab2/buttonmenu.tsx/speedbutton";

interface MergedAudioPlayerProps {
  mergedAudioUrl: string;
  mergedAudioRef: React.RefObject<HTMLAudioElement>;
  mergedWaveformCanvasRef: React.RefObject<HTMLCanvasElement>;
  mergedAudioAnimating: boolean;
  setShowConfetti: (show: boolean) => void;
  buttonBaseStyle: React.CSSProperties;
  buttonHoverStyle: React.CSSProperties;
  disabledButtonStyle: React.CSSProperties;
  script?: string;
  scrollToTab2?: () => void;
  loading?: boolean;
  isSubscriptionActive?: boolean;
}

const MergedAudioPlayer: React.FC<MergedAudioPlayerProps> = ({
  mergedAudioUrl,
  mergedAudioRef,
  mergedWaveformCanvasRef,
  mergedAudioAnimating,
  setShowConfetti,
  buttonBaseStyle,
  buttonHoverStyle,
  disabledButtonStyle,
  script = "",
  scrollToTab2,
  loading = false,
  isSubscriptionActive = true,
}) => {
  const hasPlayedRef = useRef(false);
  const prevAudioSourceRef = useRef<string | null>(null);
  const hasAudio = !!mergedAudioUrl;

  useEffect(() => {
    if (!mergedAudioUrl || !mergedAudioRef.current) {
      hasPlayedRef.current = false;
      return;
    }

    if (
      mergedAudioUrl !== prevAudioSourceRef.current &&
      !hasPlayedRef.current
    ) {
      const handlePlayback = async () => {
        try {
          mergedAudioRef.current!.src = mergedAudioUrl;
          await mergedAudioRef.current!.load();

          const playPromise = mergedAudioRef.current!.play();

          if (playPromise !== undefined) {
            await playPromise;
            setShowConfetti(true);
            hasPlayedRef.current = true;
            prevAudioSourceRef.current = mergedAudioUrl;
          }
        } catch (error) {
          console.error("Playback error:", error);
        }
      };

      const timer = setTimeout(handlePlayback, 100);
      return () => clearTimeout(timer);
    }
  }, [mergedAudioUrl, mergedAudioRef, setShowConfetti]);

  const handleCopyAndOpen = (url: string) => {
    navigator.clipboard
      .writeText(script)
      .then(() => {
        console.log("Script copied to clipboard");
        window.open(url, "_blank");
      })
      .catch((err) => {
        console.error("Failed to copy script: ", err);
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
    <motion.div
      className="mb-6 mt-4 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      {/* Main Content Container */}
      <motion.div
        className="bg-cp-primary mx-auto w-full overflow-hidden rounded-lg shadow-lg"
        layout
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col">
          {/* Audio Player Section */}
          <motion.div
            className={`flex w-full flex-col items-center justify-center p-6 ${
              hasAudio ? "min-h-[200px]" : "min-h-[150px]"
            }`}
            layout
          >
            {hasAudio ? (
              <>
                <div className="mb-4 text-center">
                  <p className="text-lg text-white">Your merged audio</p>
                </div>

                {/* Audio Player Controls */}
                <div
                  className="w-full max-w-4xl"
                  style={{
                    backgroundColor: "#BDF3F0",
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "none",
                  }}
                >
                  {/* Waveform Canvas inside blue box */}
                  <motion.canvas
                    ref={mergedWaveformCanvasRef}
                    className="mb-3 h-16 lg:h-24 w-full rounded bg-muted/30"
                    width={600}
                    height={100}
                    animate={
                      mergedAudioAnimating
                        ? {
                            boxShadow: [
                              "0px 0px 0px rgba(0,0,0,0)",
                              "0px 0px 15px rgba(59, 130, 246, 0.3)",
                              "0px 0px 0px rgba(0,0,0,0)",
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />

                  <div className="flex items-center gap-3">
                    <audio
                      ref={mergedAudioRef}
                      controls
                      src={mergedAudioUrl}
                      style={{
                        flex: 1,
                        height: "40px",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                    />

                    <SpeedButton
                      audioRef={mergedAudioRef}
                      buttonStyle={buttonBaseStyle}
                      buttonHoverStyle={buttonHoverStyle}
                      disabledButtonStyle={disabledButtonStyle}
                    />
                    <button
                      onClick={() => {
                        if (mergedAudioUrl) {
                          const anchor = document.createElement("a");
                          anchor.href = mergedAudioUrl;
                          anchor.download = "combined-voices.wav";
                          anchor.click();
                          setShowConfetti(true);
                        }
                      }}
                      style={buttonBaseStyle}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          buttonHoverStyle.backgroundColor)
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          buttonBaseStyle.backgroundColor)
                      }
                    >
                      <Save
                        className="h-4 w-4 lg:h-5 lg:w-5"
                        style={{ color: "white" }}
                      />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-4"
                >
                  <IconBot className="text-cp-secondary h-12 w-12" />
                </motion.div>
                <h2 className="mb-3 text-2xl font-bold text-white">
                  Start <span className="text-cp-secondary">Creating</span>
                </h2>
                <p className="text-lg font-normal text-gray-200">
                  Generate your merged audio to unlock full features
                </p>
              </>
            )}
          </motion.div>

          {/* Action Buttons Section */}
          <motion.div
            className="w-full p-6 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="mb-5 text-xl font-semibold text-white">
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
    </motion.div>
  );
};

export default MergedAudioPlayer;
