import Link from "next/link";
import ArrowDownOnSquareIcon from "@heroicons/react/24/outline/ArrowDownOnSquareIcon";
import { CopyIcon } from "@radix-ui/react-icons";
import Confetti from "react-confetti";

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
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@voiceai/ui/@/components/ui/tabs";
import { Textarea } from "@voiceai/ui/@/components/ui/textarea";
import { MagicWandIcon, SpeakerLoudIcon } from "@voiceai/ui/@/icons/icons";

import CustomButton from "../../custom-button";
import { TextEditor } from "../../editor";
import { HistoryButton } from "../../history-button";
import { SaveScript } from "../../save-script";
import { ScriptSelector } from "../../script-selector";
import { ToggleAudio } from "../../toggle-audio";
import { ToggleLibrary } from "../../toggle-voice-library";
import SelectedModelCard from "../voicewidget/selectedcard/selectedcard";
import AudioStreamButtons from "./audiostreambutton";
import ScriptInfoBadge from "./badge";
import ButtonsMenu from "./buttonmenu.tsx";
import CheckGrammarBlock from "./checkgrammar";

const TabTwo = ({
  script,
  subData,
  setOpenFreeModal,
  richContent,
  setRichContent,
  toggleAudioRef,
  audio,
  isSubscriptionActive,
  audioRef,
  showPlayer,
  handleCloseAudio,
  containerStyle,
  audioStyle,
  downloadLink,
  loading,
  buttonStyle,
  buttonHoverStyle,
  setShowConfetti,
  showConfetti,
  speedCategory,
  wordCount,
  minutes,
  formattedSeconds,
  selectedModel,
  handleStreaming,
  stability,
  similarity,
  generateVoice,
  revisedScript,
  setRevisedScript,
  setScript,
  checkAndPublish,
  setLoading,
  handleEditorChange,
  disabledButtonStyle,
  onCopy,
  isCopied,
}) => {
  return (
    <div className="md:order-2">
      <div className="rounded-lg bg-gray-100 p-4 shadow-md dark:bg-slate-400">
        <ButtonsMenu
          script={script}
          subData={subData}
          richContent={richContent}
          setOpenFreeModal={setOpenFreeModal}
          toggleAudioRef={toggleAudioRef}
          audio={audio}
          isSubscriptionActive={isSubscriptionActive}
          containerStyle={containerStyle}
          audioRef={audioRef}
          audioStyle={audioStyle}
          showPlayer={showPlayer}
          downloadLink={downloadLink}
          loading={loading}
          setShowConfetti={setShowConfetti}
          buttonStyle={buttonStyle}
          buttonHoverStyle={buttonHoverStyle}
          disabledButtonStyle={disabledButtonStyle}
            handleCloseAudio={  handleCloseAudio}
        />
        <TabsContent value="complete" className="mt-0 border-0 p-0">
          <div className="flex h-3/6 flex-col ">
            <TextEditor
              onChange={handleEditorChange}
              script={script}
              subData={subData}
              richContent={richContent}
              setRichContent={setRichContent}
              scriptLoaded={true}
              isSubscriptionActive={true}
            />

            <div className=" mb-4 flex flex-col items-center justify-center">
              <ScriptInfoBadge
                speedCategory={speedCategory}
                wordCount={wordCount}
                minutes={minutes}
                formattedSeconds={formattedSeconds}
              />
              <div className=" mt-3 flex w-[570px] justify-between">
                <div style={{ minWidth: "150px" }}>
                  {" "}
                  {/* Container with fixed width */}
                  <SelectedModelCard selectedModel={selectedModel} />
                </div>

                <AudioStreamButtons
                  subData={subData}
                  setOpenFreeModal={setOpenFreeModal}
                  setLoading={setLoading}
                  loading={loading}
                  script={script}
                  selectedModel={selectedModel}
                  stability={stability}
                  similarity={similarity}
                  audioRef={audioRef}
                  handleStreaming={handleStreaming}
                  generateVoice={generateVoice}
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </div>

      <TabsContent value="insert" className="mt-0 border-0 p-0">
        <CheckGrammarBlock
          script={script}
          setScript={setScript}
          revisedScript={revisedScript}
          setRevisedScript={setRevisedScript}
          selectedModel={selectedModel}
          loading={loading}
          setLoading={setLoading}
          checkAndPublish={checkAndPublish}
          onCopy={onCopy}
          isCopied={isCopied}
        />
      </TabsContent>
    </div>
  );
};

export default TabTwo;
