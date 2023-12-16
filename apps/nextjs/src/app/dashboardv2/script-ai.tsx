"use client";

import * as React from "react";
import Link from "next/link";
// import { PlusCircledIcon } from "@voiceai/ui/rea"
import { useCompletion } from "ai/react";

import { Button } from "@voiceai/ui/@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@voiceai/ui/@/components/ui/hover-card";
import { Icons } from "@voiceai/ui/@/components/ui/icons";
import { Separator } from "@voiceai/ui/@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@voiceai/ui/@/components/ui/tabs";
import { Textarea } from "@voiceai/ui/@/components/ui/textarea";
import { toast, ToastAction } from "@voiceai/ui/@/components/ui/toast";

import { api } from "~/utils/api";
import { ModelSelector } from "./components/model-selector";
import { PresetActions } from "./components/preset-actions";
import { SimilaritySelector } from "./components/similarity-selector";
import { StabilitySelector } from "./components/stability-selector";
import { ToggleAudio } from "./components/toggle-audio";
import { models, types } from "./data/models";

export function ScriptAI({}) {
  const [selectedModel, setSelectedModel] = React.useState(null);
  const [script, setScript] = React.useState("");
  const [audio, setAudio] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [similarity, setSimilarity] = React.useState([0.8]);
  const [stability, setStability] = React.useState([0.5]);

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

  console.log("SELECTED MODEL", selectedModel);
  console.log("stabiblity, similarity", stability, similarity);
  const { mutateAsync: generateVoice, error } = api.voice.create.useMutation({
    onSuccess(data) {
      const dataURI = `data:audio/mpeg;base64,${data?.audio}`;
      setAudio(dataURI);
      setOpen(true);
      setLoading(false);
    },
    onError(error) {
      setLoading(false);
      console.log("IN ERROR", error?.data?.code);
      if (error?.data?.code === "FORBIDDEN") {
        toast({
          title: "Upgrade your plan",
          description: "The base plan only supports up to 250 characters",
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
  return (
    <div className=" h-full flex-col md:flex">
      <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <h2 className="text-lg font-semibold">Script</h2>
        <div className="ml-auto flex w-full space-x-2 sm:justify-end">
          {/* <PresetSelector presets={presets} /> */}
          {/* <PresetSave />  */}
          <div className="hidden space-x-2 md:flex">
            {/* <CodeViewer /> */}
            <ToggleAudio audio={audio} open={open} />
          </div>
          <PresetActions />
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
                      Mode
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="h-5 w-5"
                    >
                      <rect
                        x="4"
                        y="3"
                        width="12"
                        height="2"
                        rx="1"
                        fill="currentColor"
                      ></rect>
                      <rect
                        x="4"
                        y="7"
                        width="12"
                        height="2"
                        rx="1"
                        fill="currentColor"
                      ></rect>
                      <rect
                        x="4"
                        y="11"
                        width="3"
                        height="2"
                        rx="1"
                        fill="currentColor"
                      ></rect>
                      <rect
                        x="4"
                        y="15"
                        width="3"
                        height="2"
                        rx="1"
                        fill="currentColor"
                      ></rect>
                      <rect
                        x="8.5"
                        y="11"
                        width="3"
                        height="2"
                        rx="1"
                        fill="currentColor"
                      ></rect>
                      <rect
                        x="8.5"
                        y="15"
                        width="3"
                        height="2"
                        rx="1"
                        fill="currentColor"
                      ></rect>
                      <rect
                        x="13"
                        y="11"
                        width="3"
                        height="2"
                        rx="1"
                        fill="currentColor"
                      ></rect>
                    </svg>
                  </TabsTrigger>
                  <TabsTrigger value="insert">
                    <span className="sr-only">Insert</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.491 7.769a.888.888 0 0 1 .287.648.888.888 0 0 1-.287.648l-3.916 3.667a1.013 1.013 0 0 1-.692.268c-.26 0-.509-.097-.692-.268L5.275 9.065A.886.886 0 0 1 5 8.42a.889.889 0 0 1 .287-.64c.181-.17.427-.267.683-.269.257-.002.504.09.69.258L8.903 9.87V3.917c0-.243.103-.477.287-.649.183-.171.432-.268.692-.268.26 0 .509.097.692.268a.888.888 0 0 1 .287.649V9.87l2.245-2.102c.183-.172.432-.269.692-.269.26 0 .508.097.692.269Z"
                        fill="currentColor"
                      ></path>
                      <rect
                        x="4"
                        y="15"
                        width="3"
                        height="2"
                        rx="1"
                        fill="currentColor"
                      ></rect>
                      <rect
                        x="8.5"
                        y="15"
                        width="3"
                        height="2"
                        rx="1"
                        fill="currentColor"
                      ></rect>
                      <rect
                        x="13"
                        y="15"
                        width="3"
                        height="2"
                        rx="1"
                        fill="currentColor"
                      ></rect>
                    </svg>
                  </TabsTrigger>
                </TabsList>
              </div>
              <ModelSelector
                types={types}
                models={models}
                onModelSelect={setSelectedModel}
              />
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
                    console.log("calling", {
                      // @ts-expect-error need to type this in the state
                      voice_id: selectedModel?.id,
                      message: script,
                      stability: stability,
                      similarity: similarity,
                    });
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
                  "Generate"
                )}
              </Button>
            </div>
            <div className="md:order-1">
              <TabsContent value="complete" className="mt-0 border-0 p-0">
                <div className="flex h-full flex-col space-y-4">
                  <Textarea
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    placeholder="Write your script here. Then on the right choose a voice model, and click generate. This is a protopye frontend for feedback, I haven't hooked up all the api calls yet. But I think an UI like this may look more professional and helps us have more features in a more extensible way. The top nav has a lot of menu options, I added examples but we can add functionality there as quick action items for people to do with their work. switching the mode activates the grammar/spell checker that can revise your script. I can add colors and logos to the site but wanted to get usability feedback before i go too deep into making it live"
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
                      placeholder="Your script would go here"
                      className="h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px]"
                    />

                    {revisedScript.length > 0 ? (
                      <Textarea
                        value={revisedScript}
                        onClick={() => {}}
                        placeholder="Your revised script"
                        className="h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px]"
                      />
                    ) : (
                      <div className="cursor-pointer rounded-md border bg-muted text-center">
                        <span className="">
                          Your AI Coach would revise your script here
                        </span>
                        <Button
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
    </div>
  );
}
