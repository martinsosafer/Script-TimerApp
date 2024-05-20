import type { Metadata } from "next";

import { nanoid } from "~/utils/helpers";
import { Chat } from "../components/chat/chat";
import PromptsSelector from "../components/chat/promptSelector";
import WelcomeMessage from "../components/chat/welcome-message";

export const metadata: Metadata = {
  title: "Script Coach",
  description: "Example music app using the components.",
};

export default function indexPage() {
  const id = nanoid();

  return (
    <div className="flex w-[1024px] flex-col items-center">
      <WelcomeMessage />
      <PromptsSelector />
      <Chat id={id} />
    </div>
  );
}
