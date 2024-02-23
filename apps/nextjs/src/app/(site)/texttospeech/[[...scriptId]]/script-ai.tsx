"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CopyIcon } from "@radix-ui/react-icons";
import { useCompletion } from "ai/react";

import { Badge } from "@voiceai/ui/@/components/ui/badge";
import { Button } from "@voiceai/ui/@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
} from "@voiceai/ui/@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@voiceai/ui/@/components/ui/hover-card";
import {
  CorrectDocumentIcon,
  IconCheck,
  IconRefresh,
  Icons,
  PencilIcon,
} from "@voiceai/ui/@/components/ui/icons";
import { Label } from "@voiceai/ui/@/components/ui/label";
import { ScrollArea, ScrollBar } from "@voiceai/ui/@/components/ui/scroll-area";
import { Separator } from "@voiceai/ui/@/components/ui/separator";
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

import { calculateLength } from "~/lib/calculate-length";
import { calculateLengthtTime } from "~/lib/calculate-length-time";
import { api } from "~/utils/api";
import { useDragAndDrop } from "~/utils/helpers";
import { HistoryButton } from "../../components/history-button";
import { ModelSelector } from "../../components/model-selector";
import { SaveScript } from "../../components/save-script";
import { ScriptSelector } from "../../components/script-selector";
import { Share } from "../../components/share";
import { SimilaritySelector } from "../../components/similarity-selector";
import { StabilitySelector } from "../../components/stability-selector";
import { ToggleAudio } from "../../components/toggle-audio";
import { ToggleLibrary } from "../../components/toggle-voice-library";
import { VoiceLibrary } from "../../components/voice-library";
import { models, types } from "../../data/models";

export function ScriptAI({}) {
  const [open, setOpen] = React.useState(false);

  // Script AI parameters
  const [script, setScript] = React.useState("");
  const [selectedModel, setSelectedModel] = React.useState(null);
  const [similarity, setSimilarity] = React.useState([0.8]);
  const [stability, setStability] = React.useState([0.5]);
  // If script is selected from URL path parameter, load in state from db
  const { scriptId } = useParams();

  const { data: scriptDetails } = api.script.get.useQuery(
    { id: scriptId?.[0] ?? "" },
    { enabled: Boolean(scriptId?.[0]) },
  );

  React.useEffect(() => {
    if (scriptDetails) {
      setScript(scriptDetails.script);
    }
  }, [scriptDetails]);

  // Revise script grammar/spelling with AI
  const [revisedScript, setRevisedScript] = React.useState("");
  const { complete } = useCompletion({
    api: "/api/completion",
  });
  const checkAndPublish = React.useCallback(
    async (c: string) => {
      const completion = await complete(c);
      if (!completion) throw new Error("Failed to check typos");
      setLoading(false);
      setRevisedScript(completion);
    },
    [complete],
  );

  // Generate audio voice
  const [audio, setAudio] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const toggleAudioRef = React.useRef<React.Ref<HTMLButtonElement>>(null);
  const { mutateAsync: generateVoice, error } = api.voice.create.useMutation({
    onSuccess(data) {
      const dataURI = `data:audio/mpeg;base64,${data?.audio}`;
      setAudio(dataURI);
      setOpen(true);
      setLoading(false);
      console.log("clicking");
      if (toggleAudioRef?.current) {
        // @ts-expect-error weird typing with ref
        toggleAudioRef.current?.click();
      }
    },
    onError(error) {
      setLoading(false);
      if (error?.data?.code === "FORBIDDEN") {
        toast({
          title: "Upgrade your plan",
          description: "The base plan only supports up to 1200 characters",
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

  // Drag and drop functionality
  const { handleDragStart, handleDrop, handleDragOver } = useDragAndDrop(
    revisedScript,
    setScript,
  );
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(revisedScript);
  };
  const { wordCount, minutes, formattedSeconds } = calculateLengthtTime(script);
  return (
    <div className=" h-screen flex-col  md:flex">
      <div className="md:min-h-20 lg:min-h-20 container  mb-5  mt-5 flex flex-col items-start justify-between sm:flex-row sm:items-center sm:space-y-0">
        <h2 className="mr-2 flex-shrink-0 bg-gradient-to-r from-black to-blue-500 bg-clip-text text-xl font-bold text-transparent dark:bg-gradient-to-r dark:from-white dark:to-blue-500">
          Listen to your script
        </h2>
        <div className="ml-auto flex w-full space-x-2 sm:justify-end">
          <ScriptSelector />
          <SaveScript script={script} />

          {/* <CodeViewer /> */}
          <Share />
          <HistoryButton />
          <Tooltip>
            <TooltipTrigger>
              <ToggleLibrary />
            </TooltipTrigger>
            <TooltipContent>Click to open your voice library</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <ToggleAudio ref={toggleAudioRef} audio={audio} />
            </TooltipTrigger>
            <TooltipContent>Click to open your voice player</TooltipContent>
          </Tooltip>
          {/* <PresetActions /> */}
        </div>
      </div>
      <Separator />

      <Tabs defaultValue="complete" className="flex-1">
        <div className="container mb-4 h-full ">
          <div className="grid h-full items-stretch gap-6 md:grid-cols-[200px_1fr]">
            <div className=" flex flex-col space-y-4 md:order-1">
              <div className="grid ">
                <HoverCard openDelay={200}>
                  <HoverCardTrigger asChild>
                    <div className="py-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      <span className="mb-2 flex-1 text-center underline">
                        Check grammar and spelling
                      </span>

                      <TabsList className=" mt-3 grid grid-cols-2 bg-slate-300">
                        <TabsTrigger
                          value="complete"
                          className=" flex items-center justify-center data-[state=active]:bg-primary"
                        >
                          <span className="sr-only">Complete</span>
                          <PencilIcon className="h-5 w-5 text-primary-foreground" />
                        </TabsTrigger>
                        <TabsTrigger
                          value="insert"
                          className="flex items-center justify-center  data-[state=active]:bg-primary"
                        >
                          <span className="sr-only">Insert</span>
                          <CorrectDocumentIcon className="h-5 w-5 text-primary-foreground " />
                        </TabsTrigger>
                      </TabsList>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-[320px] text-sm" side="left">
                    Click to open grammar, spelling and script suggestions.
                  </HoverCardContent>
                </HoverCard>
              </div>
              {/* <ModelSelector
                types={types}
                models={models}
                onModelSelect={setSelectedModel}
              /> */}
              <div>
                <div className="flex items-center justify-between underline">
                  <Label htmlFor="similarity">Choose Your Voice Actor</Label>
                </div>
                <ScrollArea className="mt-2 h-[270px] px-1" type="always">
                  <div className="space-y-1 p-2">
                    <VoiceLibrary onModelSelect={setSelectedModel} />
                  </div>
                  <ScrollBar className="scrollbar-thumb-rounded-full scrollbar-thumb-red-500 bg-primary" />
                </ScrollArea>
              </div>
              {/* <SimilaritySelector
                value={similarity}
                onValueChange={setSimilarity}
              /> */}
              {/* <MaxLengthSelector defaultValue={[256]} /> */}
              <StabilitySelector
                value={stability}
                onValueChange={setStability}
              />
              {/* <Button
                className=" bg-tertiary font-semibold  "
                disabled={!selectedModel || !script}
                onClick={async () => {
                  setLoading(true);
                  try {
                    await generateVoice({
                      // @ts-expect-error need to type this in the state
                      voice_id: selectedModel?.id,
                      message: script,
                      stability: stability?.[0],
                      similarity: similarity?.[0],
                    });
                    setLoading(false);
                  } catch {}
                }}
              >
                {loading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Create"
                )}
              </Button> */}

              {/* <div className="py-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="similarity">Preview Voices</Label>
                </div>
                <ScrollArea className="h-[300px] px-1">
                  <div className="space-y-1 p-2">
                    <VoiceLibrary />
                  </div>
                </ScrollArea>
              </div> */}
            </div>
            <div className="md:order-2">
              <TabsContent value="complete" className="mt-0 border-0 p-0">
                {/* <Badge>Your script is {script.length} characters long.</Badge> */}

                <div className="flex h-3/6 flex-col ">
                  <Textarea
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    placeholder={`
                    1.Add your script here 
                    2.Choose the voice actor you like
                    3.You can quickly check spelling and grammar`}
                    className="h-3/5 min-h-[250px] flex-1 p-4 md:min-h-[400px] lg:min-h-[350px]"
                  />
                  <div className="flex flex-col items-center justify-center  ">
                    <Badge className="h-12  w-[450px] items-center justify-center ">
                      Script is&nbsp;
                      <span className="font-semibold text-tertiary dark:text-tertiary">
                        {wordCount}
                      </span>
                      &nbsp;words. Estimated time is&nbsp;
                      <span className="font-semibold text-tertiary  dark:text-tertiary">
                        {minutes}
                      </span>
                      &nbsp;minutes and&nbsp;
                      <span className="font-semibold text-tertiary  dark:text-tertiary">
                        {formattedSeconds}
                      </span>
                      &nbsp;seconds
                    </Badge>
                    <Button
                      className="mb-16 mt-2 h-12 w-[450px] bg-tertiary p-3  font-semibold "
                      disabled={!selectedModel || !script}
                      onClick={async () => {
                        setLoading(true);
                        try {
                          await generateVoice({
                            // @ts-expect-error need to type this in the state
                            voice_id: selectedModel?.id,
                            message: script,
                            stability: stability?.[0],
                            similarity: similarity?.[0],
                          });
                          setLoading(false);
                        } catch {}
                      }}
                    >
                      {loading ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        "Create"
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="insert" className="mt-0 border-0 p-0">
                <div className="flex flex-col ">
                  <div className="grid  grid-rows-2 gap-6 md:grid-cols-2 lg:grid-cols-2 lg:grid-rows-1">
                    <div>
                      <Textarea
                        value={script}
                        onChange={(e) => setScript(e.target.value)}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        placeholder="Your script here..."
                        className=" min-h-[50vh] md:min-h-[55vh] lg:min-h-[70vh] xl:min-h-[80vh]"
                      />
                      <div className="flex items-center justify-end ">
                        <Badge className="flex items-center">
                          <span className="inline">
                            Script is&nbsp;
                            <span className="font-semibold text-tertiary dark:text-tertiary">
                              {wordCount}
                            </span>
                            &nbsp;words. Estimated time &nbsp;
                            <span className="font-semibold text-tertiary  dark:text-tertiary">
                              {minutes}
                            </span>
                            &nbsp;minutes and&nbsp;
                            <span className="font-semibold text-tertiary  dark:text-tertiary">
                              {formattedSeconds}
                            </span>
                            &nbsp;seconds
                          </span>
                        </Badge>
                      </div>
                    </div>
                    {revisedScript.length > 0 ? (
                      <div className="relative">
                        <Textarea
                          value={revisedScript}
                          onChange={(e) => setRevisedScript(e.target.value)}
                          draggable="true"
                          onDragStart={handleDragStart}
                          className="min-h-[50vh] md:min-h-[55vh] lg:min-h-[70vh] xl:min-h-[80vh]"
                        />
                        <div className="flex items-center justify-end ">
                          <Badge className="flex items-center">
                            <span className="inline">
                              Script is&nbsp;
                              <span className="font-semibold text-tertiary dark:text-tertiary">
                                {wordCount}
                              </span>
                              &nbsp;words. Estimated time &nbsp;
                              <span className="font-semibold text-tertiary  dark:text-tertiary">
                                {minutes}
                              </span>
                              &nbsp;minutes and&nbsp;
                              <span className="font-semibold text-tertiary  dark:text-tertiary">
                                {formattedSeconds}
                              </span>
                              &nbsp;seconds
                            </span>
                          </Badge>
                        </div>
                        <div className="flex flex-col">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                className="absolute right-0 top-8 mr-2 mt-2 px-3"
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
                                <IconRefresh />
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
                                className="absolute right-0 top-0 mr-2 mt-2 px-3"
                                onClick={onCopy}
                              >
                                {isCopied ? <IconCheck /> : <CopyIcon />}
                                <span className="sr-only">Copy message</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              Click to copy, or drag and drop.
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    ) : (
                      <div className="flex cursor-pointer flex-col items-center justify-evenly rounded-md border bg-muted p-1 text-center">
                        <span>Click below to revise your script.</span>
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
                          Revise Script
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
    </div>
  );
}
