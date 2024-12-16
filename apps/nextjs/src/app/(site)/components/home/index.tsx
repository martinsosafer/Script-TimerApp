"use client";

import { useEffect, useState } from "react";

import type { Session } from "@voiceai/auth";

import EmailLoginSection from "~/app/lp/sections/email-login-section";
import CounterData from "../herosection/CounterData/CounterData";
import FAQAccordion from "../herosection/FaqAccordion";
import GoSections from "../herosection/GoSections/GoSections";
import HeroSection from "../herosection/HeroBlock/herosection";
import MarqueeLogos from "../herosection/MarqueeLogos";
import ServiceSection from "../herosection/ServicesSection/servicessection";
import Testimonials from "../herosection/Testimonials/Testimonials";
import VideoBlock from "../herosection/VideoBlock";
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
      {!session && <EmailLoginSection />}
      <ServiceSection />
      <CounterData />
      <GoSections />
      <Testimonials />
      <VideoBlock />
      <FAQAccordion />
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
