import type { Metadata } from "next";

import HeroSection from "./components/herosection";

export const metadata: Metadata = {
  title: "Script Timer",
  description: "Welcome to Script Timer",
};

export default function LandingPage() {
  return (
    <>
      <HeroSection />
    </>
  );
}
