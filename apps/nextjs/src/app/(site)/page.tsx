import type { Metadata } from "next";

import AboutMe from "./components/herosection/AboutMe/AboutMe";
import { CounterData } from "./components/herosection/CounterData/CounterData";
import GoSections from "./components/herosection/GoSections/GoSections";
import HeroSection from "./components/herosection/HeroBlock/HeroSection";
import { ServiceSection } from "./components/herosection/ServicesSection";
import { Testimonials } from "./components/herosection/Testimonials";

export const metadata: Metadata = {
  title: "Script Timer",
  description: "Welcome to Script Timer",
};

export default function LandingPage() {
  return (
    <div className="h-full py-6 md:py-12 lg:py-12 xl:py-12">
      <HeroSection />
      <CounterData />
      <ServiceSection />
      <GoSections />
      <Testimonials />
      {/* <AboutMe /> */}
    </div>
  );
}
