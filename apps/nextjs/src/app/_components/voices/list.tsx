"use client";

import { useState } from "react";
import PlayCircleIcon from "@heroicons/react/24/outline/PlayCircleIcon";
import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";

import { Button } from "@voiceai/ui";

import { usePlayer } from "~/app/providers/player-context";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

export function VoiceList() {
  const [voices] = api.voice.all.useSuspenseQuery();
  const { dispatch } = usePlayer();
  const [currentPage, setCurrentPage] = useState(1);
  const voicesPerPage = 10;

  const indexOfLastVoice = currentPage * voicesPerPage;
  const indexOfFirstVoice = indexOfLastVoice - voicesPerPage;
  const currentVoices = voices.slice(indexOfFirstVoice, indexOfLastVoice);

  // Pagination logic
  const totalPages = Math.ceil(voices.length / voicesPerPage);

  // Function to change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
    <div className="flex h-full w-full flex-col justify-between gap-4">
      {/* Voices grid */}
      <ul className="grid grid-cols-2 gap-4">
        {currentVoices.map((voice) => (
          <li
            key={voice.voice_id}
            className="flex flex-col justify-center rounded-lg border p-4"
          >
            <div className="flex items-center justify-between">
              <UserCircleIcon className="h-10 w-10 flex-none rounded-full text-gray-400" />
              <p className="flex-grow text-center text-sm font-semibold text-black">
                {/* @ts-expect-error will type this later */}
                {voice.name}
              </p>
              <button
                onClick={() => handleVoiceClick(voice.voice_id)}
                className="rounded-full border border-transparent bg-transparent p-2 text-black shadow-sm hover:bg-gray-200"
              >
                <PlayCircleIcon className="h-8 w-8" />
              </button>
            </div>
            <div className="mt-2 text-center text-sm text-gray-500">
              {/* @ts-expect-error will type this later */}
              <p> {voice.gender && voice.gender}</p>
              {/* @ts-expect-error will type this later */}
              <p> {voice.labels.accent && voice.labels.accent}</p>
            </div>
          </li>
        ))}
      </ul>
      {/* Pagination */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            variant="ghost"
            key={i}
            onClick={() => paginate(i + 1)}
            className={`h-10 w-10 rounded-sm shadow-none ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            {i + 1}
          </Button>
        ))}
      </div>
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
