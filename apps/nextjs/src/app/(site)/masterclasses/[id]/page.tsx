import * as React from "react";
import type { Metadata } from "next";

import { getSession } from "~/app/api/subscription/subscription";
import videoCardData from "../../components/masterclasses/videocards/videocardsdata";
import VideoPage from "../../components/masterclasses/videopage/videopage";
import SubsModal from "../../components/subs-moda";
import ChatModal from "../../old-chat/chat/chatmodal";

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
  const neededPlan = "Business";
  const session = await getSession();
  const subData = session?.subscription?.status;

  const modifiedSearchParams = {
    ...searchParams,
    id: Number(searchParams.id),
  };
  const relatedVideos: RelatedVideo[] = videoCardData
    .filter(
      (video) =>
        video.course === searchParams.course &&
        video.id !== Number(searchParams.id),
    )
    .slice(0, 4)
    .map((video) => ({
      ...video,
      imageUrl: video.avatarUrl,
    }));

  return (
    <>
      <VideoPage
        searchParams={modifiedSearchParams}
        relatedVideos={relatedVideos}
      />
      {subData !== "BUSINESS" && (
        <SubsModal currentPlan={subData} neededPlan={neededPlan} />
      )}
    </>
  );
}
