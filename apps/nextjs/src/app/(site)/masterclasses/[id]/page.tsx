import * as React from "react";
import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import { getSession } from "~/app/api/subscription/subscription";
import MasterClassModal from "../../components/masterclass-modal";
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
    imageUrl: string;
  };
}

interface RelatedVideo {
  id: number;
  course: string;
  title: string;
  name: string;
  videoUrl: string;
  avatarUrl: string;
  description: string;
  image: string;
}
export default async function Page({ searchParams }: PageProps) {
  const userData = await auth();
  const subData = userData?.user?.subscription?.status;

  const currentVideoId = Number(searchParams.id);
  const isSubscriptionActive = subData && subData === "BUSINESS";

  // Determine if modal should be shown
  const shouldShowModal = currentVideoId > 3 && !isSubscriptionActive;

  const relatedVideos: RelatedVideo[] = videoCardData
    .filter((video) => video.course === searchParams.course)
    .map((video) => ({
      ...video,
      imageUrl: video.avatarUrl,
    }));

  const currentIndex = relatedVideos.findIndex(
    (video) => video.id === currentVideoId,
  );
  const previousVideo =
    currentIndex > 0 ? relatedVideos[currentIndex - 1] : null;
  const nextVideo =
    currentIndex < relatedVideos.length - 1
      ? relatedVideos[currentIndex + 1]
      : null;

  const modifiedSearchParams = {
    ...searchParams,
    id: currentVideoId,
  };

  return (
    <>
      <VideoPage
        searchParams={modifiedSearchParams}
        relatedVideos={relatedVideos}
        previousVideo={previousVideo}
        nextVideo={nextVideo}
      />
      {shouldShowModal && <MasterClassModal status={subData} />}
    </>
  );
}
