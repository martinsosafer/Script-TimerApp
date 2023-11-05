"use client";

import { useState } from "react";

import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

export function VoiceList() {
  const [voices] = api.voice.all.useSuspenseQuery();

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

  return (
    <div className="flex w-full flex-col gap-4">
      <ul className="divide-y divide-white/5">
        {voices.map((voice) => (
          <li key={voice.voice_id} className="py-4">
            <div className="flex items-center gap-x-3">
              {/* <img
                src={voice.user.imageUrl}
                alt=""
                className="h-6 w-6 flex-none rounded-full bg-gray-800"
              /> */}
              <h3 className="flex-auto truncate text-sm font-semibold leading-6 text-white">
                {/* @ts-expect-error will type this later */}
                {voice.name}
              </h3>
              {/* <time
                dateTime={item.dateTime}
                className="flex-none text-xs text-gray-500"
              >
                {item.date}
              </time> */}
            </div>
            <p className="mt-3 truncate text-sm text-gray-500">
              Voice ID: <span className="text-gray-400">{voice.voice_id}</span>{" "}
              <span className="font-mono text-gray-400">
                {/* @ts-expect-error will type this later */}
                Accent: {voice.labels.accent}
              </span>{" "}
              <span className="text-gray-400">
                {/* @ts-expect-error will type this later */}
                Gender: {voice.labels.gender}
              </span>
            </p>
          </li>
        ))}
      </ul>
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
