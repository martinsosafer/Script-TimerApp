import * as React from "react";
import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import PageHeader from "../components/page-header";
import VoiceCloningPage from "./vcloning-components/vcloningPage";

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
  title: "VoiceCloning",
  description: "Clone your voice here",
};

export default async function IndexPage() {
  const session = await auth();
  const subData = session?.user.subscription;
  console.log("subdata", subData);

  // Use planId instead of plan
  const basePlan = subData?.status ?? "FREE";

  const subtitle = (
    <>
      {subData?.status ? (
        <div>
          <p className="font-base mb-2 text-center">
            You can add your own voices by recording or uploading sound files
            below.
          </p>
          {basePlan !== "FREE" && (
            <p className="font-base mb-2 text-center">
              As a{" "}
              <span className="text-cp-primary font-semibold">
                {basePlan === "1" || basePlan === "2"
                  ? `Tier ${basePlan} user`
                  : basePlan}
              </span>{" "}
              user, you can create up to
              <span className="text-cp-primary font-bold">
                {" "}
                {voicesAmount[basePlan]}{" "}
              </span>{" "}
              cloned voices.
            </p>
          )}
        </div>
      ) : (
        <div className="flex flex-col">
          <p className="font-base text-center">
            This is where you choose and create your voice overs.
          </p>
          <p className="font-base mb-2 text-center">
            Log in to Script Timer and start creating now.
          </p>
        </div>
      )}
    </>
  );

  return (
    <div>
      <PageHeader title="Voice Cloning" subtitle={subtitle} />
      <VoiceCloningPage subData={subData} />
    </div>
  );
}
