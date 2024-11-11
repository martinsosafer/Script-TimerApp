import * as React from "react";
import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import PageHeader from "../components/page-header";
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
      <PageHeader
        title="Voice Cloning"
        subtitle="You can add your own voices by recording or
uploading sound files below."
      />
      <VoiceCloningPage subData={subData} />
    </div>
  );
}
