"use client";

import * as React from "react";

import { Button } from "@voiceai/ui/@/components/ui/button";
import { PlayIcon } from "@voiceai/ui/@/icons/icons";

import { api } from "~/utils/api";

export function VoiceLibrary() {
  const { data: voices } = api.voice.list.useQuery({ name: "" });

  const [audio, setAudio] = React.useState(new Audio());

  const playAudio = (audioSrc: string) => {
    audio.src = audioSrc;
    audio.play();
  };

  return (
    <div className="space-y-8">
      {voices?.map((voice, i) => (
        <Button
          key={`${voice.id}`}
          variant="ghost"
          type="button"
          className="w-full justify-start font-normal"
          onClick={() =>
            // @ts-expect-error jsonb types are hard
            playAudio((voice?.metadata?.preview_url as string) ?? "")
          }
        >
          <PlayIcon className="mr-2 h-4 w-4" />
          {/* @ts-expect-error jsonb types are hard */}
          {voice.name} ({voice?.metadata?.labels?.gender ?? "unknown"})
        </Button>
      ))}
    </div>
  );
}
