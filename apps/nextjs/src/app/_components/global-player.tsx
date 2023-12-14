"use client";

import { useEffect, useState } from "react";
import ArrowDownOnSquareIcon from "@heroicons/react/24/outline/ArrowDownOnSquareIcon";

import { CustomAudioPlayer } from "@voiceai/ui";
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
  const [audioString, setAudioString] = useState<string | undefined>(
    audio ?? undefined,
  );
  const getInitials = (name: string): string =>
    name ? name.substring(0, 2).toUpperCase() : "IV";

  const createAvatarUrl = (): string => {
    if (currentVoice?.id) {
      return currentVoice?.picture;
    }
    const randomString: string = generateRandomString();
    const initials: string = getInitials(currentVoice?.name ?? "IV");
    return `https://avatar.vercel.sh/${randomString}?text=${initials}`;
  };
  const avatarUrl: string = createAvatarUrl();

  useEffect(() => {
    // If audio is changed, update the state
    if (audio && audio !== audioString) {
      setAudioString(audio);
    }
  }, [audio, audioString]);

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
        <div className="mx-2 inline-flex h-10 max-w-min items-center self-center whitespace-nowrap rounded-lg bg-blue-700 px-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-5">
          <Avatar className="py-2">
            <AvatarImage src={avatarUrl} className="max-w-min rounded-full" />
            <AvatarFallback className="border border-stone-500 bg-blue-700 text-white hover:bg-blue-700">
              IV
            </AvatarFallback>
          </Avatar>
          <div className="max-w-min">
            <p className="truncate text-sm font-medium leading-none">
              {currentVoice?.name}
            </p>
          </div>
        </div>

        {/* Playback Control */}
        <div
          className="
          flex
          h-full w-full
          flex-col
          items-center
          justify-center
          gap-x-2
          gap-y-2
          md:flex-row md:gap-y-0
        "
        >
          <CustomAudioPlayer src={audioString} />
        </div>

        {/* Action Icons */}
        <div className="flex items-center justify-end gap-x-2">
          <button type="button" onClick={handleDownload}>
            <ArrowDownOnSquareIcon width={30} className="stroke-black" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
