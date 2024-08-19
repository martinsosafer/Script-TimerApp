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
import NoSessionModal from "../../components/modals/no-session-modal";
import TabOne from "../../components/texttospeech/Tab1";
import TabTwo from "../../components/texttospeech/Tab2";
import TTVIntroBlock from "../../components/texttospeech/ttvintroblock";

export function ScriptAI({
  subData,
}: {
  subData: SubscriptionData | null | undefined;
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
  const { revisedScript, checkAndPublish } = useReviseScript(setLoading);

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

  return (
    <>
      <div className="  mb-32 h-full   flex-col md:flex">
        <TTVIntroBlock subscriptionData={subscriptionData} />

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
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                subData={subData}
                setOpenFreeModal={setOpenFreeModal}
                richContent={richContent}
                setRichContent={setRichContent}
                wordCount={wordCount}
                minutes={minutes}
                formattedSeconds={formattedSeconds}
                selectedModel={selectedModel}
                handleStreaming={handleStreaming}
                revisedScript={revisedScript}
                checkAndPublish={checkAndPublish}
                loading={loading}
                showPlayer={showPlayer}
                audio={audio}
                onCopy={onCopy}
                handleEditorChange={handleEditorChange}
                setLoading={setLoading}
                generateVoice={generateVoice}
                error={error}
                audioSource={audioSource}
                downloadLink={downloadLink}
                audioRef={audioRef}
                toggleAudioRef={toggleAudioRef}
                handleCloseAudio={handleCloseAudio}
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
