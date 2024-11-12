import * as React from "react";
import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import PageHeader from "../components/page-header";
import MasterclasessLanding from "./masterclasses-landing";

export const metadata: Metadata = {
  title: "Masterclasses",
  description: "Masterclasses and Courses",
};

export default async function Page() {
  const session = await auth();
  const subData = session?.user.subscription;

  console.log("SESSION DANTAS", subData, session);

  const subtitle = (
    <span>
      <span>
        The best stories and structure connect you emotionally and inspire your
        audience.
      </span>
      <span>
        Join 70,000 people who have transformed their careers by presenting
        their best to an audience, when interviewing, creating ads, podcasts,
        and videos.
      </span>
      <span>
        Learn the specific story frameworks inside great stories. Transform your
        career like those who have created over $100,000,000 in new revenue
      </span>
      <span>
        Watch the preview for the first 5 courses included in your business
        membership, with more coming.
      </span>
    </span>
  );

  return (
    <>
      <PageHeader title="Why take Masterclasses?" subtitle={subtitle} />
      <MasterclasessLanding subData={subData} />
    </>
  );
}
