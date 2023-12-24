"use client";

import * as React from "react";

import { ScrollArea, ScrollBar } from "@voiceai/ui/@/components/ui/scroll-area";
import { Separator } from "@voiceai/ui/@/components/ui/separator";

import { api } from "~/utils/api";
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
                    // className="w-[250px] cursor-pointer"
                    // aspectRatio="portrait"
                    // width={250}
                    // height={330}
                    className="w-[150px]"
                    aspectRatio="square"
                    width={150}
                    height={150}
                  />
                ),
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="mt-6 space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Female</h2>
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
                    // className="w-[250px] cursor-pointer"
                    // aspectRatio="portrait"
                    // width={250}
                    // height={330}
                    className="w-[150px]"
                    aspectRatio="square"
                    width={150}
                    height={150}
                  />
                ),
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
}
