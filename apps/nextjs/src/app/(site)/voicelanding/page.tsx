import type { Metadata } from "next";

import AIVoiceLandingPage from "./voice-landing";

export const metadata: Metadata = {
  title: "Test our voice. Co-producer",
  description: "Test a couple of the voice at our disposal",
};

export default async function indexPage() {
  return (
    <div className="flex w-full justify-center">
      <AIVoiceLandingPage />
    </div>
  );
}
