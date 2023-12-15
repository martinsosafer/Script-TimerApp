import type { Metadata } from "next";
import Image from "next/image";

// import { PlusCircledIcon } from "@voiceai/ui/rea"

import { Button } from "@voiceai/ui/@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@voiceai/ui/@/components/ui/hover-card";
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

import { AlbumArtwork } from "./components/album-artwork";
// import { CodeViewer } from "./components/code-viewer"
// import { MaxLengthSelector } from "./components/maxlength-selector"
import { ModelSelector } from "./components/model-selector";
import { PodcastEmptyPlaceholder } from "./components/podcast-empty-placeholder";
// import { PresetActions } from "./components/preset-actions"
// import { PresetSave } from "./components/preset-save"
import { PresetSelector } from "./components/preset-selector";
// import { PresetShare } from "./components/preset-share"
import { TemperatureSelector } from "./components/similarity-selector";
import { TopPSelector } from "./components/stability-selector";
import { listenNowAlbums, madeForYouAlbums } from "./data/albums";
import { models, types } from "./data/models";
import { presets } from "./data/presets";

export const metadata: Metadata = {
  title: "Music App",
  description: "Example music app using the components.",
};

export default function MusicPage() {
  return (
    <>
      <div className=" h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">Script</h2>
          <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            {/* <PresetSelector presets={presets} /> */}
            {/* <PresetSave />  */}
            <div className="hidden space-x-2 md:flex">
              {/* <CodeViewer />
              <PresetShare /> */}
            </div>
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
                <ModelSelector types={types} models={models} />
                <TemperatureSelector defaultValue={[0.56]} />
                {/* <MaxLengthSelector defaultValue={[256]} /> */}
                <TopPSelector defaultValue={[0.9]} />
                <Button>Generate</Button>
              </div>
              <div className="md:order-1">
                <TabsContent value="complete" className="mt-0 border-0 p-0">
                  <div className="flex h-full flex-col space-y-4">
                    <Textarea
                      placeholder="Write your script here. Then on the right choose a voice model, and click generate. This is a protopye frontend for feedback, I haven't hooked up all the api calls yet. But I think an UI like this may look more professional and helps us have more features in a more extensible way. The top nav has a lot of menu options, I added examples but we can add functionality there as quick action items for people to do with their work. switching the mode activates the grammar/spell checker that can revise your script. I can add colors and logos to the site but wanted to get usability feedback before i go too deep into making it live"
                      className="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="insert" className="mt-0 border-0 p-0">
                  <div className="flex flex-col space-y-4">
                    <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
                      <Textarea
                        placeholder="Your script would go here"
                        className="h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px]"
                      />
                      <div className="rounded-md border bg-muted">
                        Your AI Coach would revise your script here
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </>
  );
}
