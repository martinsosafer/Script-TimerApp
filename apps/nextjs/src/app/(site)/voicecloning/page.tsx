import * as React from "react";
import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import PageHeader from "../components/page-header";
import VoiceCloningPage from "./vcloning-components/vcloningPage";

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

  // Define customVoiceLimit based on the basePlan
  const customVoiceLimit = ["CREATOR", "CREATORCLMO", "CREATORCLYR"].includes(
    basePlan,
  )
    ? 3
    : ["BUSINESS", "BUSINESSCLMO", "BUSINESSCLYR"].includes(basePlan)
      ? 5
      : 0;

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
              <span className="text-cp-primary font-semibold">{basePlan}</span>{" "}
              user, you can create up to
              <span className="text-cp-primary font-bold">
                {" "}
                {customVoiceLimit}{" "}
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
