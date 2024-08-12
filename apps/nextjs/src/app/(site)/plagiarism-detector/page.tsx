import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import Checker from "./checker";
import { getScans } from "./utils";

export const metadata: Metadata = {
  title: "Pagiarism Detector",
  description: "Identify potential plagiarism across nearly every language.",
};

export default async function indexPage() {
  const session = await auth();

  const scanHistory = await getScans(session?.user.id ?? "");

  return (
    <div className="flex w-full justify-center">
      <Checker userId={session?.user.id} scans={scanHistory} />
    </div>
  );
}
