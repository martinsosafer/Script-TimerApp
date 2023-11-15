"use client";

import { useState } from "react";

import { Button } from "@voiceai/ui";

import { usePlayer } from "~/app/providers/player-context";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

export function VoiceList() {
  const [voices] = api.voice.all.useSuspenseQuery();
  const { dispatch } = usePlayer();

  if (voices.length === 0) {
    return (
      <div className="relative flex w-full flex-col gap-4">
        <PostCardSkeleton pulse={false} />
        <PostCardSkeleton pulse={false} />
        <PostCardSkeleton pulse={false} />

        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10">
          <p className="text-2xl font-bold text-white">No voices yet</p>
        </div>
      </div>
    );
  }
  const handleVoiceClick = (voiceId: string) => {
    // Set the current song in the global state
    console.log("setting state", voiceId);
    dispatch({ type: "SET_CURRENT_VOICE", payload: voiceId });
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {/* <ul className="divide-y divide-white/5"> */}
      <ul role="list" className="divide-y divide-gray-100">
        {voices.map((voice) => (
          <li
            key={voice.voice_id}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <div className="flex min-w-0 gap-x-4">
              {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" /> */}
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6">
                  {/* @ts-expect-error will type this later */}
                  {voice.name}
                </p>
                <p className="mt-1 truncate text-xs leading-5">
                  {/* @ts-expect-error will type this later */}
                  {voice.labels.accent}
                </p>
              </div>
            </div>
            <Button onClick={() => handleVoiceClick(voice.voice_id)}>
              Generate
            </Button>
          </li>
        ))}
      </ul>
      <Button
      // className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
      >
        View all
      </Button>

      {/* </ul> */}
    </div>
  );
}

export function PostCardSkeleton(props: { pulse?: boolean }) {
  const { pulse = true } = props;
  return (
    <div className="flex flex-row rounded-lg bg-white/10 p-4 transition-all hover:scale-[101%]">
      <div className="flex-grow">
        <h2
          className={`w-1/4 rounded bg-pink-400 text-2xl font-bold ${
            pulse && "animate-pulse"
          }`}
        >
          &nbsp;
        </h2>
        <p
          className={`mt-2 w-1/3 rounded bg-current text-sm ${
            pulse && "animate-pulse"
          }`}
        >
          &nbsp;
        </p>
      </div>
    </div>
  );
}
