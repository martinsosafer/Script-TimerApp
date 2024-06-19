import React from "react";
import Image from "next/image";
import Link from "next/link";

import { AspectRatio } from "@voiceai/ui/@/components/ui/aspect-ratio";

import { RevealText } from "~/app/animations/RevealText";
import MotionTransition from "../../herosection/MotionTransition/MotionTransition";

interface VideoData {
  id: number;
  course: string;
  title: string;
  name: string;
  videoUrl: string;
  avatarUrl: string;
  description: string;
}
interface RelatedVideo {
  id: number;
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
}

const VideoComponent: React.FC<VideoComponentProps> = ({
  data,
  relatedVideos,
}) => {
  return (
    <MotionTransition className="mb-16 flex items-center justify-center">
      <div className="relative mx-auto max-w-4xl">
        <RevealText>
          <h1 className="mb-4 mt-4 font-poppins text-3xl font-bold">
            {data.title}
          </h1>
        </RevealText>
        <div className="relative flex items-center justify-center">
          <AspectRatio ratio={16 / 8}>
            <iframe
              src={data.videoUrl}
              className="h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              title={data.title}
            />
          </AspectRatio>
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
          {relatedVideos.map((video, index) => (
            <div key={video.id} className="flex flex-col items-center">
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
                <Image
                  src={video.image}
                  width={414}
                  height={314}
                  className="h-full w-full rounded-2xl object-cover"
                  alt={video.title}
                />
                <div className="mt-2 flex h-12 w-full justify-between">
                  <p className="flex-shrink-0 text-lg font-semibold">
                    {video.id}
                  </p>
                  <p className="ml-2 text-lg">{video.title}</p>
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
