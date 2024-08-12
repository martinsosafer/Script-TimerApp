import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import AiChecker from "./checker";

export const metadata: Metadata = {
  title: "Ai Detector",
  description: "Identify potential AI-generated content.",
};

export default async function indexPage() {
  const session = await auth();
  return (
    <div className="flex w-full justify-center">
      <AiChecker userId={session?.user.id} />
    </div>
  );
}
