"use client";

import * as React from "react";
import { useParams } from "next/navigation";

import { Tabs } from "@voiceai/ui/@/components/ui/tabs";
import { useCopyToClipboard } from "@voiceai/ui/@/hooks/use-copy-to-clipboard";

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
import TTVIntroBlock from "../../components/texttospeech/ttvintroblock";

export function ScriptAI({
  subData,
  initialCredits,
}: {
  subData: SubscriptionData | null | undefined;
  initialCredits: number;
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
  const [similarity, setSimilarity] = React.useState([0.8]);
  const [stability, setStability] = React.useState([0.5]);
  const [loading, setLoading] = React.useState(false);
  // If script is selected from URL path parameter, load in state from db
  const { scriptId } = useParams();

  //scriptdetials
  useScriptDetails(scriptId, setScript);

  //handle change for editor so it sets changes to the text area
  const handleEditorChange = (content) => {
    setScript(content); // Update the script state with the content from the editor
  };
  // Revise script grammar/spelling with AI
  const { revisedScript, checkAndPublish, setRevisedScript } =
    useReviseScript(setLoading);

  //Save voice on db and generate it
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
      // Assuming we have the user's ID available (adjust as needed)
      const userId = subData?.userId;
      if (!userId) return; // Ensure userId is available
      const newCredits = await fetchUserCredits(userId); // Refetch the credits
      setCredits(newCredits); // Update the state with the new credits
    } catch (error) {
      console.error("Error refetching credits:", error);
    }
  };
  React.useEffect(() => {
    if (subData) {
      refetchCredits();
    }
  }, [subData]);
  return (
    <>
      <div className="  mb-32 h-full   flex-col md:flex">
        <TTVIntroBlock subscriptionData={subscriptionData} credits={credits} />

        <Tabs defaultValue="complete" className="flex-1">
          <div className="container mb-4 h-full ">
            <div className="grid h-full items-stretch gap-6 md:grid-cols-[400px_1fr]">
              <TabOne
                setSelectedModel={setSelectedModel}
                favoriteVoices={favoriteVoices}
                refreshSubscriptionData={refreshSubscriptionData}
                subData={subData}
                stability={stability}
                setStability={setStability}
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
              />
            </div>
          </div>
        </Tabs>
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
