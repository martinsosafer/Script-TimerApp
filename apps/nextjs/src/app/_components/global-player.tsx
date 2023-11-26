"use client";

import { useEffect, useRef, useState } from "react";
import ArrowDownOnSquareIcon from "@heroicons/react/24/outline/ArrowDownOnSquareIcon";
import PlayIcon from "@heroicons/react/24/outline/PlayIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";

import { api } from "~/utils/api";
import { usePlayer } from "../providers/player-context";

interface PlayerContentProps {
  //   song: Song;
  //   songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = (
  {
    //   song,
    //   songUrl,
  },
) => {
  const { state } = usePlayer();
  const { currentVoice, speech } = state;

  const [currentVoiceIdState, setCurrentVoiceIdState] = useState<string | null>(
    null,
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { mutateAsync: generateVoice, error } = api.voice.create.useMutation({
    async onSuccess(data) {
      console.log("IN HERE", data);
      const dataURI = `data:audio/mpeg;base64,${data?.audio}`;
      console.log("data uri", dataURI);
      audioRef.current!.src = dataURI;
      // await context.post.all.invalidate();
    },
  });

  return (
    <div
      className="
      fixed 
      bottom-0 
      h-32
      w-full 
      bg-gray-200 
      px-4 py-4 
      sm:px-6
    "
    >
      <div className="grid h-full w-full grid-cols-1 place-content-between content-center rounded-2xl bg-white p-3 shadow-md shadow-gray-900 md:grid-cols-3 md:p-4">
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
          <button
            onClick={async (e) => {
              try {
                await generateVoice({
                  voice_id: currentVoice?.id ?? "",
                  message: speech ?? "",
                });
                // setTitle("");
                // setContent("");
                // await context.post.all.invalidate();
              } catch {
                // noop
              }
            }}
          >
            <PlayIcon
              width={30}
              className="cursor-pointer fill-gray-700 hover:text-gray-300"
            />
          </button>
          <audio ref={audioRef} controls />
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-blue-500"
              style={{ width: "50%" }}
            ></div>
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center justify-center gap-x-2 md:justify-end">
          <button>
            <ArrowDownOnSquareIcon width={30} className="stroke-black" />
          </button>
          <button>
            <TrashIcon width={30} className="stroke-black" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
