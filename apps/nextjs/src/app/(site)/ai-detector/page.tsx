import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import PageHeader from "../components/page-header";
import { getClCredits } from "../plagiarism-detector/actions";
import AiChecker from "./checker";

export const metadata: Metadata = {
  title: "Ai Detector",
  description: "Identify potential AI-generated content.",
};

export default async function indexPage() {
  const session = await auth();
  const credits = await getClCredits(session?.user.id ?? "");

  return (
    <div className="flex w-full flex-col items-center">
      <PageHeader
        title="Plagiarism and Ai Detection"
        subtitle="Check plagiarism and detect possible AI-generated content"
      />

      <AiChecker userId={session?.user.id} credits={credits ?? 0} />
    </div>
  );
}
