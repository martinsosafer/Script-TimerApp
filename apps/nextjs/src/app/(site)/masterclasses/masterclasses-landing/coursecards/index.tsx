"use client";

import Link from "next/link";

import { Button } from "@voiceai/ui";
import { Card, CardContent } from "@voiceai/ui/@/components/ui/card";
import { IconChevronRight } from "@voiceai/ui/@/components/ui/icons";

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

interface CourseCardProps {
  data: Video;
  index: number;
}

function CourseCard({ data, index }: CourseCardProps) {
  const isEven = index % 2 === 0;

  const ContentSection = () => (
    <div className="flex h-full flex-col justify-between p-0">
      <div>
        <h3 className="mb-4 line-clamp-1 text-xl font-semibold text-blue-600">
          {data.course}
        </h3>
        <p className="mb-6 line-clamp-3 text-gray-600">{data.description}</p>
      </div>
      <Link href={`/masterclasses/${data.id}`} target="_blank">
        <Button
          variant="default"
          className="h-12 w-[368px] bg-blue-600 hover:bg-blue-700"
        >
          View course <IconChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );

  const VideoSection = () => (
    <div className="aspect-video h-full w-full">
      <iframe
        src={data.videoUrl}
        className="h-full w-full rounded-lg"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );

  return (
    <Card className="overflow-hidden rounded-3xl bg-white">
      <CardContent className="grid gap-8 p-8 lg:grid-cols-2">
        {isEven ? (
          <>
            <ContentSection />
            <VideoSection />
          </>
        ) : (
          <>
            <VideoSection />
            <ContentSection />
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default function CourseListing({
  videoCardData,
}: {
  videoCardData: Video[];
}) {
  const uniqueCourses = Array.from(
    new Set(videoCardData.map((video) => video.course)),
  );
  const firstVideos = uniqueCourses
    .map((course) => videoCardData.find((video) => video.course === course))
    .filter((video): video is Video => video !== undefined);

  return (
    <div className={`min-h-[2331px] bg-blue-600 p-8 ${poppins.className}`}>
      <div className="mx-auto max-w-[944px] items-center space-y-8">
        <div className="space-y-4 text-start">
          <h2 className="text-cp-secondary-lightest  font-bold lg:text-[42px] lg:leading-[50px]  ">
            These 60+ course modules will take
          </h2>
          <h2 className="text-cp-secondary-lightest  font-bold lg:text-[42px] lg:leading-[50px]  ">
            beginners through experts to new heights.
          </h2>
          <p className="text-cp-accent text-[34px] font-bold leading-[41px]">
            See the courses introductions below.
          </p>
        </div>

        <div className="space-y-6">
          {firstVideos.map((video, index) => (
            <CourseCard key={video.course} data={video} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
