import * as React from "react";
import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

// import { fetchUserCredits } from "~/lib/get11LabsCredits";
import { set11LabsCreditsBasedOnPlan } from "~/lib/set11labsCredits";
import { getOpenAiCredits } from "../../chat/actions";
import { get11LabsPlanAndBoosterCredits } from "../../my-profile/actions";
import { ScriptAI } from "./script-ai";

export const metadata: Metadata = {
  title: "Script Timer",
  description: "AI helping you find your voice.",
};

export default async function ScriptPage() {
  const session = await auth();
  let totalCredits = 0;
  // let credits = 0;
  // let boosterCredits = 0;

  if (session?.user.id && session?.user.subscription?.status) {
    await set11LabsCreditsBasedOnPlan(
      session.user.id,
      session.user.subscription.status,
    );

    try {
      // Voices credits
      const elevenLabsCredits = await get11LabsPlanAndBoosterCredits(
        session?.user.id ?? "",
      );
      totalCredits = elevenLabsCredits?.totalCredits ?? 0;
      // credits = elevenLabsCredits?.planCredits ?? 0;
      // boosterCredits = elevenLabsCredits?.boosterCredits ?? 0;
    } catch (error) {
      console.error("Error fetching user credits:", error);
    }
  }

  const subData = session?.user.subscription;
  const openAiCredits = getOpenAiCredits(subData?.userId ?? "");

  return (
    <ScriptAI
      subData={subData}
      totalCredits={totalCredits}
      // planCredits={credits}
      // boosterCredits={boosterCredits}
      openAiCredits={openAiCredits}
    />
  );
}
