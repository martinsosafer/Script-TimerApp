import * as React from "react";
import type { Metadata } from "next";

import videoCardData from "../../components/masterclasses/videocards/videocardsdata";
import VideoPage from "../videopage";

export const metadata: Metadata = {
  title: "Masterclasses",
  description: "Masterclasses and Courses",
};

export default function CoursePage({ params }: { params: { id: string } }) {
  const courseId = parseInt(params.id, 10);
  const courseVideos = videoCardData.filter((video) => video.id === courseId);

  if (courseVideos.length === 0) {
    return <div>Course not found</div>;
  }

  const currentVideo = courseVideos[0];
  const allCourseVideos = videoCardData.filter(
    (video) => video.course === currentVideo.course,
  );
  const currentIndex = allCourseVideos.findIndex(
    (video) => video.id === currentVideo.id,
  );
  const previousVideo =
    currentIndex > 0 ? allCourseVideos[currentIndex - 1] : null;
  const nextVideo =
    currentIndex < allCourseVideos.length - 1
      ? allCourseVideos[currentIndex + 1]
      : null;

  return (
    <VideoPage
      currentVideo={currentVideo}
      courseVideos={allCourseVideos}
      previousVideo={previousVideo}
      nextVideo={nextVideo}
    />
  );
}
