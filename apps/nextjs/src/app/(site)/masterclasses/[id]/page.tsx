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
      <MasterClassModal status={subData} />
    </>
  );
}
