import * as React from "react";
import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import PageHeader from "../components/page-header";
import { getImgCredits } from "./actions";
import ImageGenerator from "./image-generator";

export const metadata: Metadata = {
  title: "Image Generator",
  description: "Create your own storyboards.",
};

export default async function indexPage() {
  const session = await auth();
  const userId = session?.user.id;
  const credits = await getImgCredits(userId ?? "");

  return (
    <div className="flex flex-col items-center">
      <PageHeader
        title="I am your Image Generator"
        subtitle="I am specially designed for storyboards, but you can create any image you like"
      />
      <ImageGenerator credits={credits ?? 0} userId={userId} />
    </div>
  );
}
