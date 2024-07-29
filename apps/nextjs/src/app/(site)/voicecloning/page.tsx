import * as React from "react";
import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import VoiceCloningPage from "./vcloning-components/vcloningPage";

export const metadata: Metadata = {
  title: "VoiceCLoning",
  description: "Translator bla bla bla not really inspire now ",
};

export default async function indexPage() {
  const session = await auth();
  const userId = session?.user.id;

  return (
    <div>
      <VoiceCloningPage />
    </div>
  );
}
