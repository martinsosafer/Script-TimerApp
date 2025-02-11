import * as React from "react";
import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import {getOpenAiCredits} from "../chat/actions";
import PageHeader from "../components/page-header";
import TextTranslatorPage from "./translatetext-component/ttranslatepage";

export const metadata: Metadata = {
  title: "Translator",
  description: "TranslateText ",
};

export default async function indexPage() {
  const session = await auth();
  const subData = session?.user.subscription;
  const openAiCredits = getOpenAiCredits(subData?.userId ?? "");

  return (
    <div>
      <PageHeader
        title="Let's Translate"
        subtitle="Using Script Timer AI, you can translate text
into multiple languages "
      />
      <TextTranslatorPage subData={subData} openAiCredits={openAiCredits} />
    </div>
  );
}
