import * as React from "react";
import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import { fetchUserCredits } from "~/lib/get11LabsCredits";
import { set11LabsCreditsBasedOnPlan } from "~/lib/set11labsCredits";
import PageHeader from "../components/page-header";
import { PromptingGuideAccordion } from "./SEAccordion/PromptingSoundGuideAccordion";
import { SoundEffectsGenerator } from "./soundeffectComponent";
import { characters, getTotalCredits } from "./utils";

export const metadata: Metadata = {
  title: "Special Effects and Music",
  description: "AI-powered sound effects and music generation.",
};

export default async function SoundEffectsPage() {
  const session = await auth();

  // Initialize credits variable
  let credits = 0;

  if (session?.user.id && session?.user.subscription?.status) {
    // Set credits based on the user's subscription plan
    await set11LabsCreditsBasedOnPlan(
      session.user.id,
      session.user.subscription.status,
    );

    try {
      credits = await fetchUserCredits(session.user.id);
    } catch (error) {
      console.error("Error fetching user credits:", error);
    }
  }

  const subData = session?.user.subscription;

  const totalCredits = getTotalCredits(subData?.status);

  const subtitle = (
    <>
      {subData?.status ? (
        <div>
          <p className="font-base mb-2 text-center">
            Generate custom sound effects and background music using AI. Your
            current plan (
            <span className="text-cp-secondary font-semibold">
              {subData.status}
            </span>
            ) includes{" "}
            <span className="text-cp-secondary font-bold">
              {characters[subData.status]}
            </span>{" "}
            monthly credits.
          </p>
          <p className="font-base mb-2 text-center">
            Remaining credits:{" "}
            <span className="text-cp-secondary font-bold">{credits}</span>/
            <span className="text-cp-secondary font-bold">{totalCredits}</span>
          </p>
          <p className="text-base font-semibold text-black">
            1 seconds = 40 credits
          </p>
        </div>
      ) : (
        <div className="flex flex-col">
          <p className="font-base text-center">
            Create custom sound effects and background music with AI
          </p>
          <p className="font-base mb-2 text-center">
            Sign in to start creating soundscapes
          </p>
        </div>
      )}
    </>
  );

  return (
    <div className="container mx-auto px-4">
      <PageHeader title="Special Effects & Music" subtitle={subtitle} />
      <div className="mx-auto flex max-w-3xl justify-center">
        <PromptingGuideAccordion />
      </div>
      <SoundEffectsGenerator subData={subData} credits={credits} />
    </div>
  );
}
