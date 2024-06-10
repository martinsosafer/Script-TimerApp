import * as React from "react";
import type { Metadata } from "next";

import { getSession } from "~/app/api/subscription/subscription";
import { ScriptAI } from "./script-ai";
import FreeModal from "../../components/free-modal";

export const metadata: Metadata = {
  title: "Script Timer",
  description: "AI helping you find your voice.",
};

export default async function ScriptPage() {
  const session = await getSession();
  const subData = session?.subscription;

  return (
    <>
      <ScriptAI />
      <FreeModal subData={subData} />
    </>
  );
}
