import * as React from "react";
import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import ImageGenerator from "./image-generator";

export const metadata: Metadata = {
  title: "Image Generator",
  description: "Create your own storyboards.",
};

export default async function indexPage() {
  const session = await auth();
  const userId = session?.user.id;

  return (
    <div className="flex justify-center">
      <ImageGenerator />
    </div>
  );
}
