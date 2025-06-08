import { useState } from "react";

import { Button } from "@voiceai/ui";

import type { SubData } from "../../boosters/types";
import BoostersModal from "../../components/modals/boosters-modal";
import { displayData } from "./utils";

interface CreditRowProps {
  subscription:
    | "FREE"
    | "FREE_TRIAL"
    | "STUDENT"
    | "CREATOR"
    | "BUSINESS"
    | "STUDENTCLMO"
    | "CREATORCLMO"
    | "BUSINESSCLMO"
    | "STUDENTCLYR"
    | "CREATORCLYR"
    | "BUSINESSCLYR"
    | "INACTIVE"
    | "ACTIVE"
    | "PAUSED"
    | "1"
    | "2";
  type: "cl_credit" | "11labs_credit" | "img_credit" | "openai_credit";
  creditsLeft: number;
  subData: SubData;
  allCredits?: {
    totalCredits: number;
    planCredits: number;
    boosterCredits: number;
  };
}

export default function CreditRow({
  subscription,
  type,
  creditsLeft,
  subData,
  allCredits,
}: CreditRowProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isBoostersModalOpen, setIsBoostersModalOpen] = useState(false);

  const subscriptionData = displayData[subscription];
  if (!subscriptionData?.[type]) {
    console.error(`Invalid subscription or type: ${subscription}, ${type}`);
    return null; // Or handle the error appropriately
  }

  const { label } = subscriptionData[type];

  // const { label, credits } = subscriptionData[type];
  // const creditsUsed = credits - creditsLeft;
  // const displayedCreditsUsed =
  //   type === "cl_credit" ? creditsUsed * 250 : creditsUsed;

  const handleType = (type: CreditRowProps["type"]) => {
    if (type === "cl_credit") return "PLAGIARISM";
    if (type === "11labs_credit") return "VOICES";
    if (type === "img_credit") return "IMAGES";
    if (type === "openai_credit") return "MASTERCLASS";
  };

  const handleCreditsLeft = (type: CreditRowProps["type"]) => {
    if (type === "11labs_credit") {
      return allCredits?.totalCredits;
    }
    if (type === "img_credit") {
      return allCredits?.totalCredits;
    }
    // Multiply creditsLeft by 250 if type is "cl_credit"
    if (type === "cl_credit") {
      return creditsLeft * 250;
    }
    return creditsLeft;
  };

  return (
    <>
      <div className="flex w-full flex-col items-center justify-between gap-3 px-5 py-2 md:flex-row md:items-end md:gap-5 md:px-12">
        {/* <div className="flex flex-col">
          <span className="px-2 text-xs text-gray-400">
            {label} credits used
          </span>
          <div className="flex h-[40px] w-[280px] items-center rounded-lg border border-gray-400 p-4 text-gray-500">
            {displayedCreditsUsed}
          </div>
        </div> */}

        <div className="flex w-full flex-col md:w-[50%]">
          <span className="px-2 text-xs text-gray-400">
            {label} credits remaining
          </span>
          <div className="flex h-[40px] items-center rounded-lg border border-gray-400 p-4 text-gray-500">
            {handleCreditsLeft(type)}
          </div>
        </div>

        {type !== "cl_credit" && type !== "openai_credit" ? (
          <Button
            className="bg-cp-secondary-light hover:bg-cp-secondary h-10 w-full text-base md:w-[50%]"
            disabled={subscription === "FREE" || subscription == "FREE_TRIAL"}
            onClick={() => setIsBoostersModalOpen(true)}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span className="ml-2">Adding...</span>
              </div>
            ) : (
              "Add Booster"
            )}
          </Button>
        ) : (
          <div className="w-[50%]" />
        )}
      </div>

      {isBoostersModalOpen && (
        <BoostersModal
          type={handleType(type)!}
          subData={subData}
          setIsBoostersModalOpen={setIsBoostersModalOpen}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </>
  );
}
