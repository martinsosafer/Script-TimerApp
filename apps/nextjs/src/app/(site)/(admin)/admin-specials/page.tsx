import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import SpecialDashboard from "./specials-dashboard";

export const metadata: Metadata = {
  title: "Script Timer",
  description: "Welcome to Script Timer",
};

export default async function PromptsAdmin() {
  const userData = await auth();
  const userId = userData?.user.id ?? "";

  const allowedIds = [
    "b76a1726-e72e-43ca-b250-840af61dfdfe",
    "59d42d74-5b5a-4b52-aedb-8bcb8f076381",
    "a2b976c5-977d-41f3-8152-3ff7eec41f11",
    "abf2ceef-2864-4506-80ac-c4452023f003",
  ];

  if (!userId || !allowedIds.includes(userId)) {
    return <div> Unauthorized</div>;
  }

  return (
    <div className="flex w-full justify-center">
      <SpecialDashboard />
    </div>
  );
}
