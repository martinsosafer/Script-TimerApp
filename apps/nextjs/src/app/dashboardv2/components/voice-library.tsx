"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@voiceai/ui/@/components/ui/avatar";

import { api } from "~/utils/api";

export function VoiceLibrary() {
  const { data: voices } = api.voice.list.useQuery({ name: "" });

  console.log("IN VOICES", voices);
  return (
    <div className="space-y-8">
      {voices?.map((voice, i) => (
        <div
          className="inline-flex w-full  items-center justify-stretch  font-normal"
          key={voice.id}
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={voice.picture ?? undefined} alt="Avatar" />
            <AvatarFallback>ST</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{voice.name}</p>

            <p className="text-sm text-muted-foreground">
              {/* @ts-expect-error need to type jsonb */}
              {voice.metadata?.labels?.description}
            </p>
          </div>
          {/* <div>
            <audio
              src={voice?.metadata?.preview_url}
              controls
              className="max-w-[5rem]"
            />
          </div> */}
        </div>
      ))}
    </div>
  );
}
