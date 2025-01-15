"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@voiceai/ui";
import {
  IconChevronLeft as ChevronLeft,
  IconChevronRight as ChevronRight,
} from "@voiceai/ui/@/components/ui/icons";

import { poppins } from "~/app/fonts";

interface Video {
  course: string;
  id: number;
  number: string;
  image: string;
  title: string;
  name: string;
  avatarUrl: string;
  videoUrl: string;
  description: string;
}

interface VideoPageProps {
  currentVideo: Video;
  courseVideos: Video[];
  previousVideo: Video | null;
  nextVideo: Video | null;
}

export default function VideoPage({
  currentVideo,
  courseVideos,
  previousVideo,
  nextVideo,
}: VideoPageProps) {
  return (
    <div className="mx-auto mt-[106px] max-w-[944px] bg-[#F5F5F7] ">
      <div className=" bg-white py-[32px] shadow-lg">
        {/* Main Video Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-10 items-center justify-center rounded-r-full bg-blue-600 text-white">
              {currentVideo.number}
            </div>
            <h1
              className={`text-cp-primary text-[34px] font-bold leading-[41px] ${poppins.className}`}
            >
              {currentVideo.title}
            </h1>
          </div>
          <div className="ml-11 flex items-center gap-2">
            <Image
              src={currentVideo.avatarUrl}
              alt={currentVideo.name}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="text-[16px]  font-bold leading-[23px] text-black">
              {currentVideo.name}
            </span>
          </div>
          <div className=" px-[42px]">
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
              <iframe
                src={currentVideo.videoUrl}
                className="h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="mt-3 text-[18px] font-normal leading-[25.2px] text-black">
              {currentVideo.description}
            </p>
            <div className="mx-auto flex items-center justify-between pt-4">
              {previousVideo ? (
                <Link
                  href={`/masterclasses/${currentVideo.id}/${previousVideo.number}`}
                >
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-[14px] font-bold  leading-[20px]"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                </Link>
              ) : (
                <div />
              )}
              {nextVideo && (
                <Link
                  href={`/masterclasses/${currentVideo.id}/${nextVideo.number}`}
                >
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-[14px] font-bold  leading-[20px]"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
        </div>

        {/* Playlist Section */}
        <div className="  my-[28px]">
          {courseVideos.map((video) => (
            <Link
              key={video.id}
              href={`/masterclasses/${video.id}`}
              className="block"
            >
              <div
                className={`flex gap-4 rounded-lg p-4 px-[44px] hover:bg-gray-200 ${
                  video.number === currentVideo.number ? "bg-[#BDF3F0]" : ""
                }`}
              >
                <div className="relative aspect-video w-40 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={video.image}
                    alt={video.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-8 w-10 items-center justify-center rounded-r-full bg-blue-600 text-white">
                      {video.number}
                    </div>
                    <h3
                      className={`text-cp-primary font-poppins text-[16px]  font-bold leading-[23px] ${poppins.className}`}
                    >
                      {video.title}
                    </h3>
                  </div>
                  <p className="line-clamp-2 text-[16px]  font-normal leading-[23px] text-black">
                    {video.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
