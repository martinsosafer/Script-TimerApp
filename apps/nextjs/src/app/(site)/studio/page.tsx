import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import PageHeader from "../components/page-header";
import MultiActorPage from "./multiactorpage";
import { fetchUserCredits } from "~/lib/get11LabsCredits";
import { getTotalCredits } from "../texttovoice/[[...scriptId]]/utils";

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

// Add characters record similar to the one in ScriptAI component
const characters: Record<string | number, string> = {
  FREE: "500",
  STUDENT: "1,000",
  CREATOR: "10,000",
  BUSINESS: "30,000",
  STUDENTCLMO: "1,000",
  CREATORCLMO: "10,000",
  BUSINESSCLMO: "30,000",
  STUDENTCLYR: "1,000",
  CREATORCLYR: "10,000",
  BUSINESSCLYR: "30,000",
  INACTIVE: "0",
  ACTIVE: "500",
  PAUSED: "0",
  1: "5,000",
  2: "10,000",
};

export const metadata: Metadata = {
  title: "Studio",
  description: "do some stuff here",
};

export default async function IndexPage() {
  const session = await auth();
  const subData = session?.user.subscription;
  console.log("subdata", subData);

  // Use planId instead of plan
  const basePlan = subData?.status ?? "FREE";

  // Fetch user credits
  let credits = 0;
  if (subData?.userId) {
    try {
      credits = await fetchUserCredits(subData.userId);
    } catch (error) {
      console.error("Error fetching credits:", error);
    }
  }

  const totalCredits = getTotalCredits(basePlan);

  const subtitle = (
    <>
      <div>
        <p className="font-base mb-2 text-center">
          You've got a screenplay, book, news, podcast, table read… This is your
          home! Create long form, multiple actor voice overs below
        </p>

        {/* Add credit information similar to ScriptAI component */}
        {basePlan && basePlan !== "FREE" ? (
          <div>
            <p className="font-base mb-2 text-center">
              On your current plan, <br />
              <span className="text-cp-primary font-semibold">
                {basePlan == 1 || basePlan == 2
                  ? `AppSumoTier ${basePlan}`
                  : basePlan}
              </span>
              , you are entitled to{" "}
              <span className="text-cp-primary font-bold">
                {characters[basePlan]}
              </span>{" "}
              per script.
            </p>
            <p className="font-base mb-2 text-center">
              You have{" "}
              <span className="text-cp-primary font-bold">{credits}</span>{" "}
              characters left of{" "}
              <span className="text-cp-primary font-bold">{totalCredits}</span>{" "}
              total monthly characters.
            </p>
          </div>
        ) : (
          <p className="font-base mb-2 text-center">
            Log in to Script Timer and start creating now.
          </p>
        )}
      </div>
    </>
  );

  return (
    <div>
      <PageHeader title="Multi-Voice Studio" subtitle={subtitle} />
      <MultiActorPage />
    </div>
  );
}
