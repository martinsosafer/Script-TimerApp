"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ArrowDownOnSquareIcon from "@heroicons/react/24/outline/ArrowDownOnSquareIcon";
import { CopyIcon } from "@radix-ui/react-icons";
import { useCompletion } from "ai/react";
import Confetti from "react-confetti";

import { Badge } from "@voiceai/ui/@/components/ui/badge";
import { Button } from "@voiceai/ui/@/components/ui/button";
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
import { toast, ToastAction } from "@voiceai/ui/@/components/ui/toast";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@voiceai/ui/@/components/ui/tooltip";
import { useCopyToClipboard } from "@voiceai/ui/@/hooks/use-copy-to-clipboard";
import { MagicWandIcon, SpeakerLoudIcon } from "@voiceai/ui/@/icons/icons";

import { calculateLengthTime } from "~/lib/calculate-length-time";
import { api } from "~/utils/api";
import CustomButton from "../../components/custom-button";
import { HistoryButton } from "../../components/history-button";
import NoSessionModal from "../../components/modals/no-session-modal";
import { SaveScript } from "../../components/save-script";
import { ScriptSelector } from "../../components/script-selector";
import { StabilitySelector } from "../../components/stability-selector";
import { TextEditor } from "../../components/texttospeech/Tab2/texteditor/editor";
import IntroParagraph from "../../components/texttospeech/ttvintroblock/introparagraph/introparagraph";
import SelectedModelCard from "../../components/texttospeech/voicewidget/selectedcard/selectedcard";
import VoiceWidget from "../../components/texttospeech/voicewidget/voicewidget";
import { ToggleAudio } from "../../components/toggle-audio";
import { ToggleLibrary } from "../../components/toggle-voice-library";

export function ScriptAI({
  subData,
}: {
  subData: SubscriptionData | null | undefined;
}) {
  console.log("props subDAta", subData);

  const { data: subscriptionData, refetch } =
    api.subscription.mySubscription.useQuery();

  const [favoriteVoices, setFavoriteVoices] = React.useState([]);

  const isSubscriptionActive =
    subscriptionData &&
    (subscriptionData.status === "CREATOR" ||
      subscriptionData.status === "STUDENT" ||
      subscriptionData.status === "BUSINESS");

  React.useEffect(() => {
    if (subscriptionData?.favorite_voices) {
      setFavoriteVoices(subscriptionData.favorite_voices);
    }
  }, [subscriptionData]);

  const refreshSubscriptionData = () => {
    refetch();
  };

  // Script AI parameters
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [script, setScript] = React.useState("");
  const [richContent, setRichContent] = React.useState("");
  const [selectedModel, setSelectedModel] = React.useState(null);
  const [similarity, setSimilarity] = React.useState([0.8]);
  const [stability, setStability] = React.useState([0.5]);
  const [showWaitModal, setWaitModal] = React.useState(false);
  // If script is selected from URL path parameter, load in state from db
  const { scriptId } = useParams();
  //modal logic

  //scriptdetials
  const { data: scriptDetails } = api.script.get.useQuery(
    { id: scriptId?.[0] ?? "" },
    { enabled: Boolean(scriptId?.[0]) },
  );

  React.useEffect(() => {
    if (scriptDetails) {
      setScript(scriptDetails.script);
    }
  }, [scriptDetails]);

  //handle change for editor so it sets changes to the text area
  const handleEditorChange = (content) => {
    setScript(content); // Update the script state with the content from the editor
  };
  // Revise script grammar/spelling with AI
  const [revisedScript, setRevisedScript] = React.useState("");
  const { complete } = useCompletion({
    api: "/api/completion",
  });
  const checkAndPublish = React.useCallback(
    async (c: string) => {
      setLoading(true);
      try {
        const completion = await complete(c);
        if (!completion) throw new Error("Failed to check typos");
        setRevisedScript(completion);
      } catch (error) {
        console.error("Error fetching completion:", error);
        // Handle error appropriately
        setRevisedScript("Error processing request");
      } finally {
        setLoading(false);
      }
    },
    [complete],
  );

  // Generate audio voice
  const [audio, setAudio] = React.useState<string>("");
  const [openFreeModal, setOpenFreeModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null); // Ref for audio element
  const toggleAudioRef = React.useRef<HTMLButtonElement>(null); // Ref for toggle button
  const { mutateAsync: generateVoice, error } = api.voice.create.useMutation({
    onSuccess(data) {
      setLoading(false);
    },
    onError(error) {
      setLoading(false);
      console.log("Mutation error:", error); // Add this line
      if (error?.data?.code === "FORBIDDEN") {
        toast({
          title: "Upgrade your plan",
          description: "Free plan only supports up to 300 characters",
          action: (
            <ToastAction altText="subscribe">
              <Link href="/settings/billing">Subscribe</Link>
            </ToastAction>
          ),
        });
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again later",
        });
      }
    },
  });
  const [audioSource, setAudioSource] = React.useState(null);
  const [showPlayer, setShowPlayer] = React.useState(false);
  const [downloadLink, setDownloadLink] = React.useState(null);
  const handleStreaming = async ({
    voice_id,
    voice_actor,
    message,
    stability,
    similarity,
    setLoading,
    userPlan,
  }) => {
    if (!message || message.trim() === "") {
      toast({
        title: "Error",
        description: "Please remember to write a script before making a voice!",
      });
      return;
    }

    setLoading(true);

    const charLimit = {
      FREE: 300,
      FREE_TRIAL: 2000,
      STUDENT: 2000,
      CREATOR: 5000,
      BUSINESS: 10000,
    };

    if (message.length > charLimit[userPlan]) {
      let errorMessage = "Please try again later";

      if (userPlan === "FREE") {
        errorMessage = "Free plan only supports up to 300 characters";
      } else if (userPlan === "FREE_TRIAL") {
        errorMessage = "Your plan only supports up to 16000 characters";
      } else if (userPlan === "STUDENT") {
        errorMessage = "Your plan only supports up to 2000 characters";
      } else if (userPlan === "CREATOR") {
        errorMessage = "Your plan only supports up to 5000 characters";
      } else if (userPlan === "BUSINESS") {
        errorMessage = "Your plan only supports up to 10000 characters";
      }

      setLoading(false);

      toast({
        title: "Character Limit Exceeded",
        description: errorMessage,
      });

      return;
    }

    try {
      const response = await fetch("/api/voice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: message,
          voice_id,
          voice_actor,
          stability,
          similarity,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from API:", errorText);
        throw new Error("Failed to fetch the text-to-speech stream.");
      }

      const responseBody = response.body;
      if (!responseBody) {
        throw new Error("Response body is null.");
      }

      const mediaSource = new MediaSource();
      const objectUrl = URL.createObjectURL(mediaSource);
      setAudioSource(objectUrl); // Set the audio source URL
      audioRef.current.src = objectUrl;

      // Store audio data chunks
      const audioChunks = [];

      mediaSource.addEventListener("sourceopen", async () => {
        const sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");
        const reader = responseBody.getReader();

        const readStream = async () => {
          const processBuffer = async (value) => {
            return new Promise((resolve, reject) => {
              const onBufferAppended = () => {
                sourceBuffer.removeEventListener("updateend", onBufferAppended);
                resolve();
              };
              sourceBuffer.addEventListener("updateend", onBufferAppended);
              try {
                sourceBuffer.appendBuffer(value);
                // Push chunk to audioChunks
                audioChunks.push(value);
              } catch (error) {
                reject(error);
              }
            });
          };

          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              if (!sourceBuffer.updating && mediaSource.readyState === "open") {
                mediaSource.endOfStream();
              } else {
                sourceBuffer.addEventListener(
                  "updateend",
                  () => {
                    if (mediaSource.readyState === "open") {
                      mediaSource.endOfStream();
                    }
                  },
                  { once: true },
                );
              }
              break;
            }
            await processBuffer(value);
          }

          // Create a blob from audioChunks and set download link
          const audioBlob = new Blob(audioChunks, { type: "audio/mpeg" });
          const downloadUrl = URL.createObjectURL(audioBlob);
          setDownloadLink(downloadUrl);

          // Audio is ready, stop loading
          setLoading(false);
        };

        readStream().catch((error) => {
          console.error("Error streaming audio:", error);
          if (!sourceBuffer.updating && mediaSource.readyState === "open") {
            mediaSource.endOfStream("decode");
          } else {
            sourceBuffer.addEventListener(
              "updateend",
              () => {
                if (mediaSource.readyState === "open") {
                  mediaSource.endOfStream("decode");
                }
              },
              { once: true },
            );
          }
        });

        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      });

      setShowPlayer(true); // Show the player when audio starts
    } catch (error) {
      console.error("Error streaming audio:", error);
      setLoading(false);

      toast({
        title: "Something went wrong",
        description: "Please try again later",
      });
    }
  };
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
  const handleCloseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setShowPlayer(false);
    setAudioSource(null); // Optionally clear the audio source
  };

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
        <div className="mb-6 mt-6 flex items-center justify-center">
          <div>
            <h1 className="mb-3 text-center font-poppins  text-3xl  font-bold text-secondary-foreground">
              Text to Voice
            </h1>
            <IntroParagraph status={subscriptionData?.status} />
          </div>
        </div>

        <Tabs defaultValue="complete" className="flex-1">
          <div className="container mb-4 h-full ">
            <div className="grid h-full items-stretch gap-6 md:grid-cols-[400px_1fr]">
              <div className=" flex flex-col space-y-4 md:order-1">
                {/* <ModelSelector
                types={types}
                models={models}
                onModelSelect={setSelectedModel}
              /> */}
                <div className="rounded-lg  bg-gray-100 p-6 shadow-md dark:bg-slate-400">
                  <VoiceWidget
                    onModelSelect={setSelectedModel}
                    favoriteVoices={favoriteVoices}
                    refreshSubscriptionData={refreshSubscriptionData}
                    subData={subData}
                  />

                  <StabilitySelector
                    value={stability}
                    onValueChange={setStability}
                  />
                </div>
              </div>
              <div className="   md:order-2">
                {/* <Badge>Your script is {script.length} characters long.</Badge> */}
                <div className="rounded-lg bg-gray-100  p-4 shadow-md dark:bg-slate-400">
                  <div className="ml-auto flex w-full space-x-2 sm:justify-end ">
                    <Tooltip>
                      <TooltipTrigger>
                        <Link href="/texttovoice">
                          <Button
                            type="button"
                            size="sm"
                            className="rounded-xl bg-primary px-2 font-bold "
                          >
                            <IconPlus className="mr-2 h-4 w-4 " />
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
                          onClick={
                            subData ? undefined : () => setOpenFreeModal(true)
                          }
                        >
                          <SaveScript
                            script={script}
                            subData={subData?.status}
                            richContent={richContent}
                          />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        Save a favorite script for later
                      </TooltipContent>
                    </Tooltip>

                    {/* <CodeViewer /> */}

                    <Tooltip>
                      <TooltipTrigger>
                        <HistoryButton
                          subData={subData?.status}
                          setOpenFreeModal={() => setOpenFreeModal(true)}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        Your full voice over history{" "}
                      </TooltipContent>
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
                            <Icons.SoundLibrary className="mr-2 h-4 w-4 " />
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
                            onClick={
                              subData ? undefined : () => setOpenFreeModal(true)
                            }
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
                                      if (
                                        downloadLink &&
                                        isSubscriptionActive
                                      ) {
                                        const anchor =
                                          document.createElement("a");
                                        anchor.href = downloadLink;
                                        anchor.download = "audio.mp3";
                                        anchor.click();
                                        URL.revokeObjectURL(downloadLink);
                                        setShowConfetti(true);
                                      }
                                    }}
                                    disabled={
                                      !downloadLink ||
                                      !isSubscriptionActive ||
                                      loading
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
                                <IconClose
                                  width={24}
                                  style={{ color: "white" }}
                                />
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
                      <TooltipContent> Open the voice player</TooltipContent>
                    </Tooltip>
                    {/* <PresetActions /> */}

                    <HoverCard openDelay={200}>
                      <HoverCardTrigger asChild>
                        <div className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {subData ? (
                            <TabsList className=" grid grid-cols-2  bg-slate-300">
                              <TabsTrigger
                                value="complete"
                                className=" flex items-center justify-center  rounded-full data-[state=active]:bg-primary"
                              >
                                <span className="sr-only">Complete</span>
                                <PencilIcon className=" h-4 w-4 text-primary-foreground" />
                              </TabsTrigger>
                              <TabsTrigger
                                value="insert"
                                className="flex items-center justify-center  rounded-full  data-[state=active]:bg-primary"
                              >
                                <span className="sr-only">Insert</span>
                                <CorrectDocumentIcon className=" h-4 w-4 text-primary-foreground " />
                              </TabsTrigger>
                            </TabsList>
                          ) : (
                            <button
                              className="flex h-full items-center justify-around rounded-xl bg-slate-300 px-2 font-bold"
                              onClick={() => setOpenFreeModal(true)}
                            >
                              <div className=" flex h-6 w-10 items-center justify-center rounded-full bg-primary">
                                <span className="sr-only">Complete</span>
                                <PencilIcon className=" h-4 w-4 text-primary-foreground" />
                              </div>
                              <div className=" flex  h-6 w-10 items-center justify-center  rounded-full data-[state=active]:bg-primary">
                                <span className="sr-only">Insert</span>
                                <CorrectDocumentIcon className=" h-4 w-4 text-primary-foreground" />
                              </div>
                            </button>
                          )}
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent
                        className="w-[320px] text-sm"
                        side="left"
                      >
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
                                              voice_id:
                                                selectedModel.external_id,
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
                            <HoverCardContent
                              className="w-[320px] text-sm"
                              side="left"
                            >
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
                                              voice_id:
                                                selectedModel.external_id,
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
                            <HoverCardContent
                              className="w-[320px] text-sm"
                              side="left"
                            >
                              Press create after your script is above and your
                              voice actor is chosen
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
                            disabled={
                              script.trim() === "" || script === revisedScript
                            }
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
            </div>
          </div>
        </Tabs>
        {/* )} */}
        {/* {(!isSubscriptionActive || showModal) && (
        <Modal isOpen={showModal} onClose={closeModal} />
      )} */}
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
