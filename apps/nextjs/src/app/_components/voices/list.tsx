"use client";

import { useRef, useState } from "react";
import CogSix6Icon from "@heroicons/react/24/outline/Cog6ToothIcon";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import { useDebounce } from "use-debounce";

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
  CardFooter,
  CardHeader,
} from "@voiceai/ui/@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@voiceai/ui/@/components/ui/dropdown-menu";
import { Input } from "@voiceai/ui/@/components/ui/input";
import { Label } from "@voiceai/ui/@/components/ui/label";
import { Slider } from "@voiceai/ui/@/components/ui/slider";
import { cn } from "@voiceai/ui/@/lib/utils";

import { usePlayer } from "~/app/providers/player-context";
import { api } from "~/utils/api";
import { useIsTruncated } from "../../hooks/useIsTruncated";

// @ts-expect-error type this later
function VoiceListItem({ voice, onClick }) {
  const textRef = useRef(null);
  const isTruncated = useIsTruncated(textRef);
  const { state } = usePlayer();

  const { currentVoice } = state;

  return (
    <Card
      className={cn(
        "flex min-w-full",
        currentVoice?.id === voice.id ? "ring ring-blue-500" : "",
      )}
      onClick={onClick}
    >
      <CardContent className="flex w-full flex-col items-center space-x-1 py-4 md:justify-start lg:flex-row xl:space-x-4">
        <Avatar className="mb-1 hidden self-center lg:mb-0 lg:block">
          <AvatarImage src="/avatars/01.png" className="max-w-full" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Ensuring that the div can shrink */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p
                  ref={textRef}
                  className="truncate text-xs font-medium leading-none md:text-sm"
                >
                  {voice.name}
                </p>
              </TooltipTrigger>
              {isTruncated && (
                <TooltipContent side="top">{voice.name}</TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
}

export function VoiceList() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 1000);

  const [voices] = api.voice.list.useSuspenseQuery({ name: debouncedSearch });

  const { dispatch, state } = usePlayer();
  const { stability, similarity } = state;

  const [currentPage, setCurrentPage] = useState(1);
  const voicesPerPage = 8;

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

  const handleStabilityChange = (stability: number[]) => {
    dispatch({ type: "SET_STABILITY", payload: stability?.[0] ?? 0.5 });
  };
  const handleSimilarityChange = (similarity: number[]) => {
    dispatch({ type: "SET_SIMILARITY", payload: similarity?.[0] ?? 0.8 });
  };

  return (
    <Card className="mt-2 flex min-h-full flex-col bg-white text-black">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex w-full items-center justify-evenly space-x-2 self-center lg:space-x-1">
          <div className="relative flex items-center">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Search"
              className="bg-gray-100 pl-8 text-black md:w-[100px] lg:w-[300px]"
            />
            <MagnifyingGlassIcon className="absolute left-2 h-5 w-5 text-muted-foreground" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="relative bg-gray-100 hover:bg-gray-300">
                <CogSix6Icon className="h-7 w-7 fill-zinc-400 stroke-gray-100" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56"
              align="end"
              forceMount
              side="bottom"
            >
              <div className="grid gap-2 pt-2">
                <DropdownMenuLabel className="font-normal">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="top-p">Stability</Label>
                      <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                        {stability}
                      </span>
                    </div>
                    <Slider
                      id="top-p"
                      max={1}
                      defaultValue={[stability]}
                      step={0.1}
                      onValueChange={handleStabilityChange}
                      className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                      aria-label="Top P"
                    />
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuLabel className="font-normal">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="top-p">Similarity Boost</Label>
                      <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                        {similarity}
                      </span>
                    </div>
                    <Slider
                      id="top-p"
                      max={1}
                      defaultValue={[similarity]}
                      step={0.1}
                      onValueChange={handleSimilarityChange}
                      className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                      aria-label="Top P"
                    />
                  </div>
                </DropdownMenuLabel>
              </div>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="min-h-fit flex-grow">
        <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2">
          {currentVoices.map((voice) => (
            <VoiceListItem
              key={voice.id}
              voice={voice}
              onClick={() => handleVoiceClick(voice)}
            />
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mx-auto flex min-h-fit w-full justify-evenly">
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            variant="ghost"
            key={i}
            onClick={() => paginate(i + 1)}
            className={`h-10 w-10 rounded-sm shadow-none ${
              currentPage === i + 1 ? "bg-blue-700 text-white" : "bg-gray-300"
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
