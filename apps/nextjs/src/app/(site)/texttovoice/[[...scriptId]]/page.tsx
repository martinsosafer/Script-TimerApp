import * as React from "react";
import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import { fetchUserCredits } from "~/lib/get11LabsCredits";
import { set11LabsCreditsBasedOnPlan } from "~/lib/set11labsCredits";
import { ScriptAI } from "./script-ai";

export const metadata: Metadata = {
  title: "Script Timer",
  description: "AI helping you find your voice.",
};

export default async function ScriptPage() {
  const session = await auth();

  let initialCredits = 0;

  if (session?.user.id && session?.user.subscription?.status) {
    await set11LabsCreditsBasedOnPlan(
      session.user.id,
      session.user.subscription.status,
    );

    try {
      initialCredits = await fetchUserCredits(session.user.id);
    } catch (error) {
      console.error("Error fetching user credits:", error);
    }
  }

  const subData = session?.user.subscription;

  return (
    <>
      <ScriptAI subData={subData} initialCredits={initialCredits} />
    </>
  );
}
