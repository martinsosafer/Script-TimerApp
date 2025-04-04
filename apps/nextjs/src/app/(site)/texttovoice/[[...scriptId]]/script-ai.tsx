// ScriptAI.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ArrowDownOnSquareIcon from "@heroicons/react/24/outline/ArrowDownOnSquareIcon";
import { AnimatePresence, motion } from "framer-motion";
import ReactConfetti from "react-confetti";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@voiceai/ui/@/components/ui/hover-card";
import {
  IconClipboard,
  IconHeadphones,
  IconImage,
  IconMusic,
  Icons,
  PencilIcon,
} from "@voiceai/ui/@/components/ui/icons";
import { Tabs } from "@voiceai/ui/@/components/ui/tabs";
import { useCopyToClipboard } from "@voiceai/ui/@/hooks/use-copy-to-clipboard";

import { poppins } from "~/app/fonts";
import { useGenerateVoice } from "~/app/hooks/texttovoice/useGenerateVoice";
import { useReviseScript } from "~/app/hooks/texttovoice/useRevisedScript";
import { useScriptDetails } from "~/app/hooks/texttovoice/useScriptDetails";
import useStreamingAudio from "~/app/hooks/texttovoice/useStreamingAudio";
import { useSubscription } from "~/app/hooks/texttovoice/useSubscription";
import { calculateLengthTime } from "~/lib/calculate-length-time";
import { fetchUserCredits } from "~/lib/get11LabsCredits";
import NoSessionModal from "../../components/modals/no-session-modal";
import TabOne from "../../components/texttospeech/Tab1";
import TabTwo from "../../components/texttospeech/Tab2";
import { SpeedButton } from "../../components/texttospeech/Tab2/buttonmenu.tsx/speedbutton";
import { characters, getTotalCredits } from "./utils";

interface SubscriptionData {
  status: number | string | null | undefined;
  userId: string | null | undefined;
}

export function ScriptAI({
  subData,
  initialCredits,
  openAiCredits,
}: {
  subData: SubscriptionData | null | undefined;
  initialCredits: number;
  openAiCredits: number;
}) {
  const {
    subscriptionData,
    favoriteVoices,
    isSubscriptionActive,
    refreshSubscriptionData,
  } = useSubscription();

  // Refs for scrolling
  const audioPlayerRef = React.useRef<HTMLDivElement>(null);
  const tabTwoRef = React.useRef<HTMLDivElement>(null);
  const actionButtonsRef = React.useRef<HTMLDivElement>(null);

  const [showConfetti, setShowConfetti] = React.useState(false);
  const [script, setScript] = React.useState("");
  const [richContent, setRichContent] = React.useState("");
  const [selectedModel, setSelectedModel] = React.useState(null);
  const [similarity, setSimilarity] = React.useState([0.5]);
  const [stability, setStability] = React.useState([0.5]);
  const [loading, setLoading] = React.useState(false);

  const { scriptId } = useParams();
  useScriptDetails(scriptId, setScript);

  const handleEditorChange = (content) => {
    setScript(content);
  };

  const { revisedScript, checkAndPublish, setRevisedScript } =
    useReviseScript(setLoading);

  const { generateVoice, error } = useGenerateVoice(setLoading);

  const [audio, setAudio] = React.useState<string>("");
  const [openFreeModal, setOpenFreeModal] = React.useState(false);

  const {
    audioSource,
    showPlayer,
    downloadLink,
    audioRef,
    toggleAudioRef,
    handleStreaming,
    handleCloseAudio,
  } = useStreamingAudio();

  // Smooth scroll to audio player
  React.useEffect(() => {
    if (showPlayer && audioPlayerRef.current) {
      audioPlayerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [showPlayer]);

  // Scroll to Tab 2 function
  const scrollToTab2 = () => {
    if (tabTwoRef.current) {
      tabTwoRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(revisedScript);
  };

  const { wordCount, minutes, formattedSeconds, speedCategory } =
    calculateLengthTime(script);

  const [credits, setCredits] = React.useState(initialCredits);

  const refetchCredits = async () => {
    try {
      const userId = subData?.userId;
      if (!userId) return;
      const newCredits = await fetchUserCredits(userId);
      setCredits(newCredits);
    } catch (error) {
      console.error("Error refetching credits:", error);
    }
  };

  React.useEffect(() => {
    if (subData) {
      refetchCredits();
    }
  }, [subData]);

  const totalCredits = getTotalCredits(subData?.status);

  const subtitleContent = subData?.status ? (
    <div>
      <p className="font-base mb-2 text-center">
        This is where you choose and create your voice overs. On your current
        plan, <br />
        <span className="text-cp-primary font-semibold">
          {subData.status == 1 || subData.status == 2
            ? `AppSumoTier ${subData.status}`
            : subData.status}
        </span>
        , you are entitled to{" "}
        <span className="text-cp-primary font-bold">
          {characters[subData.status]}
        </span>{" "}
        per script.
      </p>
      <p className="font-base mb-2 text-center">
        You have <span className="text-cp-primary font-bold">{credits}</span>{" "}
        characters left of{" "}
        <span className="text-cp-primary font-bold">{totalCredits}</span> total
        monthly characters.
      </p>
    </div>
  ) : (
    <div className="flex flex-col">
      <p className="font-base text-center">
        This is where you choose and create your voice overs.
      </p>
      <p className="font-base mb-2 text-center">
        Log in to Script Timer and start creating now.
      </p>
    </div>
  );

  const containerStyle = {
    position: "relative",
    bottom: "40px",
    left: "65%",
    transform: "translateX(-50%)",
    maxWidth: "570px",
    width: "100%",
    height: "60px",
    backgroundColor: "#BDF3F0",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 15px",
    borderRadius: "8px",
    zIndex: 0,
    opacity: 1,
    transition: "opacity 0.5s ease-in-out",
    border: "none",
  };

  const audioStyle = {
    flex: 1,
    height: "40px",
    backgroundColor: "transparent",
    border: "none",
    "&::-webkit-media-controls-panel": {
      backgroundColor: "transparent",
    },
    "&::-webkit-media-controls-play-button": {
      backgroundColor: "#1E88E5",
      borderRadius: "50%",
      width: "30px",
      height: "30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 10px",
    },
    "&::-webkit-media-controls-timeline": {
      backgroundColor: "#ccc",
      borderRadius: "25px",
      height: "4px",
    },
  };

  const buttonStyle = {
    backgroundColor: "#1E88E5",
    border: "none",
    borderRadius: "8px",
    color: "white",
    padding: "8px",
    cursor: "pointer",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s",
    width: "40px",
    height: "40px",
    marginLeft: "8px",
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: "#1976D2",
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#90CAF9",
    cursor: "not-allowed",
    opacity: 0.6,
  };

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
      text: "Record Yourself & Get Immediate Feedback",
      bgColor: "bg-amber-100",
      textColor: "text-amber-600",
      href: "/record",
      isLink: true,
    },
    {
      icon: <IconClipboard className="h-5 w-5" />,
      text: "Translate Your Script",
      bgColor: "bg-teal-100",
      textColor: "text-teal-600",
      href: "/translate",
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
      href: "/create-images",
      isLink: true,
    },
  ];

  return (
    <>
      <header
        className={`my-3 flex w-full flex-col items-center justify-center p-6 lg:mb-[40px] lg:mt-[60px] lg:p-0 ${poppins.className}`}
      >
        {showConfetti && (
          <ReactConfetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={1000}
            recycle={false}
            gravity={0.1}
            initialVelocityX={2}
            initialVelocityY={10}
            colors={["#0123e7", "#eb8806"]}
          />
        )}
        <h2 className="text-cp-primary w-full text-center text-[28px] font-bold lg:w-[650px] lg:text-[42px]">
          Text to Voice
        </h2>
        <h4 className="mt-[12px] w-full text-center text-[14px] lg:w-[650px] lg:text-[16px]">
          {subtitleContent}
        </h4>
      </header>

      <div className="mb-32 h-full flex-col md:flex">
        <Tabs defaultValue="complete" className="flex-1">
          <div className="container mb-4 h-full">
            <div className="grid h-full items-stretch gap-6 md:grid-cols-[400px_1fr]">
              <TabOne
                setSelectedModel={setSelectedModel}
                favoriteVoices={favoriteVoices}
                refreshSubscriptionData={refreshSubscriptionData}
                subData={subData}
                stability={stability}
                setStability={setStability}
                similarity={similarity}
                setSimilarity={setSimilarity}
              />

              <TabTwo
                ref={tabTwoRef}
                script={script}
                subData={subData}
                setOpenFreeModal={setOpenFreeModal}
                richContent={richContent}
                setRichContent={setRichContent}
                toggleAudioRef={toggleAudioRef}
                audio={audio}
                isSubscriptionActive={isSubscriptionActive}
                audioRef={audioRef}
                showPlayer={showPlayer}
                handleCloseAudio={handleCloseAudio}
                downloadLink={downloadLink}
                loading={loading}
                setShowConfetti={setShowConfetti}
                showConfetti={showConfetti}
                speedCategory={speedCategory}
                wordCount={wordCount}
                minutes={minutes}
                formattedSeconds={formattedSeconds}
                selectedModel={selectedModel}
                handleStreaming={handleStreaming}
                stability={stability}
                similarity={similarity}
                generateVoice={generateVoice}
                revisedScript={revisedScript}
                setRevisedScript={setRevisedScript}
                checkAndPublish={checkAndPublish}
                setScript={setScript}
                setLoading={setLoading}
                handleEditorChange={handleEditorChange}
                onCopy={onCopy}
                isCopied={isCopied}
                refetchCredits={refetchCredits}
                openAiCredits={openAiCredits}
              />
            </div>
          </div>
        </Tabs>

        {/* Audio Controls */}
        <div ref={audioPlayerRef} style={containerStyle} className="mt-14">
          <audio ref={audioRef} controls="controls" style={audioStyle} />
          <div
            className="controls-container"
            style={{ display: "flex", gap: "10px" }}
          >
            <SpeedButton
              audioRef={audioRef}
              buttonStyle={buttonStyle}
              buttonHoverStyle={buttonHoverStyle}
              disabledButtonStyle={disabledButtonStyle}
            />
            <HoverCard>
              <HoverCardTrigger asChild>
                <button
                  onClick={() => {
                    if (downloadLink) {
                      const anchor = document.createElement("a");
                      anchor.href = downloadLink;
                      anchor.download = "audio.mp3";
                      anchor.click();
                      URL.revokeObjectURL(downloadLink);
                      setShowConfetti(true);
                    }
                  }}
                  disabled={loading || !downloadLink}
                  style={
                    !downloadLink || loading ? disabledButtonStyle : buttonStyle
                  }
                  onMouseOver={(e) =>
                    !downloadLink || loading
                      ? null
                      : (e.currentTarget.style.backgroundColor =
                          buttonHoverStyle.backgroundColor)
                  }
                  onMouseOut={(e) =>
                    !downloadLink || loading
                      ? null
                      : (e.currentTarget.style.backgroundColor =
                          buttonStyle.backgroundColor)
                  }
                >
                  {loading ? (
                    <Icons.spinner
                      className="h-6 w-6"
                      style={{ color: "white" }}
                    />
                  ) : (
                    <ArrowDownOnSquareIcon
                      width={24}
                      style={{ color: "white" }}
                    />
                  )}
                </button>
              </HoverCardTrigger>
              {!isSubscriptionActive && (
                <HoverCardContent className="w-[200px] text-sm" side="left">
                  Download audio file.
                </HoverCardContent>
              )}
            </HoverCard>
          </div>
        </div>

        {/* Action Buttons - ADDED HERE */}
        <div ref={actionButtonsRef} className="w-full">
          <AnimatePresence>
            {showPlayer && (
              <motion.div
                className="mx-auto mb-12 mt-8 w-full max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.h2
                  className="mb-4 text-center text-2xl font-bold text-gray-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  Create high-impact scripts
                </motion.h2>

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
                        delay: index * 0.1,
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {button.isLink ? (
                        <Link href={button.href || "#"} className="block">
                          <div
                            className={`flex items-center rounded-lg p-4 ${button.bgColor} transition-all hover:brightness-95`}
                          >
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full ${button.textColor} bg-white`}
                            >
                              {button.icon}
                            </div>
                            <span
                              className={`ml-3 font-medium ${button.textColor}`}
                            >
                              {button.text}
                            </span>
                          </div>
                        </Link>
                      ) : (
                        <button
                          onClick={button.action}
                          className="w-full text-left"
                        >
                          <div
                            className={`flex items-center rounded-lg p-4 ${button.bgColor} transition-all hover:brightness-95`}
                          >
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full ${button.textColor} bg-white`}
                            >
                              {button.icon}
                            </div>
                            <span
                              className={`ml-3 font-medium ${button.textColor}`}
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
      </div>

      <NoSessionModal
        subData={subData}
        openModal={openFreeModal}
        setOpenModal={setOpenFreeModal}
        page="voice"
      />
    </>
  );
}
