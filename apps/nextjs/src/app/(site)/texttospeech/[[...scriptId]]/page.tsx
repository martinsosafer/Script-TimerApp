import * as React from "react";
import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import { ScriptAI } from "./script-ai";

export const metadata: Metadata = {
  title: "Script Timer",
  description: "AI helping you find your voice.",
};

export default async function ScriptPage() {
  const session = await auth();
  const subData = session?.user.subscription;

  return (
    <>
      <ScriptAI subData={subData} />
    </>
  );
}
