import * as React from "react";
import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import { getMasterclassStatus } from "~/app/(site)/my-profile/actions";
import videoCardData from "../../../components/masterclasses/videocards/videocardsdata";
import CourseTittle from "../../coursetittle";
import { CourseData } from "../../dynamiccourse/coursesData";
import DynamicCourse from "../../dynamiccourse/page";
import OtherCoursesBanner from "../../othecoursesbanner";
import VideoPage from "../../videopage";

export const metadata: Metadata = {
  title: "Masterclasses",
  description: "Masterclasses and Courses",
};

export default async function CoursePage({
  params,
}: {
  params: { id: string; videoNumber: string };
}) {
  const session = await auth();

  // Return nothing if there's no session
  if (!session) {
    return null;
  }

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

  const plan = session?.user?.subscription?.status;
  const userId = session?.user?.id;
  const hasAccess = await getMasterclassStatus({
    status: plan!,
    userId: userId,
  });

  const courseName = courseInfo?.title;

  return (
    <>
      {!hasAccess ? (
        <DynamicCourse courseInfo={courseInfo} courseName={courseName} />
      ) : (
        <CourseTittle courseName={courseName} />
      )}

      <VideoPage
        currentVideo={currentVideo}
        courseVideos={courseVideos}
        previousVideo={previousVideo}
        nextVideo={nextVideo}
        noAccess={!hasAccess}
      />
      <OtherCoursesBanner />
    </>
  );
}
