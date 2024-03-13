"use client";

import * as React from "react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@voiceai/ui/@/components/ui/avatar";
import { Button } from "@voiceai/ui/@/components/ui/button";
import { IconStop } from "@voiceai/ui/@/components/ui/icons";
import { CheckIcon, PlayIcon } from "@voiceai/ui/@/icons/icons";
import { cn } from "@voiceai/ui/@/lib/utils";

import { api } from "~/utils/api";

interface ModelSelectorProps {
  onModelSelect: React.Dispatch<React.SetStateAction<null>>;
}

export function VoiceLibrary({ onModelSelect, ...props }: ModelSelectorProps) {
  const { data: voices } = api.voice.list.useQuery({ name: "" });

  const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState<Record<string, boolean>>({});
  const [selectedVoiceId, setSelectedVoiceId] = React.useState<string | null>(
    null,
  );

  React.useEffect(() => {
    setAudio(new Audio()); // only call client
  }, []);

  const playAudio = (audioSrc: string, voiceId: string) => {
    if (!audio) return;
    audio.src = audioSrc;
    audio.play();
    setIsPlaying((prevState) => ({ ...prevState, [voiceId]: true }));
    audio.addEventListener("ended", () => {
      setIsPlaying((prevState) => ({ ...prevState, [voiceId]: false }));
    });
  };
  const stopAudio = (voiceId: string) => {
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying((prevState) => ({ ...prevState, [voiceId]: false }));
  };

  return (
    <div className="space-y-8">
      {/* {voices?.map((voice, i) => (
        <>
        <Button
          key={`${voice.id}`}
          variant="ghost"
          type="button"
          className="w-full justify-start font-normal"
          onClick={() =>
            playAudio((voice?.metadata?.preview_url as string) ?? "")
          }
        >
          <PlayIcon className="mr-2 h-4 w-4" />
          {voice.name} ({voice?.metadata?.labels?.gender ?? "unknown"})
        </Button>
        </>
      ))} */}

      <div className="space-y-4">
        <div className="grid gap-6">
          {voices?.map((voice, i) => (
            <span
              key={`${voice.id}`}
              className={cn(
                "flex items-center justify-between space-x-4 p-2",
                voice.id === selectedVoiceId
                  ? "rounded-md border-2 border-primary"
                  : "",
              )}
              onClick={() => {
                setSelectedVoiceId(voice.id);
                // @ts-expect-error dunno why its not typing
                onModelSelect(voice);
              }}
            >
              <div className="flex items-center space-x-6">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={
                      voice?.picture
                        ? `${voice?.picture}?&w=128&h=128&dpr=2&q=80`
                        : undefined
                    }
                    alt="Image"
                    className="h-full w-full object-cover"
                  />
                  <AvatarFallback>ST</AvatarFallback>
                </Avatar>
                <div>
                  <p className=" mb-2 text-sm font-medium leading-none">
                    {voice?.name}
                  </p>{" "}
                  <p className="mb-2 text-sm font-medium leading-none">
                    {/* @ts-expect-error jsonb types are hard */}(
                    {voice?.metadata?.labels?.gender ?? "unknown"})
                  </p>
                  <Button
                    size="xs"
                    type="button"
                    onClick={() => {
                      if (isPlaying[voice.id]) {
                        stopAudio(voice.id);
                      } else {
                        playAudio(
                          (voice?.metadata?.preview_url as string) ?? "",
                          voice.id,
                        );
                      }
                    }}
                  >
                    {isPlaying[voice.id] ? (
                      <IconStop className="h-4 w-4 text-tertiary" />
                    ) : (
                      <PlayIcon className="h-4 w-4" />
                    )}
                    {selectedVoiceId === voice.id && (
                      <CheckIcon className="ml-2 h-4 w-4 text-tertiary" />
                    )}
                  </Button>
                </div>
              </div>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
