"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@voiceai/ui/@/components/ui/avatar";
import { Button } from "@voiceai/ui/@/components/ui/button";

import { api } from "~/utils/api";

export function VoiceLibrary() {
  const { data: voices } = api.voice.list.useQuery({ name: "" });

  console.log("IN VOICES", voices);
  return (
    <div className="space-y-8">
      {voices?.map((voice, i) => (
        <Button
          key={`${voice.id}`}
          variant="ghost"
          className="w-full justify-start font-normal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4"
          >
            <path d="M21 15V6" />
            <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
            <path d="M12 12H3" />
            <path d="M16 6H3" />
            <path d="M12 18H3" />
          </svg>
          {voice.name} (Would preview when clicked)
        </Button>
        // <div
        //   className="inline-flex w-full  items-center justify-stretch  font-normal"
        //   key={voice.id}
        // >
        //   <Avatar className="h-9 w-9">
        //     <AvatarImage src={voice.picture ?? undefined} alt="Avatar" />
        //     <AvatarFallback>ST</AvatarFallback>
        //   </Avatar>
        //   <div className="ml-4 space-y-1">
        //     <p className="text-sm font-medium leading-none">{voice.name}</p>

        //     <p className="text-sm text-muted-foreground">
        //       {/* @ts-expect-error need to type jsonb */}
        //       {voice.metadata?.labels?.description}
        //     </p>
        //   </div>

        // </div>
      ))}
    </div>
  );
}
