"use client";

import * as React from "react";

import { ScrollArea, ScrollBar } from "@voiceai/ui/@/components/ui/scroll-area";
import { Separator } from "@voiceai/ui/@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@voiceai/ui/@/components/ui/tabs";

import { api } from "~/utils/api";
import { CustomVoiceEmptyPlaceholder } from "../components/custom-voice-empty-placeholder";
import { VoiceArtwork } from "../components/voice-artwork";

export function Library() {
  const { data: voices = [] } = api.voice.list.useQuery({ name: "" });

  const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    setAudio(new Audio()); // only call client
  }, []);

  const playAudio = (audioSrc: string) => {
    if (!audio) return;
    audio.src = audioSrc;
    audio.play();
  };
  return (
    <>
      <div className="col-span-3 lg:col-span-4 lg:border-l">
        <div className="h-full px-4 py-6 lg:px-8">
          <Tabs defaultValue="voices" className="h-full space-y-6">
            <div className="space-between flex items-center">
              <TabsList>
                <TabsTrigger value="voices" className="relative">
                  Voices
                </TabsTrigger>
                <TabsTrigger value="generate">Generate</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent
              value="voices"
              className="border-none p-0 outline-none"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Listen Now
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Top voices for you. Updated regularly. Click to preview!
                  </p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="mt-6 space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">Male</h2>
                <p className="text-sm text-muted-foreground">
                  Voices with a masculine tone.
                </p>
              </div>
              <div className="relative">
                <ScrollArea>
                  <div className="flex space-x-4 pb-4">
                    {voices.map(
                      (voice) =>
                        voice?.gender === "MALE" && (
                          <VoiceArtwork
                            onClick={() =>
                              playAudio(
                                // @ts-expect-error jsonb types are hard
                                (voice?.metadata?.preview_url as string) ?? "",
                              )
                            }
                            key={voice.name}
                            voice={voice}
                            className="w-[250px] cursor-pointer"
                            aspectRatio="portrait"
                            width={250}
                            height={330}
                          />
                        ),
                    )}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
              <div className="mt-6 space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Female
                </h2>
                <p className="text-sm text-muted-foreground">
                  Voices with a feminine tone.
                </p>
              </div>
              <Separator className="my-4" />
              <div className="relative">
                {/* <ScrollArea>
                  <div className="flex space-x-4 pb-4">
                    {voices.map((voice) => (
                      <VoiceArtwork
                        key={voice.name}
                        voice={voice}
                        className="w-[150px]"
                        aspectRatio="square"
                        width={150}
                        height={150}
                      />
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea> */}
                <ScrollArea>
                  <div className="flex space-x-4 pb-4">
                    {voices.map(
                      (voice) =>
                        voice?.gender === "FEMALE" && (
                          <VoiceArtwork
                            onClick={() =>
                              playAudio(
                                // @ts-expect-error jsonb types are hard
                                (voice?.metadata?.preview_url as string) ?? "",
                              )
                            }
                            key={voice.name}
                            voice={voice}
                            className="w-[250px] cursor-pointer"
                            aspectRatio="portrait"
                            width={250}
                            height={330}
                          />
                        ),
                    )}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent
              value="generate"
              className="h-full flex-col border-none p-0 data-[state=active]:flex"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Generate Voice
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Your custom voice, unique to you.
                  </p>
                </div>
              </div>
              <Separator className="my-4" />
              <CustomVoiceEmptyPlaceholder />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
