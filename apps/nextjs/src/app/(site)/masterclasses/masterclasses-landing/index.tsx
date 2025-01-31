"use client";

import React, { useState } from "react";

import { RevealText } from "~/app/animations/RevealText";
import type { SubscriptionData } from "~/lib/types";
import MarqueeLogos from "../../components/herosection/MarqueeLogos";
import VideoCards from "../../components/masterclasses/videocards/videocards";
import videoCardData from "../../components/masterclasses/videocards/videocardsdata";
import VideoCategories from "../../components/masterclasses/videocategories/videocategories";
import NoSessionModal from "../../components/modals/no-session-modal";
import CourseListing from "./coursecards";
import CoursesHeroBlock from "./heroblockcourses";

export default function MasterclasessLanding({
  subData,
}: {
  subData: SubscriptionData | null | undefined;
}) {
  const [openNoSessionModal, setOpenNoSessionModal] = useState<boolean>(false);

  return (
    <>
      <CoursesHeroBlock />
      <div className="mt-[32px]">
        <MarqueeLogos />
      </div>
      <CourseListing
        videoCardData={videoCardData}
        subData={subData}
        setOpenNoSessionModal={() => setOpenNoSessionModal(true)}
      />
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
