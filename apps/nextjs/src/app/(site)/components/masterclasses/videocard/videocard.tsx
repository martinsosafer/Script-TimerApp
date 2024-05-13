import React from "react";
import Image from "next/image";
import Link from "next/link";

import type { Video } from "../videocards/videocardsdata";

const VideoCard: React.FC<{ video: Video }> = ({ video }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl  bg-blue-300 drop-shadow-lg">
      <Link
        href={`/masterclasses/${video.id}`}
        className=" group relative flex h-full w-full items-center justify-center"
      >
        <Image
          src={video.image}
          width={414}
          height={314}
          className="h-full w-full rounded-2xl object-cover"
          alt="VideoImage"
        />
        <div className="absolute bottom-0  right-0 hidden h-1/3 w-full items-end justify-end gap-2 rounded-b-2xl bg-gradient-to-b from-transparent to-black/50 p-4 text-lg font-semibold text-white group-hover:flex">
          <p className="w-full">{video.title}</p>
        </div>
      </Link>
      <div className=" mb-3 mt-3 flex w-full items-center justify-between   px-2 font-poppins text-sm font-semibold">
        <div className=" flex items-center justify-center gap-2 ">
          <Image
            src={video.avatarUrl}
            width={24}
            height={24}
            className="rounded-full"
            alt="Creator Image"
          />
          <p>{video.name}</p>
        </div>
      </div>
      <div className="rounded-2xl bg-slate-200 px-4 py-2 text-center">
        <h3 className="font-poppins font-semibold  text-secondary-foreground">
          {video.title}
        </h3>
        <p className="text-gray-700">{video.description}</p>
      </div>
    </div>
  );
};

export default VideoCard;
