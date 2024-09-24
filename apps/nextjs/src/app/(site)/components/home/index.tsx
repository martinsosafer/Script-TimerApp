"use client";

import { useState } from "react";

import CounterData from "../herosection/CounterData/CounterData";
import GoSections from "../herosection/GoSections/GoSections";
import HeroSection from "../herosection/HeroBlock/herosection";
import ServiceSection from "../herosection/ServicesSection/servicessection";
import Testimonials from "../herosection/Testimonials/Testimonials";
import NoSessionModal from "../modals/no-session-modal";
import TrialExpirationModal from "../modals/trial-expiration-modal";

export default function Home({
  user,
  trialExpiration,
}: {
  user: string;
  trialExpiration: boolean;
}) {
  const [openModal, setOpenModal] = useState(user ? false : true);
  const [openTrialModal, setOpenTrialModal] = useState(trialExpiration);

  return (
    <>
      <HeroSection />
      <CounterData />
      <ServiceSection />
      <GoSections />
      <Testimonials />
      <NoSessionModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        page="home"
      />
      <TrialExpirationModal
        openModal={openTrialModal}
        setOpenModal={setOpenTrialModal}
      />
    </>
  );
}
