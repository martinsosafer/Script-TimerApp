"use client";

import { useEffect, useRef } from "react";
import ArrowDownOnSquareIcon from "@heroicons/react/24/outline/ArrowDownOnSquareIcon";
import PlayIcon from "@heroicons/react/24/outline/PlayIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";

import { usePlayer } from "../providers/player-context";

interface PlayerContentProps {}

const PlayerContent: React.FC<PlayerContentProps> = () => {
  const { state } = usePlayer();
  const { audio } = state;

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audio && audio.length > 0) {
      audioRef.current!.src = audio!;
      audioRef.current!.play();
    }
  }, [audio]);

  const handleDownload = () => {
    console.log("CALLED");
    // const blob = new Blob([audio], { type: "audio/mpeg" });

    // Create a temporary URL for the Blob and trigger a download
    // const url = URL.createObjectURL(blob);
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
          <UserIcon className="h-5 w-5 flex-none rounded-full text-gray-400 md:h-8 md:w-8" />
          {/* {voice.name} */}
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
