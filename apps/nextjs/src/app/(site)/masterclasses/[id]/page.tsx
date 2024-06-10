/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from "react";
import type { Metadata } from "next";

import { getSession } from "~/app/api/subscription/subscription";
import FreeModal from "../../components/free-modal";
import VideoPage from "../../components/masterclasses/videopage/videopage";

export const metadata: Metadata = {
  title: "Masterclasses",
  description: "Masterclasses and Courses",
};

export default async function ScriptPage({ searchParams }) {
  const session = await getSession();
  const subData = session?.subscription;

  return (
    <>
      <VideoPage searchParams={searchParams} />
      {/* <FreeModal subData={subData} /> */}
    </>
  );
}
