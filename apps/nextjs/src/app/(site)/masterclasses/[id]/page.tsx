import React from "react";
import Image from "next/image";
import Link from "next/link";

// Assuming you have a component for related videos
import { AspectRatio } from "@voiceai/ui/@/components/ui/aspect-ratio";

import { RevealText } from "~/app/animations/RevealText";
import MotionTransition from "../../components/herosection/MotionTransition/MotionTransition";

interface VideoData {
  title: string;
  name: string;
  videoUrl: string;
  avatar: string;
  description: string;
}

interface VideoPageProps {
  searchParams: VideoData;
}

const VideoPage: React.FC<VideoPageProps> = ({ searchParams }) => {
  const { title, name, videoUrl, avatar, description } = searchParams;
  return (
    <MotionTransition className="  mb-16 flex items-center justify-center">
      <div className="mx-auto max-w-4xl ">
        <RevealText>
          <h1 className=" mb-4 mt-4 font-poppins  text-3xl font-bold">
            {title}
          </h1>
        </RevealText>
        <div>
          <AspectRatio ratio={16 / 8}>
            <iframe
              src={videoUrl}
              className="h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              title="Script-Timer Ai_ On boarding video (Short version) (1)"
            />
          </AspectRatio>
        </div>
        <div className=" mb-3 mt-6 flex w-full items-center justify-between   px-2 ">
          <div className=" flex items-center justify-center gap-2 ">
            <Image
              src={avatar}
              width={24}
              height={24}
              className="rounded-full"
              alt="Creator Image"
            />
            <p className="font-poppins text-lg font-semibold ">{name}</p>
          </div>
        </div>
        <RevealText>
          <p className="mb-8 text-gray-600">{description}</p>
        </RevealText>
        <h2 className="mb-2 text-2xl font-bold">Related Videos</h2>
        <section className="mt-4 grid w-full grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          <Link
            href="/masterclasses"
            className=" group relative flex h-full w-full items-center justify-center"
          >
            <Image
              src="https://img.freepik.com/free-vector/flat-geometric-fashion-youtube-thumbnail_23-2148900774.jpg?size=626&ext=jpg"
              width={414}
              height={314}
              className="h-full w-full rounded-2xl object-cover"
              alt="VideoImage"
            />
            <div className="absolute bottom-0  right-0  flex h-1/3 w-full items-end justify-end gap-2 rounded-b-2xl bg-gradient-to-b from-transparent to-black/50 p-4 text-lg font-semibold text-white">
              <p className="w-full font-poppins">Video Title</p>
            </div>
          </Link>
          <Link
            href="/masterclasses"
            className=" group relative flex h-full w-full items-center justify-center"
          >
            <Image
              src="https://img.freepik.com/free-vector/flat-geometric-fashion-youtube-thumbnail_23-2148900774.jpg?size=626&ext=jpg"
              width={414}
              height={314}
              className="h-full w-full rounded-2xl object-cover"
              alt="VideoImage"
            />
            <div className="absolute bottom-0  right-0  flex h-1/3 w-full items-end justify-end gap-2 rounded-b-2xl bg-gradient-to-b from-transparent to-black/50 p-4 text-lg font-semibold text-white">
              <p className="w-full font-poppins">Video Title</p>
            </div>
          </Link>
          <Link
            href="/masterclasses"
            className=" group relative flex h-full w-full items-center justify-center"
          >
            <Image
              src="https://img.freepik.com/free-vector/flat-geometric-fashion-youtube-thumbnail_23-2148900774.jpg?size=626&ext=jpg"
              width={414}
              height={314}
              className="h-full w-full rounded-2xl object-cover"
              alt="VideoImage"
            />
            <div className="absolute bottom-0  right-0  flex h-1/3 w-full items-end justify-end gap-2 rounded-b-2xl bg-gradient-to-b from-transparent to-black/50 p-4 text-lg font-semibold text-white">
              <p className="w-full font-poppins">Video Title</p>
            </div>
          </Link>
          <Link
            href="/masterclasses"
            className=" group relative flex h-full w-full items-center justify-center"
          >
            <Image
              src="https://img.freepik.com/free-vector/flat-geometric-fashion-youtube-thumbnail_23-2148900774.jpg?size=626&ext=jpg"
              width={414}
              height={314}
              className="h-full w-full rounded-2xl object-cover"
              alt="VideoImage"
            />
            <div className="absolute bottom-0  right-0  flex h-1/3 w-full items-end justify-end gap-2 rounded-b-2xl bg-gradient-to-b from-transparent to-black/50 p-4 text-lg font-semibold text-white">
              <p className="w-full font-poppins">Video Title</p>
            </div>
          </Link>
        </section>
      </div>
    </MotionTransition>
  );
};
export default VideoPage;
