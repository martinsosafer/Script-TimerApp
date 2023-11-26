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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@voiceai/ui/@/components/ui/dropdown-menu";
import { Input } from "@voiceai/ui/@/components/ui/input";
import { Label } from "@voiceai/ui/@/components/ui/label";
import { Slider } from "@voiceai/ui/@/components/ui/slider";

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
  // const [stability, setStability] = useState([0.5]);
  const [similarityBoost, setSimilarityBoost] = useState([0.8]);

  const { dispatch, state } = usePlayer();
  const { currentVoice, speech, stability, similarity } = state;

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

  const handleStabilityChange = (stability: number[]) => {
    dispatch({ type: "SET_STABILITY", payload: stability?.[0] ?? 0.5 });
  };
  const handleSimilarityChange = (similarity: number[]) => {
    dispatch({ type: "SET_SIMILARITY", payload: similarity?.[0] ?? 0.8 });
  };

  return (
    <Card className="flex min-h-full flex-col bg-white text-black">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="ml-auto flex items-center space-x-4">
          <Input
            type="search"
            placeholder="Search..."
            className="md:w-[100px] lg:w-[300px]"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
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
              {/* <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>New Team</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
