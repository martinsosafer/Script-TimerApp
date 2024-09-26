import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import Recorder from "./recorder";

export const metadata: Metadata = {
  title: "Recording Area",
  description: "Record audio, video or your screen",
};

export default async function indexPage() {
  const session = await auth();

  return (
    <div className="flex min-h-screen w-full items-center ">
      <Recorder />
    </div>
  );
}
