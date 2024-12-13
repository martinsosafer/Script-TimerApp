import React from "react";
import Image from "next/image";
import Link from "next/link";

import { AspectRatio } from "@voiceai/ui/@/components/ui/aspect-ratio";

import { RevealText } from "~/app/animations/RevealText";
import MotionTransition from "../../herosection/MotionTransition/MotionTransition";

interface VideoData {
  id: number | string;
  number: string;
  course: string;
  title: string;
  name: string;
  videoUrl: string;
  avatarUrl: string;
  description: string;
}

interface RelatedVideo {
  id: number;
  number: string;
  course: string;
  title: string;
  name: string;
  videoUrl: string;
  avatarUrl: string;
  description: string;
  image: string;
}

interface VideoComponentProps {
  data: VideoData;
  relatedVideos: RelatedVideo[];
  previousVideo: RelatedVideo | null;
  nextVideo: RelatedVideo | null;
}

const VideoComponent: React.FC<VideoComponentProps> = ({
  data,
  relatedVideos,
  previousVideo,
  nextVideo,
}) => {
  console.log("data", data);
  console.log("data.id", data.id, "Type:", typeof data.id);
  return (
    <MotionTransition className="mb-16 flex items-center justify-center">
      <div className="relative mx-auto max-w-4xl">
        <RevealText>
          <h1 className="mb-4 mt-4 font-poppins text-3xl font-bold">
            <span className="text-primary">{data.number}</span>-{data.title}
          </h1>
        </RevealText>
        <div className="relative flex items-center justify-center">
          {previousVideo && (
            <Link
              href={{
                pathname: `/masterclasses/${previousVideo.id}`,
                query: {
                  title: previousVideo.title,
                  id: previousVideo.id,
                  course: previousVideo.course,
                  name: previousVideo.name,
                  videoUrl: previousVideo.videoUrl,
                  avatarUrl: previousVideo.avatarUrl,
                  description: previousVideo.description,
                },
              }}
              className="absolute left-0 z-10 rounded-full bg-gray-800 p-2 text-white shadow-lg"
            >
              &larr;
            </Link>
          )}
          <AspectRatio ratio={16 / 8}>
            <iframe
              src={data.videoUrl}
              className="h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              title={data.title}
            />
          </AspectRatio>
          {nextVideo && (
            <Link
              href={{
                pathname: `/masterclasses/${nextVideo.id}`,
                query: {
                  title: nextVideo.title,
                  id: nextVideo.id,
                  course: nextVideo.course,
                  name: nextVideo.name,
                  videoUrl: nextVideo.videoUrl,
                  avatarUrl: nextVideo.avatarUrl,
                  description: nextVideo.description,
                },
              }}
              className="absolute right-0 z-10 rounded-full bg-gray-800 p-2 text-white shadow-lg"
            >
              &rarr;
            </Link>
          )}
        </div>
        <div className="mb-3 mt-6 flex w-full items-center justify-between px-2">
          <div className="flex items-center justify-center gap-2">
            <Image
              src={data.avatarUrl}
              width={24}
              height={24}
              className="rounded-full"
              alt="Creator Image"
            />
            <p className="font-poppins text-lg font-semibold">{data.name}</p>
          </div>
        </div>
        <RevealText>
          <p className="mb-8 text-gray-600">{data.description}</p>
        </RevealText>
        <h2 className="mb-2 text-2xl font-bold">Related Videos</h2>
        <section className="mt-4 grid w-full grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {relatedVideos.map((video) => (
            <div
              key={video.id}
              className="flex flex-col items-center justify-center rounded-2xl bg-blue-300 drop-shadow-lg"
            >
              <Link
                href={{
                  pathname: `/masterclasses/${video.id}`,
                  query: {
                    title: video.title,
                    id: video.id,
                    course: video.course,
                    name: video.name,
                    videoUrl: video.videoUrl,
                    avatarUrl: video.avatarUrl,
                    description: video.description,
                  },
                }}
                className="group relative flex h-full w-full flex-col items-center justify-center"
              >
                <div className="h-32 w-full">
                  <Image
                    src={video.image}
                    width={370}
                    height={300}
                    className="h-full w-full rounded-2xl object-cover"
                    alt="VideoImage"
                  />
                </div>
                <div className="mb-3 mt-3  flex  w-full items-center justify-between px-2 font-poppins text-sm font-semibold">
                  <div className="flex items-center justify-center gap-2"></div>
                </div>
                <div className="mt-2 flex  w-full flex-col justify-between rounded-md bg-slate-200 text-center">
                  <p className="text-lg font-semibold text-primary">
                    {video.id}
                  </p>
                  <p className="flex h-12 items-center justify-center text-lg">
                    {video.title}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </section>
      </div>
    </MotionTransition>
  );
};

export default VideoComponent;
