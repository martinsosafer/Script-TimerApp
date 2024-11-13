"use client";

import React, { useState } from "react";

import { RevealText } from "~/app/animations/RevealText";
import type { SubscriptionData } from "~/lib/types";
import VideoCards from "../../components/masterclasses/videocards/videocards";
import videoCardData from "../../components/masterclasses/videocards/videocardsdata";
import VideoCategories from "../../components/masterclasses/videocategories/videocategories";
import NoSessionModal from "../../components/modals/no-session-modal";

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
      <section className="flex-start mb-16 flex-col px-5 lg:px-20">
        <VideoCategories onSelectCategory={setSelectedCategory} />

        <VideoCards
          videos={filteredVideos}
          subData={subData}
          setOpenNoSessionModal={() => setOpenNoSessionModal(true)}
        />
      </section>
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
