"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ArrowDownOnSquareIcon from "@heroicons/react/24/outline/ArrowDownOnSquareIcon";
import { CopyIcon } from "@radix-ui/react-icons";
import ReactConfetti from "react-confetti";

import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@voiceai/ui";
import { Badge } from "@voiceai/ui/@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@voiceai/ui/@/components/ui/hover-card";
import {
  CorrectDocumentIcon,
  IconCheck,
  IconClose,
  IconPlus,
  IconRefresh,
  Icons,
  PencilIcon,
} from "@voiceai/ui/@/components/ui/icons";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@voiceai/ui/@/components/ui/tabs";
import { Textarea } from "@voiceai/ui/@/components/ui/textarea";
import { useCopyToClipboard } from "@voiceai/ui/@/hooks/use-copy-to-clipboard";
import { MagicWandIcon, SpeakerLoudIcon } from "@voiceai/ui/@/icons/icons";

import { useGenerateVoice } from "~/app/hooks/texttovoice/useGenerateVoice";
import { useReviseScript } from "~/app/hooks/texttovoice/useRevisedScript";
import { useScriptDetails } from "~/app/hooks/texttovoice/useScriptDetails";
import useStreamingAudio from "~/app/hooks/texttovoice/useStreamingAudio";
import { useSubscription } from "~/app/hooks/texttovoice/useSubscription";
import { calculateLengthTime } from "~/lib/calculate-length-time";
import CustomButton from "../../components/custom-button";
import { TextEditor } from "../../components/editor";
import { HistoryButton } from "../../components/history-button";
import NoSessionModal from "../../components/modals/no-session-modal";
import { SaveScript } from "../../components/save-script";
import { ScriptSelector } from "../../components/script-selector";
import TabOne from "../../components/texttospeech/Tab1";
import TabTwo from "../../components/texttospeech/Tab2";
import TTVIntroBlock from "../../components/texttospeech/ttvintroblock";
import SelectedModelCard from "../../components/texttospeech/voicewidget/selectedcard/selectedcard";
import { ToggleAudio } from "../../components/toggle-audio";
import { ToggleLibrary } from "../../components/toggle-voice-library";

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
  const containerStyle = {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    maxWidth: "500px", // Reduced size
    width: "100%",
    height: "80px", // Reduced height
    backgroundColor: "#3B82F6",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    borderRadius: "8px",
    zIndex: 1000,
    opacity: showPlayer ? 1 : 0,
    transition: "opacity 0.5s ease-in-out",
    border: "1px solid black", // Subtle black border
  };

  const audioStyle = {
    flex: 1,
    height: "50px", // Slightly smaller height
    backgroundColor: "transparent",
    border: "none",
  };

  const buttonStyle = {
    backgroundColor: "#F97316",
    border: "1px solid black", // Subtle black border
    borderRadius: "4px", // Square corners
    color: "white",
    padding: "8px", // Padding around the icon
    cursor: "pointer",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s",
    width: "40px", // Square size
    height: "40px", // Square size
    marginLeft: "4px",
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: "#e76f00", // Darker on hover
  };
  const disabledButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f7a07a", // Lighter orange
    cursor: "not-allowed",
    opacity: 0.6,
  };
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
                containerStyle={containerStyle}
                audioStyle={audioStyle}
                downloadLink={downloadLink}
                loading={loading}
                buttonStyle={buttonStyle}
                buttonHoverStyle={buttonHoverStyle}
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
                disabledButtonStyle={disabledButtonStyle}
                onCopy={onCopy}
                isCopied={isCopied}
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
