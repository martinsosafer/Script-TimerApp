import * as React from "react";
import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import { fetchUserCredits } from "~/lib/get11LabsCredits";
import { set11LabsCreditsBasedOnPlan } from "~/lib/set11labsCredits";
import { getOpenAiCredits } from "../../chat/actions";
import { ScriptAI } from "./script-ai";

export const metadata: Metadata = {
  title: "Script Timer",
  description: "AI helping you find your voice.",
};

export default async function ScriptPage() {
  const session = await auth();
  let credits = 0;
  let totalCreditsVar = 0;
  let boosterCreditsVar = 0;

  if (session?.user.id && session?.user.subscription?.status) {
    await set11LabsCreditsBasedOnPlan(
      session.user.id,
      session.user.subscription.status,
    );

    try {
      const data = await fetchUserCredits(session.user.id);
      credits = data.planCredits;
      totalCreditsVar = data.totalCredits;
      boosterCreditsVar = data.boosterCredits;
    } catch (error) {
      console.error("Error fetching user credits:", error);
    }
  }

  const subData = session?.user.subscription;
  const openAiCredits = getOpenAiCredits(subData?.userId ?? "");

  return (
    <ScriptAI
      subData={subData}
      planCredits={credits}
      totalCredits={totalCreditsVar}
      boosterCredits={boosterCreditsVar}
      openAiCredits={openAiCredits}
    />
  );
}
