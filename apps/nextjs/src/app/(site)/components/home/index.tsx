"use client";

import { useState } from "react";

import CounterData from "../herosection/CounterData/CounterData";
import GoSections from "../herosection/GoSections/GoSections";
import HeroSection from "../herosection/HeroBlock/herosection";
import ServiceSection from "../herosection/ServicesSection/servicessection";
import Testimonials from "../herosection/Testimonials/Testimonials";
import NoSessionModal from "../modals/no-session-modal";

export default function Home({ user }: { user: string }) {
  const [openModal, setOpenModal] = useState(user ? false : true);

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
    </>
  );
}
