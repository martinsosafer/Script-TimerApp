import * as React from "react";
import type { Metadata } from "next";

import { getSession } from "~/app/api/subscription/subscription";
import FreeModal from "../../components/free-modal";
import videoCardData from "../../components/masterclasses/videocards/videocardsdata";
import VideoPage from "../../components/masterclasses/videopage/videopage";

export const metadata: Metadata = {
  title: "Masterclasses",
  description: "Masterclasses and Courses",
};

interface PageProps {
  searchParams: {
    id: string;
    course: string;
    title: string;
    name: string;
    videoUrl: string;
    avatarUrl: string;
    description: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const session = await getSession();
  const subData = session?.subscription;

  const currentVideoId = parseInt(searchParams.id, 10);

  const currentVideo = videoCardData.find(
    (video) => video.id === currentVideoId,
  );
  console.log("currentvideo", currentVideo);

  const relatedVideos = videoCardData
    .filter(
      (video) =>
        video.course === currentVideo.course && video.id !== currentVideo.id,
    )
    .slice(0, 4); // Get only the next 3 related videos

  return (
    <>
      <VideoPage searchParams={currentVideo} relatedVideos={relatedVideos} />
      {/* <FreeModal subData={subData} /> */}
    </>
  );
}
