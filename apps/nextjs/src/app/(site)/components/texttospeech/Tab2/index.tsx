import { TabsContent } from "@voiceai/ui/@/components/ui/tabs";

import SelectedModelCard from "../voicewidget/selectedcard/selectedcard";
import AudioStreamButtons from "./audiostreambutton";
import ScriptInfoBadge from "./badge";
import ButtonsMenu from "./buttonmenu.tsx";
import CheckGrammarBlock from "./checkgrammar";
import { TextEditor } from "./texteditor/editor";

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

  audioStyle,
  downloadLink,
  loading,

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
          audioRef={audioRef}
          showPlayer={showPlayer}
          downloadLink={downloadLink}
          loading={loading}
          setShowConfetti={setShowConfetti}
          handleCloseAudio={handleCloseAudio}
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
