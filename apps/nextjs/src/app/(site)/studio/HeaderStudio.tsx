"use client";

import { useEffect, useState } from "react";

import PageHeader from "../components/page-header";
import { get11LabsPlanAndBoosterCredits } from "../my-profile/actions";
import type { SubData } from "./types";

interface HeaderStudioProps {
  subData?: SubData | null | undefined;
  totalCredits: number;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
}

// Add characters record similar to the one in ScriptAI component
const characters: Record<string | number, string> = {
  FREE: "500",
  FREE_TRIAL: "1000",
  STUDENT: "2,000",
  CREATOR: "5,000",
  BUSINESS: "10,000",
  STUDENTCLMO: "2,000",
  CREATORCLMO: "5,000",
  BUSINESSCLMO: "10,000",
  STUDENTCLYR: "2,000",
  CREATORCLYR: "5,000",
  BUSINESSCLYR: "10,000",
  INACTIVE: "0",
  ACTIVE: "500",
  PAUSED: "0",
  1: "5,000",
  2: "10,000",
};

const HeaderStudio = ({
  subData,
  totalCredits,
  isGenerating,
  setIsGenerating,
}: HeaderStudioProps) => {
  const [credits, setCredits] = useState(totalCredits);
  // Use planId instead of plan
  const basePlan = subData?.status ?? "FREE";

  const totalCreditsUpdate = async (userId: string) => {
    const data = await get11LabsPlanAndBoosterCredits(userId);
    setIsGenerating(false);
    return setCredits(data?.totalCredits ?? 0);
  };

  useEffect(() => {
    if (subData?.userId) {
      totalCreditsUpdate(subData.userId).catch((error) => {
        console.error("Error fetching credits:", error);
      });
    }
  }, [!!isGenerating]);

  const subtitle = (
    <>
      <p className="font-base mb-2 text-center">
        You've got a screenplay, book, news, podcast, table read… This is your
        home! Create long form, multiple actor voice overs below.
      </p>

      {/* Add credit information similar to ScriptAI component */}
      {subData ? (
        <div>
          <p className="font-base  text-center">
            On your current plan, <br />
            <span className="text-cp-primary font-semibold">
              {basePlan === "1" || basePlan === "2"
                ? `AppSumoTier ${basePlan}`
                : basePlan}
            </span>
            , you are entitled to{" "}
            <span className="text-cp-primary font-bold">
              {characters[basePlan]}
            </span>{" "}
            per script.
          </p>
          <p className="font-base  text-center">
            You have{" "}
            <span className="text-cp-primary font-bold">{credits}</span>{" "}
            characters left.
          </p>
          {/* <p className="font-base  text-center">
                  You have{" "}
                  <span className="text-cp-primary font-bold">{credits}</span>{" "}
                  characters left of{" "}
                  <span className="text-cp-primary font-bold">{totalCredits}</span>{" "}
                  total monthly characters.
                </p> */}
        </div>
      ) : (
        <p className="font-base mb-2 text-center">
          Log in to Script Timer and start creating now.
        </p>
      )}
    </>
  );

  return <PageHeader title="Multi-Voice Studio" subtitle={subtitle} />;
};

export default HeaderStudio;
