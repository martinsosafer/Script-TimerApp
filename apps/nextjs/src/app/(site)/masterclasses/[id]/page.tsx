import React from "react";
import Image from "next/image";
import Link from "next/link";

// Assuming you have a component for related videos
import { AspectRatio } from "@voiceai/ui/@/components/ui/aspect-ratio";

import { RevealText } from "~/app/animations/RevealText";
import MotionTransition from "../../components/herosection/MotionTransition/MotionTransition";

function VideoPage() {
  return (
    <MotionTransition className="  mb-16 flex items-center justify-center">
      <div className="mx-auto max-w-4xl ">
        <RevealText>
          <h1 className=" mb-4 mt-4 font-poppins  text-3xl font-bold">
            Video Title
          </h1>
        </RevealText>
        <div>
          <AspectRatio ratio={16 / 8}>
            <iframe
              src="https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
              className="h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              title="Script-Timer Ai_ On boarding video (Short version) (1)"
            />
          </AspectRatio>
        </div>
        <div className=" mb-3 mt-6 flex w-full items-center justify-between   px-2 ">
          <div className=" flex items-center justify-center gap-2 ">
            <Image
              src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?t=st=1715432996~exp=1715436596~hmac=a02f59aff47060e1c1699c6f63d106e101e4e8297d566e872af14783ce292010&w=740"
              width={24}
              height={24}
              className="rounded-full"
              alt="Creator Image"
            />
            <p className="font-poppins text-lg font-semibold ">Maury Rogow</p>
          </div>
        </div>
        <RevealText>
          <p className="mb-8 text-gray-600">
            Description: Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
          </p>
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
}

export default VideoPage;
