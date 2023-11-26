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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@voiceai/ui/@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@voiceai/ui/@/components/ui/card";

import { usePlayer } from "~/app/providers/player-context";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";
import { useIsTruncated } from "../../hooks/useIsTruncated";

// @ts-expect-error type this later
function VoiceListItem({ voice, onClick }) {
  const textRef = useRef(null);
  const isTruncated = useIsTruncated(textRef);

  return (
    <Card className="flex w-full" onClick={onClick}>
      <CardContent className="flex w-full items-center space-x-4 p-4">
        <Avatar>
          <AvatarImage src="/avatars/01.png" className="max-w-full" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="flex flex-grow flex-col">
          <p className="overflow-hidden whitespace-nowrap text-sm font-medium leading-none">
            {voice.name}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function VoiceList() {
  const [voices] = api.voice.list.useSuspenseQuery();

  const { dispatch } = usePlayer();
  const [currentPage, setCurrentPage] = useState(1);
  const voicesPerPage = 4;

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
    dispatch({ type: "SET_CURRENT_VOICE", payload: voice });
  };

  return (
    <Card className="flex min-h-full flex-col bg-white text-black">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        {/* <CardTitle className="text-sm font-medium">Total Revenue</CardTitle> */}
        {/* Additional content for the header */}
      </CardHeader>
      <CardContent className="min-h-fit flex-grow">
        <TooltipProvider>
          <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2">
            {currentVoices.map((voice) => (
              <VoiceListItem
                key={voice.id}
                voice={voice}
                onClick={() => handleVoiceClick(voice)}
              />
            ))}
          </ul>
        </TooltipProvider>
      </CardContent>
      <CardFooter className="mx-auto min-h-fit">
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
      </CardFooter>
    </Card>
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
