"use client";

import React, { useState } from "react";

import { Button } from "@voiceai/ui";

import { RevealText } from "~/app/animations/RevealText";
import type { SubscriptionData } from "~/lib/types";
import MarqueeLogos from "../../components/herosection/MarqueeLogos";
import VideoCards from "../../components/masterclasses/videocards/videocards";
import videoCardData from "../../components/masterclasses/videocards/videocardsdata";
import VideoCategories from "../../components/masterclasses/videocategories/videocategories";
import NoSessionModal from "../../components/modals/no-session-modal";
import CoursesHeroBlock from "./heroblockcourses";

export default function MasterclasessLanding({
  subData,
}: {
  subData: SubscriptionData | null | undefined;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    "Stories That Transform Marketing",
  );

  const [openNoSessionModal, setOpenNoSessionModal] = useState<boolean>(false);

  const filteredVideos = selectedCategory
    ? videoCardData.filter((video) => video.course === selectedCategory)
    : videoCardData;

  return (
    <>
      <CoursesHeroBlock />
      <div className="mt-[32px]">
        <MarqueeLogos />
      </div>
      {openNoSessionModal && (
        <NoSessionModal
          page="courses"
          openModal={openNoSessionModal}
          setOpenModal={setOpenNoSessionModal}
          subData={subData}
        />
      )}
    </>
  );
}
