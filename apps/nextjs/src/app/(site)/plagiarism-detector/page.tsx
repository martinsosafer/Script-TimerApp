import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import PageHeader from "../components/page-header";
import { getCredits, getScans } from "./actions";
import Checker from "./checker";

export const metadata: Metadata = {
  title: "Plagiarism Detector",
  description: "Identify potential plagiarism across nearly every language.",
};

export default async function indexPage() {
  const session = await auth();
  const scanHistory = await getScans(session?.user.id ?? "");
  const credit = await getCredits(session?.user.id ?? "");

  return (
    <div className="flex w-full flex-col items-center">
      <PageHeader
        title="Plagiarism and Ai Detection"
        subtitle="Check plagiarism and detect possible AI-generated content"
      />
      <Checker
        userId={session?.user.id}
        scans={scanHistory}
        credits={credit?.credits ?? 0}
      />
    </div>
  );
}
