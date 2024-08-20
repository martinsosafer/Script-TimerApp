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
        <div className="ml-auto flex w-full space-x-2 sm:justify-end">
          <Tooltip>
            <TooltipTrigger>
              <Link href="/texttovoice">
                <Button
                  type="button"
                  size="sm"
                  className="rounded-xl bg-primary px-2 font-bold"
                >
                  <IconPlus className="mr-2 h-4 w-4" />
                  New Script
                  <span className="sr-only">Library</span>
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Start a new fresh story</TooltipContent>
          </Tooltip>
          <ScriptSelector script={script} />
          <Tooltip>
            <TooltipTrigger>
              <button
                onClick={subData ? undefined : () => setOpenFreeModal(true)}
              >
                <SaveScript
                  script={script}
                  subData={subData?.status}
                  richContent={richContent}
                />
              </button>
            </TooltipTrigger>
            <TooltipContent>Save a favorite script for later</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <HistoryButton
                subData={subData?.status}
                setOpenFreeModal={() => setOpenFreeModal(true)}
              />
            </TooltipTrigger>
            <TooltipContent>Your full voice over history</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              {subData ? (
                <ToggleLibrary />
              ) : (
                <Button
                  type="button"
                  size="sm"
                  className="rounded-xl bg-primary px-3 font-bold hover:text-tertiary"
                  onClick={() => setOpenFreeModal(true)}
                >
                  <Icons.SoundLibrary className="mr-2 h-4 w-4" />
                  Library
                  <span className="sr-only">Library</span>
                </Button>
              )}
            </TooltipTrigger>
            <TooltipContent>Voice actor library</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              {subData ? (
                <ToggleAudio
                  ref={toggleAudioRef}
                  audio={audio}
                  isSubscriptionActive={isSubscriptionActive}
                />
              ) : (
                <Button
                  type="button"
                  size="sm"
                  className="rounded-xl bg-primary px-3 font-bold hover:text-tertiary"
                  onClick={subData ? undefined : () => setOpenFreeModal(true)}
                >
                  <MagicWandIcon />
                  <SpeakerLoudIcon />
                  <span className="sr-only">Player</span>
                </Button>
              )}
              <div style={containerStyle}>
                <audio ref={audioRef} controls style={audioStyle} />
                {showPlayer && (
                  <div
                    className="controls-container"
                    style={{ display: "flex", gap: "10px" }}
                  >
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <button
                          onClick={() => {
                            if (downloadLink && isSubscriptionActive) {
                              const anchor = document.createElement("a");
                              anchor.href = downloadLink;
                              anchor.download = "audio.mp3";
                              anchor.click();
                              URL.revokeObjectURL(downloadLink);
                              setShowConfetti(true);
                            }
                          }}
                          disabled={
                            !downloadLink || !isSubscriptionActive || loading
                          }
                          style={
                            !isSubscriptionActive
                              ? disabledButtonStyle
                              : buttonStyle
                          }
                          onMouseOver={(e) =>
                            !isSubscriptionActive || loading
                              ? null
                              : (e.currentTarget.style.backgroundColor =
                                  buttonHoverStyle.backgroundColor)
                          }
                          onMouseOut={(e) =>
                            !isSubscriptionActive || loading
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
                        <HoverCardContent
                          className="w-[320px] text-sm"
                          side="right"
                        >
                          Free users can't download audio files.
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
                )}
                {showConfetti && (
                  <Confetti
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
            </TooltipTrigger>
            <TooltipContent>Open the voice player</TooltipContent>
          </Tooltip>
          <HoverCard openDelay={200}>
            <HoverCardTrigger asChild>
              <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {subData ? (
                  <TabsList className="grid grid-cols-2 bg-slate-300">
                    <TabsTrigger
                      value="complete"
                      className="flex items-center justify-center rounded-full data-[state=active]:bg-primary"
                    >
                      <span className="sr-only">Complete</span>
                      <PencilIcon className="h-4 w-4 text-primary-foreground" />
                    </TabsTrigger>
                    <TabsTrigger
                      value="insert"
                      className="flex items-center justify-center rounded-full data-[state=active]:bg-primary"
                    >
                      <span className="sr-only">Insert</span>
                      <CorrectDocumentIcon className="h-4 w-4 text-primary-foreground" />
                    </TabsTrigger>
                  </TabsList>
                ) : (
                  <button
                    className="flex h-full items-center justify-around rounded-xl bg-slate-300 px-2 font-bold"
                    onClick={() => setOpenFreeModal(true)}
                  >
                    <div className="flex h-6 w-10 items-center justify-center rounded-full bg-primary">
                      <span className="sr-only">Complete</span>
                      <PencilIcon className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="flex h-6 w-10 items-center justify-center rounded-full data-[state=active]:bg-primary">
                      <span className="sr-only">Insert</span>
                      <CorrectDocumentIcon className="h-4 w-4 text-primary-foreground" />
                    </div>
                  </button>
                )}
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-[320px] text-sm" side="left">
              Click to open grammar, spelling and script suggestions.
            </HoverCardContent>
          </HoverCard>
        </div>
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
              <Badge className="h-12 w-[570px] items-center justify-center border-4 border-primary bg-blue-500 text-sm hover:to-blue-200">
                <span className="font-bold text-tertiary dark:text-tertiary">
                  {speedCategory}
                </span>
                &nbsp;Great script!&nbsp;
                <span className="font-bold text-tertiary dark:text-tertiary">
                  {wordCount}
                </span>
                &nbsp;words. That looks to be about&nbsp;
                <span className="font-bold text-tertiary dark:text-tertiary">
                  {minutes}
                </span>
                &nbsp;minutes and&nbsp;
                <span className="font-bold text-tertiary dark:text-tertiary">
                  {formattedSeconds}
                </span>
                &nbsp;seconds.
              </Badge>
              <div className=" mt-3 flex w-[570px] justify-between">
                <div style={{ minWidth: "150px" }}>
                  {" "}
                  {/* Container with fixed width */}
                  <SelectedModelCard selectedModel={selectedModel} />
                </div>

                <HoverCard openDelay={200}>
                  <HoverCardTrigger asChild>
                    <div>
                      <CustomButton
                        type="secondary"
                        onClick={
                          !subData
                            ? () => setOpenFreeModal(true)
                            : async () => {
                                setLoading(true);
                                try {
                                  // Extract the first 10 words from the script
                                  const firstTenWords = script
                                    .replace(/<[^>]+>/g, "")
                                    .split(/\s+/)
                                    .slice(0, 10)
                                    .join(" ");
                                  await handleStreaming({
                                    userPlan: subData.status,
                                    voice_id: selectedModel.external_id,
                                    voice_actor: selectedModel.name,
                                    message: firstTenWords,
                                    stability: stability[0],
                                    similarity: similarity[0],
                                    setLoading,
                                    audioRef,
                                  });
                                  setLoading(false);
                                } catch {}
                              }
                        }
                      >
                        <div className="flex items-center">
                          {loading && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              {" "}
                              {/* Center the spinner */}
                              <Icons.spinner className="h-4 w-4 animate-spin" />
                            </div>
                          )}
                        </div>
                        <span className="relative z-10">
                          {loading ? "" : "Quick Test"}
                        </span>
                      </CustomButton>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-[320px] text-sm" side="left">
                    Test the first 10 words of the script
                  </HoverCardContent>
                </HoverCard>
                <HoverCard openDelay={200}>
                  <HoverCardTrigger asChild>
                    <div>
                      <CustomButton
                        type="secondary"
                        onClick={
                          !subData
                            ? () => setOpenFreeModal(true)
                            : async () => {
                                try {
                                  await handleStreaming({
                                    userPlan: subData.status,
                                    voice_id: selectedModel.external_id,
                                    voice_actor: selectedModel.name,
                                    message: script,
                                    userPlan: subData.status,
                                    stability: stability[0],
                                    similarity: similarity[0],
                                    setLoading,
                                    audioRef,
                                  });
                                  await generateVoice({
                                    voice_id: selectedModel?.id,
                                    voice_actor: selectedModel?.name,
                                    message: script,
                                    stability: stability?.[0],
                                    similarity: similarity?.[0],
                                  });
                                } catch (e) {
                                  console.log("catcherror", e);
                                }
                              }
                        }
                      >
                        <div className="flex items-center">
                          {loading && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              {" "}
                              {/* Center the spinner */}
                              <Icons.spinner className="h-4 w-4 animate-spin" />
                            </div>
                          )}
                        </div>
                        <span className="relative z-10">
                          {loading ? "" : "Create"}
                        </span>
                      </CustomButton>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-[320px] text-sm" side="left">
                    Press create after your script is above and your voice actor
                    is chosen
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
          </div>
        </TabsContent>
      </div>

      <TabsContent value="insert" className="mt-0 border-0 p-0">
        <div className="flex flex-col ">
          <div className="grid  grid-rows-2 gap-6 md:grid-cols-2 lg:grid-cols-2 lg:grid-rows-1">
            <div>
              <Textarea
                value={script}
                onChange={(e) => setScript(e.target.value)}
                placeholder="Your script here..."
                className=" min-h-[50vh] md:min-h-[55vh] lg:min-h-[70vh] xl:min-h-[70vh]"
              />
              <div className="flex items-center justify-end ">
                {selectedModel && (
                  <SelectedModelCard selectedModel={selectedModel} />
                )}
              </div>
            </div>
            {revisedScript.length > 0 ? (
              <div className="relative">
                <Textarea
                  value={revisedScript}
                  onChange={(e) => setRevisedScript(e.target.value)}
                  className="min-h-[50vh] md:min-h-[55vh] lg:min-h-[70vh] xl:min-h-[70vh]"
                />
                <div className="flex items-center justify-end ">
                  <h3 className="text-lg  font-medium">
                    If you want more writing support, go to:{" "}
                    <Link
                      href="https://script-timer.com/chat"
                      target="_blank"
                      className="text-blue-500 underline hover:text-blue-700"
                    >
                      https://script-timer.com/chat
                    </Link>{" "}
                    or, our other tools at{" "}
                    <Link
                      href="https://script-timer.com/more-tools/"
                      target="_blank"
                      className="text-blue-500 underline hover:text-blue-700"
                    >
                      https://script-timer.com/more-tools/
                    </Link>{" "}
                    or ask an expert writer for help at{" "}
                    <span className="text-blue-500 underline hover:text-blue-700">
                      {" "}
                      info@Ripmediagroup.com
                    </span>
                  </h3>
                </div>
                <div className="flex flex-col">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className="absolute -right-10 top-8 mr-2 mt-2 px-3"
                        disabled={
                          loading ||
                          script.trim() === "" ||
                          script === revisedScript
                        }
                        onClick={() => {
                          setLoading(true);
                          checkAndPublish(script);
                        }}
                      >
                        <IconRefresh className="text-blue-500" />
                        <span className="sr-only">Revise</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Revise script</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute -right-10 top-0 mr-2 mt-2 px-3"
                        onClick={onCopy}
                      >
                        {isCopied ? (
                          <IconCheck className="text-blue-500" />
                        ) : (
                          <CopyIcon className="text-blue-500" />
                        )}
                        <span className="sr-only">Copy message</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Click to copy.</TooltipContent>
                  </Tooltip>
                </div>
              </div>
            ) : (
              <div className="flex cursor-pointer flex-col items-center justify-evenly rounded-md border bg-muted p-1 text-center">
                <span>Grammar and spell check your script</span>
                <Button
                  className="border-2 border-dashed"
                  disabled={script.trim() === "" || script === revisedScript}
                  onClick={() => {
                    setLoading(true);
                    checkAndPublish(script);
                  }}
                >
                  Grammar and Spelling
                </Button>
              </div>
            )}
          </div>
        </div>
      </TabsContent>
    </div>
  );
};

export default TabTwo;
