import * as React from "react";
import type { Metadata } from "next";

import videoCardData from "../../../components/masterclasses/videocards/videocardsdata";
import { CourseData } from "../../dynamiccourse/coursesData";
import DynamicCourse from "../../dynamiccourse/page";
import OtherCoursesBanner from "../../othecoursesbanner";
import VideoPage from "../../videopage";

export const metadata: Metadata = {
  title: "Masterclasses",
  description: "Masterclasses and Courses",
};

export default function CoursePage({
  params,
}: {
  params: { id: string; videoNumber: string };
}) {
  const courseId = parseInt(params.id, 10);
  const videoNumber = params.videoNumber;

  const courseVideos = videoCardData.filter((video) => video.id === courseId);
  const courseInfo = CourseData.find((course) => course.id === courseId);
  if (courseVideos.length === 0) {
    return <div>Course not found</div>;
  }

  const currentVideo = courseVideos.find(
    (video) => video.number === videoNumber,
  );

  if (!currentVideo) {
    return <div>Video not found</div>;
  }

  const currentIndex = courseVideos.findIndex(
    (video) => video.number === videoNumber,
  );
  const previousVideo =
    currentIndex > 0 ? courseVideos[currentIndex - 1] : null;
  const nextVideo =
    currentIndex < courseVideos.length - 1
      ? courseVideos[currentIndex + 1]
      : null;

  return (
    <>
      <DynamicCourse courseInfo={courseInfo} />
      <VideoPage
        currentVideo={currentVideo}
        courseVideos={courseVideos}
        previousVideo={previousVideo}
        nextVideo={nextVideo}
      />
      <OtherCoursesBanner />
    </>
  );
}
