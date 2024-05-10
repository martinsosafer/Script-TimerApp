import React from "react";
import Image from "next/image";
import Link from "next/link";

import type { Video } from "../videocards/videocardsdata";

const VideoCard: React.FC<{ video: Video }> = ({ video }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl  drop-shadow-lg">
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
    </div>
  );
};

export default VideoCard;
