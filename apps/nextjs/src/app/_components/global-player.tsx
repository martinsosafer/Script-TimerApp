"use client";

import { useEffect, useState } from "react";
import PlayIcon from "@heroicons/react/24/outline/PlayIcon";
import BackwardIcon from "@heroicons/react/24/solid/BackwardIcon";
import ForwardIcon from "@heroicons/react/24/solid/ForwardIcon";
import HeartIcon from "@heroicons/react/24/solid/HeartIcon";

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
      h-[80px] 
      w-full 
      bg-black 
      px-4 
      py-2
    "
    >
      <div className="grid h-full grid-cols-2 md:grid-cols-3">
        <div className="flex w-full justify-start">
          <HeartIcon width={30} className="fill-slate-100 hover:fill-red-400" />
        </div>

        <div className="relative mt-2 w-full">
          <div
            className="
            grid
            h-full
            w-full
            max-w-[722px]
            items-center
            justify-center
            gap-x-6
            md:flex
          "
          >
            <BackwardIcon
              width={30}
              className="cursor-pointer text-white hover:text-gray-300"
              onClick={onPlayPrevious}
            />
            <PlayIcon
              width={30}
              className="cursor-pointer text-white hover:text-gray-300"
              onClick={handlePlay}
            />
            <ForwardIcon
              width={30}
              className="cursor-pointer text-white hover:text-gray-300"
              onClick={onPlayNext}
            />
          </div>
          <div className="inset-0 flex items-center">
            <div className="h-1 w-full bg-gray-200">
              <div className="h-1 bg-blue-500" style={{ width: "50%" }}></div>{" "}
              {/* Example: Set to 50% for demonstration */}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden w-full justify-end pr-2 md:flex">
        <div className="flex w-[120px] items-center gap-x-2">
          {/* <VolumeIcon 
              onClick={toggleMute} 
              className="cursor-pointer" 
              size={34} 
            />
            <Slider 
              value={volume} 
              onChange={(value) => setVolume(value)}
            /> */}
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
