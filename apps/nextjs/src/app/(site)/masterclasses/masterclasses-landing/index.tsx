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
              Why take Masterclasses?
            </h1>
            <RevealText>
              <p className="mb-10 mt-10 text-center text-lg font-medium text-secondary-foreground">
                The best stories and structure connect you emotionally and
                inspire your audience.
                <br />
                Join 70,000 people who have transformed their careers by
                presenting their best to an audience, when interviewing,
                creating ads, podcasts, and videos.
                <br />
                Learn the specific story frameworks inside great stories.
                Transform your career like those who have created over
                $100,000,000 in new revenue.
                <br />
                Watch the preview for the first 5 courses included in your
                business membership, with more coming.
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
