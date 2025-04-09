"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import ReactConfetti from "react-confetti";

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
import { ActionButtons } from "./actionbuttons";
import { AudioPlayerControls } from "./audioplayer";
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

  const handleEditorChange = (content: string) => {
    setScript(content);
  };

  const { revisedScript, checkAndPublish, setRevisedScript } =
    useReviseScript(setLoading);

  const { generateVoice } = useGenerateVoice(setLoading);

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
    onAudioReady,
  } = useStreamingAudio();

  React.useEffect(() => {
    if (showPlayer && audioPlayerRef.current) {
      audioPlayerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [showPlayer]);
  const headerRef = React.useRef<HTMLHeadingElement>(null);
  const scrollToHeader = () => {
    headerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });
  const onCopy = () => !isCopied && copyToClipboard(revisedScript);

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
    subData && refetchCredits();
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
  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = "";
    }
  };

  return (
    <>
      <header
        ref={headerRef}
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

        {/* ActionButtons with all props */}
        <div ref={actionButtonsRef} className="w-full">
          <ActionButtons
            showPlayer={showPlayer}
            scrollToTab2={scrollToHeader}
            audioRef={audioRef}
            downloadLink={downloadLink}
            loading={loading}
            isSubscriptionActive={isSubscriptionActive}
            setShowConfetti={setShowConfetti}
            audioSource={audioSource} // Add this new prop
            resetAudio={resetAudio}
          />
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
