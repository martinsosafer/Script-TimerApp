import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@voiceai/auth";

import ChatInteraction from "../components/chat/chat-interaction";
import WelcomeMessage from "../components/chat/welcome-message";

export const metadata: Metadata = {
  title: "Script Coach",
  description:
    "An Ai SUPERHERO, ‘model‘ designed to help you. I am specially made for presentations, speeches, videos, and can do much, much more.",
};

export default async function indexPage() {
  const session = await auth();
  const userId = session?.user.id ?? ""; // Ensure userId is always a string

  return (
    <div className="flex w-[1024px] flex-col items-center">
      <WelcomeMessage />
      <ChatInteraction userId={userId} />
      <Link
        className="mt-8 text-xl text-[#0066FF] hover:font-semibold"
        href={"/old-chat"}
      >
        Go to Old Chat Page -{">"}
      </Link>
    </div>
  );
}
