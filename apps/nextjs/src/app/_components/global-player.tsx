"use client";

import { useEffect, useState } from "react";

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
          <div className="flex items-center gap-x-4">
            {/* <MediaItem data={song} />
            <LikeButton songId={song.id} /> */}
          </div>
        </div>

        <div
          className="
            col-auto 
            flex 
            w-full 
            items-center 
            justify-end 
            md:hidden
          "
        >
          <div
            onClick={handlePlay}
            className="
              flex
              h-10
              w-10 
              cursor-pointer 
              items-center 
              justify-center 
              rounded-full 
              bg-white 
              p-1
            "
          >
            {/* <Icon size={30} className="text-black" /> */}
          </div>
        </div>

        <div
          className="
            hidden
            h-full
            w-full 
            max-w-[722px] 
            items-center 
            justify-center 
            gap-x-6 
            md:flex
          "
        >
          {/* <AiFillStepBackward
            onClick={onPlayPrevious}
            size={30} 
            className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            "
          /> */}
          <div
            onClick={handlePlay}
            className="
              flex 
              h-10 
              w-10
              cursor-pointer
              items-center 
              justify-center 
              rounded-full 
              bg-white 
              p-1
            "
          >
            {/* <Icon size={30} className="text-black" /> */}
          </div>
          {/* <AiFillStepForward
            onClick={onPlayNext}
            size={30} 
            className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            " 
          /> */}
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
    </div>
  );
};

export default PlayerContent;
