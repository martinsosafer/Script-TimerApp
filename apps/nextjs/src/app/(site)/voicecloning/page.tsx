import * as React from "react";
import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import VoiceCloningPage from "./vcloning-components/vcloningPage";

export const metadata: Metadata = {
  title: "VoiceCloning",
  description: "Clone your voice here ",
};

export default async function indexPage() {
  const session = await auth();
  const subData = session?.user.subscription;

  return (
    <div>
      <VoiceCloningPage subData={subData} />
    </div>
  );
}
