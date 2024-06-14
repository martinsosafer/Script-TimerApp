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
  try {
    const session = await getSession();
    const subData = session?.subscription;

    if (!searchParams.id) {
      console.error("Missing searchParams.id");
      return <p>Error: Missing search parameters.</p>;
    }

    const currentVideoId = parseInt(searchParams.id, 10);

    if (isNaN(currentVideoId)) {
      console.error("Invalid currentVideoId:", searchParams.id);
      return <p>Error: Invalid video ID.</p>;
    }

    const currentVideo = videoCardData.find(
      (video) => video.id === currentVideoId,
    );

    if (!currentVideo) {
      console.error("Current video not found:", currentVideoId);
      return <p>Error: Video not found.</p>;
    }

    console.log("currentVideo", currentVideo);

    const relatedVideos = videoCardData
      .filter(
        (video) =>
          video?.course === currentVideo?.course &&
          video.id !== currentVideo.id,
      )
      .slice(0, 4);

    return (
      <>
        <VideoPage searchParams={currentVideo} relatedVideos={relatedVideos} />
        {/* <FreeModal subData={subData} /> */}
      </>
    );
  } catch (error) {
    console.error("An error occurred:", error);
    return <p>Error: An unexpected error occurred.</p>;
  }
}
