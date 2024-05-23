import type { Metadata } from "next";

import { nanoid } from "~/utils/helpers";
import ChatInteraction from "../components/chat/chat-interaction";
import WelcomeMessage from "../components/chat/welcome-message";

export const metadata: Metadata = {
  title: "Script Coach",
  description:
    "An Ai SUPERHERO, ‘model‘ designed to help you. I am specially made for presentations, speeches, videos, and can do much, much more.",
};

export default function indexPage() {
  const id = nanoid();

  return (
    <div className="flex w-[1024px] flex-col items-center">
      <WelcomeMessage />
      <ChatInteraction id={id} />
    </div>
  );
}
