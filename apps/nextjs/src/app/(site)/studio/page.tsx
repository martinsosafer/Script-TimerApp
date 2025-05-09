import * as React from "react";
import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import PageHeader from "../components/page-header";
import MultiActorPage from "./multiactorpage";
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
  title: "Studio",
  description: "do some stuff here",
};

export default async function IndexPage() {
  const session = await auth();
  const subData = session?.user.subscription;
  console.log("subdata", subData);

  // Use planId instead of plan
  const basePlan = subData?.status ?? "FREE";

  const subtitle = (
    <>
      <div>
        <p className="font-base mb-2 text-center">
          You’ve got a screenplay, book, news, podcast, table read… This is your
          home!  Create long form, multiple actor voice overs below
        </p>
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
