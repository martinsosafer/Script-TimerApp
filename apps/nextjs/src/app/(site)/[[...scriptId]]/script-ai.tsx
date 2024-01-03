"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CopyIcon } from "@radix-ui/react-icons";
import { useCompletion } from "ai/react";

import { Badge } from "@voiceai/ui/@/components/ui/badge";
import { Button } from "@voiceai/ui/@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@voiceai/ui/@/components/ui/hover-card";
import { IconCheck, Icons } from "@voiceai/ui/@/components/ui/icons";
import { Label } from "@voiceai/ui/@/components/ui/label";
import { ScrollArea } from "@voiceai/ui/@/components/ui/scroll-area";
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

import { api } from "~/utils/api";
import { useDragAndDrop } from "~/utils/helpers";
import { ModelSelector } from "../components/model-selector";
import { SaveScript } from "../components/save-script";
import { ScriptSelector } from "../components/script-selector";
import { Share } from "../components/share";
import { SimilaritySelector } from "../components/similarity-selector";
import { StabilitySelector } from "../components/stability-selector";
import { ToggleAudio } from "../components/toggle-audio";
import { ToggleLibrary } from "../components/toggle-voice-library";
import { VoiceLibrary } from "../components/voice-library";
import { models, types } from "../data/models";

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

  return (
    <div className=" h-full flex-col md:flex">
      <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <h2 className="mr-2 text-lg font-semibold">Text2Speech</h2>
        <div className="ml-auto flex w-full space-x-2 sm:justify-end">
          <ScriptSelector />
          <SaveScript script={script} />

          <div className="flex">
            {/* <CodeViewer /> */}
            <Share />
          </div>
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
        <div className="container h-full py-6">
          <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
            <div className="hidden flex-col space-y-4 sm:flex md:order-2">
              <div className="grid gap-2">
                <HoverCard openDelay={200}>
                  <HoverCardTrigger asChild>
                    <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Grammar & Spell Check
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-[320px] text-sm" side="left">
                    Choose the interface that best suits your task. You can
                    provide: a simple prompt to complete, starting and ending
                    text to insert a completion within, or some text with
                    instructions to edit it.
                  </HoverCardContent>
                </HoverCard>
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="complete">
                    <span className="sr-only">Complete</span>
                    <Icons.complete className="h-5 w-5" />
                  </TabsTrigger>
                  <TabsTrigger value="insert">
                    <span className="sr-only">Insert</span>
                    <Icons.insert className="h-5 w-5" />
                  </TabsTrigger>
                </TabsList>
              </div>
              {/* <ModelSelector
                types={types}
                models={models}
                onModelSelect={setSelectedModel}
              /> */}
              <div className="py-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="similarity">Choose Your Voice Actor</Label>
                </div>
                <ScrollArea className="h-[300px] px-1">
                  <div className="space-y-1 p-2">
                    <VoiceLibrary onModelSelect={setSelectedModel} />
                  </div>
                </ScrollArea>
              </div>
              <SimilaritySelector
                value={similarity}
                onValueChange={setSimilarity}
              />
              {/* <MaxLengthSelector defaultValue={[256]} /> */}
              <StabilitySelector
                value={stability}
                onValueChange={setStability}
              />
              <Button
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
            <div className="md:order-1">
              <TabsContent value="complete" className="mt-0 border-0 p-0">
                <Badge>Your script is {script.length} characters long.</Badge>

                <div className="flex h-full flex-col space-y-4">
                  <Textarea
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    placeholder={`Write your script here, choose your voice model from the right dropdown and generate to hear your voice. Like your script? Save it by clicking the "Save" button on the top right. Listen and download after generating by toggling the voice player using the upmost top-right button.`}
                    className="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]"
                  />
                </div>
              </TabsContent>
              <TabsContent value="insert" className="mt-0 border-0 p-0">
                <div className="flex flex-col space-y-4">
                  <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
                    <Textarea
                      value={script}
                      onChange={(e) => setScript(e.target.value)}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      placeholder="Your script here..."
                      className="h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px]"
                    />

                    {revisedScript.length > 0 ? (
                      <div className="relative">
                        <Textarea
                          value={revisedScript}
                          onChange={(e) => setRevisedScript(e.target.value)}
                          draggable="true"
                          onDragStart={handleDragStart}
                          className="h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px]"
                        />
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
                    ) : (
                      <div className="flex cursor-pointer flex-col items-center justify-evenly rounded-md border bg-muted p-1 text-center">
                        <span>Click below to revise your script.</span>
                        <Button
                          className="border-2 border-dashed"
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
