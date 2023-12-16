import type { Metadata } from "next";

import { Chat } from "../components/chat/chat";

export const metadata: Metadata = {
  title: "Script Coach",
  description: "Example music app using the components.",
};

export default function ChatPage() {
  return (
    <div className="w-full">
      <Chat />
    </div>
  );
}
