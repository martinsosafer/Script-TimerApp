"use client";

import { useEffect, useRef } from "react";
import ArrowDownOnSquareIcon from "@heroicons/react/24/outline/ArrowDownOnSquareIcon";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@voiceai/ui/@/components/ui/avatar";

import { generateRandomString } from "~/utils/helpers";
import { usePlayer } from "../providers/player-context";

interface PlayerContentProps {}

const PlayerContent: React.FC<PlayerContentProps> = () => {
  const { state } = usePlayer();
  const { audio, currentVoice } = state;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const getInitials = (name: string): string =>
    name ? name.substring(0, 2).toUpperCase() : "IV";

  const createAvatarUrl = (): string => {
    const randomString: string = generateRandomString();
    const initials: string = getInitials(currentVoice?.name ?? "IV");
    return `https://avatar.vercel.sh/${randomString}?text=${initials}`;
  };
  const avatarUrl: string = createAvatarUrl();
  useEffect(() => {
    if (audio && audio.length > 0) {
      audioRef.current!.src = audio!;
      audioRef.current!.play();
    }
  }, [audio]);

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = audio ?? "";
    a.download = "voice.mp3";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div
      className="
      fixed 
      bottom-0 
      w-full 
      bg-zinc-100 
      px-4 py-2 
      sm:px-6
    "
    >
      <div className="grid w-full grid-cols-3 place-content-between content-center rounded-2xl bg-white p-3 shadow-md shadow-gray-900 md:p-4">
        <div className="flex items-center justify-center rounded-md border border-gray-100 px-2 py-1 md:w-1/4 md:justify-start">
          <div className="mx-2 inline-flex items-center whitespace-nowrap rounded-md bg-blue-700 px-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-5">
            <Avatar className="py-2">
              <AvatarImage src={avatarUrl} className="rounded-full" />
              <AvatarFallback className="border border-stone-500 bg-blue-700 text-white">
                IV
              </AvatarFallback>
            </Avatar>
            <div className="mx-4 max-w-xs">
              <p className="truncate text-sm font-medium leading-none">
                {currentVoice?.name}
              </p>
            </div>
          </div>
        </div>

        {/* Playback Control */}
        <div
          className="
          flex
          h-full w-full
          flex-col
          items-center
          gap-x-2
          gap-y-2
          md:flex-row md:gap-y-0
        "
        >
          {/* <button>
            <PlayIcon
              width={30}
              className="cursor-pointer fill-gray-700 hover:text-gray-300"
            />
          </button> */}
          <audio ref={audioRef} controls />
          {/* <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-blue-500"
              style={{ width: "50%" }}
            ></div>
          </div> */}
        </div>

        {/* Action Icons */}
        <div className="flex items-center justify-center gap-x-2 md:justify-end">
          <button type="button" onClick={handleDownload}>
            <ArrowDownOnSquareIcon width={30} className="stroke-black" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
