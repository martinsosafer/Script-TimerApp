"use client";

import { useRef, useState } from "react";
import PlayCircleIcon from "@heroicons/react/24/outline/PlayCircleIcon";

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@voiceai/ui";

import { usePlayer } from "~/app/providers/player-context";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";
import { useIsTruncated } from "../../hooks/useIsTruncated";

// @ts-expect-error type this later
function VoiceListItem({ voice, onClick }) {
  const textRef = useRef(null);
  const isTruncated = useIsTruncated(textRef);

  return (
    <li className="flex min-h-[10px] max-w-xs flex-col items-center justify-center rounded-lg border p-4">
      <div className="w-full text-center">
        {!isTruncated && (
          <p
            ref={textRef}
            className="truncate text-center text-sm font-semibold text-black"
          >
            {voice.name}
          </p>
        )}
        {isTruncated && (
          <Tooltip>
            <TooltipTrigger asChild>
              <p
                ref={textRef}
                className="truncate text-center text-sm font-semibold text-black"
              >
                {voice.name}
              </p>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              align="end"
              className="max-w-xs rounded-md bg-slate-600 px-4 py-2 text-sm text-gray-200 shadow-lg"
            >
              {voice.name}
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="mb-2 flex flex-col justify-evenly text-center text-sm text-gray-500">
        {/* <p> {voice.gender && voice.gender}</p>

        <p> {voice.labels.accent && voice.labels.accent}</p> */}
      </div>
      <Button
        onClick={onClick}
        className="m-0 rounded-full border border-transparent bg-transparent p-0 text-black shadow-sm hover:bg-gray-200"
      >
        <PlayCircleIcon className="h-8 w-8" />
      </Button>
    </li>
  );
}

export function VoiceList() {
  const [voices] = api.voice.list.useSuspenseQuery();
  console.log("IN VOICES", voices);
  const { dispatch } = usePlayer();
  const [currentPage, setCurrentPage] = useState(1);
  const voicesPerPage = 12;

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
  const handleVoiceClick = (voice: any) => {
    console.log("setting state", voice);
    dispatch({ type: "SET_CURRENT_VOICE", payload: voice });
  };

  return (
    <TooltipProvider>
      <div className="flex min-h-full w-full flex-col justify-between gap-4">
        {/* Voices grid */}
        <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {currentVoices.map((voice) => (
            <VoiceListItem
              key={voice.id}
              voice={voice}
              onClick={() => handleVoiceClick(voice)}
            />
          ))}
        </ul>
        {/* Pagination */}
        <div className="mt-8 flex min-h-max items-center justify-center gap-2">
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
    </TooltipProvider>
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
