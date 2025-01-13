"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@voiceai/ui";
import {
  IconChevronLeft as ChevronLeft,
  IconChevronRight as ChevronRight,
} from "@voiceai/ui/@/components/ui/icons";

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
    <div className="mx-auto max-w-[1200px] p-6">
      <div className="space-y-6">
        {/* Main Video Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
              {currentVideo.number}
            </div>
            <h1 className="text-2xl font-bold text-blue-600">
              {currentVideo.title}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src={currentVideo.avatarUrl}
              alt={currentVideo.name}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="text-sm font-medium">{currentVideo.name}</span>
          </div>
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
            <iframe
              src={currentVideo.videoUrl}
              className="h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="text-gray-600">{currentVideo.description}</p>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4">
            {previousVideo ? (
              <Link href={`/masterclasses/${previousVideo.id}`}>
                <Button variant="outline" className="flex items-center gap-2">
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
              </Link>
            ) : (
              <div />
            )}
            {nextVideo && (
              <Link href={`/masterclasses/${nextVideo.id}`}>
                <Button variant="outline" className="flex items-center gap-2">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Playlist Section */}
        <div className="space-y-4">
          {courseVideos.map((video) => (
            <Link
              key={video.id}
              href={`/masterclasses/${video.id}`}
              className="block"
            >
              <div
                className={`flex gap-4 rounded-lg p-4 hover:bg-gray-50 ${
                  video.id === currentVideo.id ? "bg-gray-50" : ""
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
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-sm text-white">
                      {video.number}
                    </div>
                    <h3 className="font-medium text-blue-600">{video.title}</h3>
                  </div>
                  <p className="line-clamp-2 text-sm text-gray-600">
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
