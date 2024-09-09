import * as React from "react";
import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import { getCredits } from "./actions";
import ImageGenerator from "./image-generator";

export const metadata: Metadata = {
  title: "Image Generator",
  description: "Create your own storyboards.",
};

export default async function indexPage() {
  const session = await auth();
  const userId = session?.user.id;
  const credits = await getCredits(userId ?? "");

  return (
    <div className="flex justify-center">
      <ImageGenerator credits={credits?.credits ?? 0} userId={userId} />
    </div>
  );
}
