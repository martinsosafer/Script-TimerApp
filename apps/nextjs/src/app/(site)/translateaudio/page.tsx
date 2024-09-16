import * as React from "react";
import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import getOpenAiCredits from "../chat/actions";
import AudioTranslatorPage from "./audiotranslate";

export const metadata: Metadata = {
  title: "Translator",
  description: "Translate Audio ",
};

export default async function indexPage() {
  const session = await auth();
  const subData = session?.user.subscription;
  const openAiCredits = getOpenAiCredits(subData?.userId ?? "");

  return (
    <div>
      <AudioTranslatorPage subData={subData} openAiCredits={openAiCredits} />
    </div>
  );
}
