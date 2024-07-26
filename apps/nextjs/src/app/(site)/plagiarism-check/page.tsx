import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import Checker from "./checker";

export const metadata: Metadata = {
  title: "Pagiarism Check",
  description:
    "Identify potential plagiarism across nearly every language, detect AI-generated content.",
};

export default async function indexPage() {
  const session = await auth();

  return (
    <div>
      <Checker userId={session?.user.id} />
    </div>
  );
}
