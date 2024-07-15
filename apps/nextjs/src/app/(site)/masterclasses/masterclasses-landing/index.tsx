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
      <section className="flex-start mb-16 flex-col px-5 py-6 lg:px-20">
        <div className="mt-3 flex items-center justify-center">
          <div>
            <h1
              className="mt-8 text-center font-poppins  text-3xl  font-bold  text-primary
          "
            >
              Why Masterclasses?
            </h1>
            <RevealText>
              <p className="mb-10 mt-10  text-center text-lg font-medium text-secondary-foreground">
                Preparing the best story connects you emotionally with your
                audience. This helps you be at ease, get the outcomes you
                desire, and inspires your audience. There are specific
                components in great stories. Learn the story frameworks that
                have transformed careers, created over $100,000,000 in sales,
                and been seen in films & commercials seen around the world.
              </p>
            </RevealText>
          </div>
        </div>
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
