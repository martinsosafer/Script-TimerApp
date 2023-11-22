"use client";

import { useEffect, useState } from "react";
import ArrowDownOnSquareIcon from "@heroicons/react/24/outline/ArrowDownOnSquareIcon";
import PlayIcon from "@heroicons/react/24/outline/PlayIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";

import { usePlayer } from "../providers/player-context";

interface PlayerContentProps {
  //   song: Song;
  //   songUrl: string;
}

const audioContext = new AudioContext();

const processAudioData = async (
  reader: ReadableStreamDefaultReader<Uint8Array>,
): Promise<void> => {
  console.log("in reader", reader);
  const audioBuffer = await new Promise(async (resolve, reject) => {
    const chunks = [];
    let stream = await reader.read();

    console.log("stream", stream);
    while (!stream.done) {
      console.log("NEW CHUNK");
      chunks.push(stream.value);
      await new Promise((resolve) => setTimeout(resolve, 0));
      stream = await reader.read();
    }

    const concatenatedData = new Uint8Array(
      chunks.reduce((acc, chunk) => acc + chunk.length, 0),
    );
    let offset = 0;
    for (const chunk of chunks) {
      concatenatedData.set(chunk, offset);
      offset += chunk.length;
    }

    console.log("PLAYING");
    audioContext.decodeAudioData(concatenatedData.buffer, (buffer) => {
      const audioSource = audioContext.createBufferSource();
      audioSource.buffer = buffer;
      audioSource.connect(audioContext.destination);
      audioSource.start(0);
    });
  });
};

const streamTranscript = async (
  voiceId: string,
  speech: string,
): Promise<void> => {
  console.log("SENDING", speech);
  const response = await fetch(`/api/voice`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      voice_id: voiceId,
      message: speech,
    }),
  });
  console.log("response", response);

  if (response.body) {
    const reader = response.body.getReader();
    processAudioData(reader);
  }
};

const PlayerContent: React.FC<PlayerContentProps> = (
  {
    //   song,
    //   songUrl,
  },
) => {
  const { state } = usePlayer();
  const { currentVoiceId, speech } = state;
  console.log("IN PLAYER", state, currentVoiceId, speech);

  const [currentVoiceIdState, setCurrentVoiceIdState] = useState<string | null>(
    null,
  );

  useEffect(() => {
    // Check if voiceId has changed
    if (currentVoiceId !== currentVoiceIdState) {
      // Update the currentVoiceIdState
      setCurrentVoiceIdState(currentVoiceId);

      // Call streamTranscript only when voiceId changes
      if (currentVoiceId) {
        streamTranscript(currentVoiceId, speech ?? "");
      }
    }
  }, [currentVoiceId, speech, currentVoiceIdState]);

  const [progress, setProgress] = useState(0);

  const onPlayNext = () => {};

  const onPlayPrevious = () => {};

  const handlePlay = () => {};

  const toggleMute = () => {};

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
          <button onClick={handlePlay}>
            <PlayIcon
              width={30}
              className="cursor-pointer fill-gray-700 hover:text-gray-300"
            />
          </button>

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
