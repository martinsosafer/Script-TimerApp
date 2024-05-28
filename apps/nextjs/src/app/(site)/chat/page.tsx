import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import ChatInteraction from "../components/chat/chat-interaction";
// import GoToOldChat from "../components/chat/go-to-old-chat";
import WelcomeMessage from "../components/chat/welcome-message";

export const metadata: Metadata = {
  title: "Script Coach",
  description:
    "An Ai SUPERHERO, ‘model‘ designed to help you. I am specially made for presentations, speeches, videos, and can do much, much more.",
};

async function getPlan(userId: string) {
  const response = await fetch(`/api/plans?userId=${userId}`);
  const plan = await response.json();
  console.log("plan", plan);
  return plan;
}

export default async function indexPage() {
  const session = await auth();
  const userId = session?.user.id ?? ""; // Ensure userId is always a string

  const plan = await getPlan(userId);
  console.log("Client Side Plan", plan);

  return (
    <div className="flex w-[1024px] flex-col items-center">
      <WelcomeMessage />
      <ChatInteraction userId={userId} />
      {/* <GoToOldChat /> */}
    </div>
  );
}
