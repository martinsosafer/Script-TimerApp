import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import { get11LabsPlanAndBoosterCredits } from "../my-profile/actions";
import MultiActorPage from "./multiactorpage";

const voicesAmount: Record<string, number> = {
  FREE: 0,
  STUDENT: 0,
  CREATOR: 3,
  BUSINESS: 5,
  STUDENTCLMO: 0,
  CREATORCLMO: 3,
  BUSINESSCLMO: 5,
  STUDENTCLYR: 0,
  CREATORCLYR: 3,
  BUSINESSCLYR: 5,
  INACTIVE: 0,
  ACTIVE: 0,
  PAUSED: 0,
  "1": 1,
  "2": 2,
};

export const metadata: Metadata = {
  title: "Studio",
  description: "Create Multiple Voice chats or stories in here",
};

export default async function IndexPage() {
  const session = await auth();
  const subData = session?.user.subscription;

  // Fetch user credits
  let totalCredits = 0;

  if (subData?.userId && session?.user.subscription?.status) {
    try {
      const elevenLabsCredits = await get11LabsPlanAndBoosterCredits(
        session?.user.id ?? "",
      );
      totalCredits = elevenLabsCredits?.totalCredits ?? 0;
    } catch (error) {
      console.error("Error fetching credits:", error);
    }
  }

  return (
    <>
      <MultiActorPage subData={subData} totalCredits={totalCredits} />
    </>
  );
}
