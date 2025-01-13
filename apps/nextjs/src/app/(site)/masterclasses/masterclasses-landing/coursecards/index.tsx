"use client";

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
    <div className="flex h-full flex-col justify-between p-6">
      <div>
        <h3 className="mb-2 text-xl font-semibold text-blue-600">
          {data.course}
        </h3>
        <p className="mb-4 text-gray-600">{data.description}</p>
      </div>
      <Button variant="default" className="w-fit bg-blue-600 hover:bg-blue-700">
        View course <IconChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );

  const VideoSection = () => (
    <div className="aspect-video h-full">
      <iframe
        src={data.videoUrl}
        className="h-full w-full"
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
  // Get only the first video of each unique course
  const uniqueCourses = Array.from(
    new Set(videoCardData.map((video) => video.course)),
  );
  const firstVideos = uniqueCourses
    .map((course) => videoCardData.find((video) => video.course === course))
    .filter((video): video is Video => video !== undefined);

  return (
    <div className="min-h-[2331px] bg-blue-600 p-8">
      <div className="mx-auto max-w-[944px] items-center space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            These 60+ course modules will take
          </h1>
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            beginners through experts to new heights.
          </h1>
          <p className="text-xl text-blue-100">
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
