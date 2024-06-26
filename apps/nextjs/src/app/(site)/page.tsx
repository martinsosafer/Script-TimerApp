import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import CounterData from "./components/herosection/CounterData/CounterData";
import GoSections from "./components/herosection/GoSections/GoSections";
import HeroSection from "./components/herosection/HeroBlock/herosection";
import ServiceSection from "./components/herosection/ServicesSection/servicessection";
import Testimonials from "./components/herosection/Testimonials/Testimonials";
import InitialModal from "./components/initial-modal";
import Modal from "./components/modal";

export const metadata: Metadata = {
  title: "Script Timer",
  description: "Welcome to Script Timer",
};

export default async function LandingPage() {
  const userData = await auth();
  const userId = userData?.user.id ?? "";
  const subData = userData?.user?.subscription?.status;

  return (
    <>
      <HeroSection />
      <CounterData />
      <ServiceSection />
      <GoSections />
      <Testimonials />
      <Modal status={subData} userId={userId} />
    </>
  );
}
