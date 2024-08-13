import * as React from "react";
import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import TranslatorPage from "./translator-components/translatorPage";

export const metadata: Metadata = {
  title: "Translator",
  description: "Translator bla bla bla not really inspire now ",
};

export default async function indexPage() {
  const session = await auth();
  const subData = session?.user.subscription;

  return (
    <div>
      <TranslatorPage subData={subData} />
    </div>
  );
}
