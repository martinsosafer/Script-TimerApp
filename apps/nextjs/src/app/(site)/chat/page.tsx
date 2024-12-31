import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import PageHeader from "../components/page-header";
import { getAllPrompts, getOpenAiCredits } from "./actions";
import ChatInteraction from "./chat-interaction";

export const metadata: Metadata = {
  title: "Script Coach",
  description:
    "An Ai SUPERHERO, ‘model‘ designed to help you. I am specially made for presentations, speeches, videos, and can do much, much more.",
};

export default async function indexPage() {
  const session = await auth();
  const userId = session?.user.id; // Ensure userId is always a string
  const openAiCredits = await getOpenAiCredits(userId ?? "");
  const prompts = await getAllPrompts();

  const subtitle = (
    <span className="flex flex-col items-center">
      <span>An Ai SUPERHERO, ‘model‘ designed to help you.</span>
      <span>
        I am specially made for presentations, speeches, videos, and can do
        much, much more.
      </span>
    </span>
  );

  return (
    <div className="flex w-full flex-col items-center p-6 lg:w-[1024px] lg:p-10">
      <PageHeader title="I am your Script Coach" subtitle={subtitle} />
      <ChatInteraction
        userId={userId}
        openAiCredits={openAiCredits}
        prompts={prompts}
      />
    </div>
  );
}
