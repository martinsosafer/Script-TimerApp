import type { Metadata } from "next";

import CounterData from "./components/herosection/CounterData/CounterData";
import GoSections from "./components/herosection/GoSections/GoSections";
import HeroSection from "./components/herosection/HeroBlock/herosection";
import ServiceSection from "./components/herosection/ServicesSection/servicessection";
import Testimonials from "./components/herosection/Testimonials/Testimonials";

export const metadata: Metadata = {
  title: "Script Timer",
  description: "Welcome to Script Timer",
};

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <CounterData />
      <ServiceSection />
      <GoSections />
      <Testimonials />
    </>
  );
}
