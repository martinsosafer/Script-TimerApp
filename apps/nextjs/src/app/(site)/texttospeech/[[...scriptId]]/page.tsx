import * as React from "react";
import type { Metadata } from "next";

import { getSession } from "~/app/api/subscription/subscription";
import FreeModal from "../../components/free-modal";
import { ScriptAI } from "./script-ai";

export const metadata: Metadata = {
  title: "Script Timer",
  description: "AI helping you find your voice.",
};

export default async function ScriptPage() {
  const session = await getSession();
  const subData = session?.subscription;

  return (
    <>
      <ScriptAI subData={subData} />
      <FreeModal subData={subData} />
    </>
  );
}
