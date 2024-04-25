import type { Metadata } from "next";

import { CounterData } from "./components/herosection/CounterData";
import HeroSection from "./components/herosection/HeroBlock/herosection";
import { MotionTransition } from "./components/herosection/MotionTransition/MotionTransition";

export const metadata: Metadata = {
  title: "Script Timer",
  description: "Welcome to Script Timer",
};

export default function LandingPage() {
  return (
    <div className="h-full py-6 md:py-12 lg:py-12 xl:py-12">
      <HeroSection />
      <CounterData />
    </div>
  );
}
