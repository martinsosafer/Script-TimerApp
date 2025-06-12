"use client";

import Link from "next/link";

import { Button } from "@voiceai/ui";
import { Card, CardContent } from "@voiceai/ui/@/components/ui/card";
import { IconChevronRight } from "@voiceai/ui/@/components/ui/icons";

import { poppins, roboto } from "~/app/fonts";

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
  subData?: { status?: string } | null;
  setOpenNoSessionModal: () => void;
}

function CourseCard({
  data,
  index,
  subData,
  setOpenNoSessionModal,
}: CourseCardProps) {
  const isEven = index % 2 === 0;
  
  const handleCourseClick = (e: React.MouseEvent) => {
    if (!subData) {
      e.preventDefault();
      setOpenNoSessionModal();
    }
  };

  const ContentSection = () => (
    <div className="flex h-full flex-col justify-between p-0 lg:h-[244px] lg:w-[368px] lg:flex-col lg:justify-between">
      <div className="mx-[24px] lg:mx-0">
        <h3 className="mb-4  text-[20px] font-bold leading-[28px] text-blue-600 lg:mb-3  lg:text-[24px] lg:leading-[33.6px]">
          {data.course}
        </h3>
        <p
          className={`mb-3  text-[14px] font-normal leading-[19.6px] text-black ${roboto.className}  lg:text-[16px] lg:leading-[22.4px]`}
        >
          {data.description}
        </p>
      </div>
      <div onClick={handleCourseClick}>
        <Link href={`/masterclasses/${data.id}/1`} target="_blank">
          <Button
            variant="default"
            className="h-12 w-[368px] bg-blue-600 hover:bg-blue-700"
          >
            View course <IconChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );

  const VideoSection = () => (
    <div className="aspect-video px-[20px] lg:h-[254px] lg:w-[450px]">
      <iframe
        src={data.videoUrl}
        className="h-full w-full rounded-lg"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );

  return (
    <Card className="mx-[24px] h-[480px] w-[355px] overflow-hidden rounded-3xl bg-white lg:h-full lg:w-full">
      <CardContent className="grid gap-8 p-8 lg:grid-cols-2">
        {/* Always show VideoSection first on mobile */}
        <div className={isEven ? "lg:order-2" : "lg:order-1"}>
          <VideoSection />
        </div>
        <div className={isEven ? "lg:order-1" : "lg:order-2"}>
          <ContentSection />
        </div>
      </CardContent>
    </Card>
  );
}

export default function CourseListing({
  videoCardData,
  subData,
  setOpenNoSessionModal,
}: {
  videoCardData: Video[];
  subData: { status?: string } | null | undefined;
  setOpenNoSessionModal: () => void;
}) {
  const uniqueCourses = Array.from(
    new Set(videoCardData.map((video) => video.course)),
  );
  const firstVideos = uniqueCourses
    .map((course) => videoCardData.find((video) => video.course === course))
    .filter((video): video is Video => video !== undefined);

  return (
    <div className={`bg-cp-primary h-full lg:h-full  ${poppins.className}`}>
      <div className="mx-auto max-w-[944px] items-center space-y-8 py-[60px]">
        <div className=" mx-[24px] text-start">
          <h2 className="text-cp-secondary-lightest text-[28px] font-bold  leading-[33.6px] lg:text-[42px] lg:leading-[50px]  ">
            These 60+ course modules will take
          </h2>
          <h2 className="text-cp-secondary-lightest mb-[32px]  text-[26px] font-bold leading-[31px] lg:text-[42px] lg:leading-[50px]  ">
            beginners through experts to new heights.
          </h2>
          <p className="text-cp-accent text-[34px] font-bold leading-[41px]">
            See the courses introductions below.
          </p>
        </div>

        <div className="space-y-6">
          {firstVideos.map((video, index) => (
            <CourseCard
              key={video.course}
              data={video}
              index={index}
              subData={subData}
              setOpenNoSessionModal={setOpenNoSessionModal}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
