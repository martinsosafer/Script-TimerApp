"use client";

import { useEffect, useState } from "react";

import type { Session } from "@voiceai/auth";

import CounterData from "../herosection/CounterData/CounterData";
import GoSections from "../herosection/GoSections/GoSections";
import HeroSection from "../herosection/HeroBlock/herosection";
import MarqueeLogos from "../herosection/MarqueeLogos";
import ServiceSection from "../herosection/ServicesSection/servicessection";
import Testimonials from "../herosection/Testimonials/Testimonials";
import NoSessionModal from "../modals/no-session-modal";
import TrialExpirationModal from "../modals/trial-expiration-modal";

export default function Home({
  user,
  trialExpiration,
  session,
}: {
  user: string;
  trialExpiration: boolean;
  session: Session | null | undefined;
}) {
  const [openTrialModal, setOpenTrialModal] = useState(trialExpiration);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        setOpenModal(true);
      }, 15000); // 15 seconds

      // Clean up the timer if component unmounts or modal is closed
      return () => clearTimeout(timer);
    }
  }, [user]);

  return (
    <>
      <HeroSection />
      <MarqueeLogos />
      <ServiceSection />
      <CounterData />
      <GoSections />
      <Testimonials />
      {/* on home page appear after 15 seconds */}
      <NoSessionModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        page="home"
      />
      <TrialExpirationModal
        openModal={openTrialModal}
        setOpenModal={setOpenTrialModal}
        session={session}
      />
    </>
  );
}
