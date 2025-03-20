"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import ArrowDownOnSquareIcon from "@heroicons/react/24/outline/ArrowDownOnSquareIcon";
import ReactConfetti from "react-confetti";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@voiceai/ui/@/components/ui/hover-card";
import { IconClose, Icons } from "@voiceai/ui/@/components/ui/icons";
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

  // Script AI parameters
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [script, setScript] = React.useState("");
  const [richContent, setRichContent] = React.useState("");
  const [selectedModel, setSelectedModel] = React.useState(null);
  const [similarity, setSimilarity] = React.useState([0.5]);
  const [stability, setStability] = React.useState([0.5]);
  const [loading, setLoading] = React.useState(false);

  // If script is selected from URL path parameter, load in state from db
  const { scriptId } = useParams();

  // Script details
  useScriptDetails(scriptId, setScript);

  // Handle change for editor
  const handleEditorChange = (content) => {
    setScript(content);
  };

  // Revise script grammar/spelling with AI
  const { revisedScript, checkAndPublish, setRevisedScript } =
    useReviseScript(setLoading);

  // Save voice on db and generate it
  const { generateVoice, error } = useGenerateVoice(setLoading);

  // Generate audio voice
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

  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(revisedScript);
  };

  const { wordCount, minutes, formattedSeconds, speedCategory } =
    calculateLengthTime(script);

  const [credits, setCredits] = React.useState(initialCredits);

  // Function to refetch credits
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

  // Header subtitle content
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

  // Styles
  const containerStyle = {
    position: "relative",
    bottom: "40px",
    left: "65%",
    transform: "translateX(-50%)",
    maxWidth: "570px",
    width: "100%",
    height: "80px",
    backgroundColor: "#3B82F6",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    borderRadius: "8px",
    zIndex: 0,
    opacity: 1,
    transition: "opacity 0.5s ease-in-out",
    border: "1px solid black",
  };

  const audioStyle = {
    flex: 1,
    height: "50px",
    backgroundColor: "transparent",
    border: "none",
  };

  const buttonStyle = {
    backgroundColor: "#F97316",
    border: "1px solid black",
    borderRadius: "4px",
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
    marginLeft: "4px",
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: "#e76f00",
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f7a07a",
    cursor: "not-allowed",
    opacity: 0.6,
  };

  return (
    <>
      {/* Integrated Header */}
      <header
        className={`my-3 flex w-full flex-col items-center justify-center p-6 lg:mb-[40px] lg:mt-[60px] lg:p-0 ${poppins.className}`}
      >
        <h2 className="text-cp-primary w-full text-center text-[28px] font-bold lg:w-[650px] lg:text-[42px]">
          Text to Voice
        </h2>
        <h4 className="mt-[12px] w-full text-center text-[14px] lg:w-[650px] lg:text-[16px]">
          {subtitleContent}
        </h4>
      </header>

      {/* Main Content */}
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
        <div style={containerStyle} className="mt-14">
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
            <button
              onClick={handleCloseAudio}
              style={buttonStyle}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  buttonHoverStyle.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  buttonStyle.backgroundColor)
              }
            >
              <IconClose width={24} style={{ color: "white" }} />
            </button>
          </div>
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
        </div>
      </div>

      {/* No Session Modal */}
      <NoSessionModal
        subData={subData}
        openModal={openFreeModal}
        setOpenModal={setOpenFreeModal}
        page="voice"
      />
    </>
  );
}
