"use client";

import { useEffect, useState } from "react";

import { usePlayer } from "../providers/player-context";

interface PlayerContentProps {
  //   song: Song;
  //   songUrl: string;
}
interface AudioDataChunk {
  value: Uint8Array;
  done: boolean;
}
const audioContext = new AudioContext();

const processAudioData = async (
  reader: ReadableStreamDefaultReader<Uint8Array>,
) => {
  console.log("in reader", reader);
  const audioBuffer = await new Promise(async (resolve, reject) => {
    const chunks = [];
    let stream = await reader.read();

    console.log("stream", stream);
    while (!stream.done) {
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

    // audioContext.decodeAudioData(concatenatedData.buffer, resolve, reject);

    audioContext.decodeAudioData(concatenatedData.buffer, (buffer) => {
      const audioSource = audioContext.createBufferSource();
      audioSource.buffer = buffer;
      audioSource.connect(audioContext.destination);
      audioSource.start(0);
    });
  });

  // Now you can use the audioBuffer for playback or other processing
};

const streamTranscript = async (voiceId: string) => {
  const response = await fetch(`/api/voice`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      voice_id: voiceId,
      message: `According to all known laws
        of aviation,
        
          
        there is no way a bee
        should be able to fly.
        
          
        Its wings are too small to get
        its fat little body off the ground.
        
          
        The bee, of course, flies anyway
        
          
        because bees don't care
        what humans think is impossible.
        
          
        Yellow, black. Yellow, black.
        Yellow, black. Yellow, black.`,
    }), // body data type must match "Content-Type" header
  });
  console.log("response", response);
  const startTime = 0;
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
  const { currentSongId } = state;
  console.log("IN PLAYER", state, currentSongId);

  useEffect(() => {
    if (currentSongId) {
      streamTranscript(currentSongId);
    }
  }, [currentSongId]);

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
