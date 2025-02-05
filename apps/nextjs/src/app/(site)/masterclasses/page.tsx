import * as React from "react";
import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import MasterclasessLanding from "./masterclasses-landing";

export const metadata: Metadata = {
  title: "Masterclasses",
  description: "Masterclasses and Courses",
};

export default async function Page() {
  const session = await auth();
  const subData = session?.user.subscription;

 

  return (
    <>
      <MasterclasessLanding subData={subData} />
    </>
  );
}
