import type { Metadata } from "next";
import Image from "next/image";

import { ChatWindow } from "../../_components/ai/chat/chat-window";

export const metadata: Metadata = {
  title: "Music App",
  description: "Example music app using the components.",
};

export default function ChatPage() {
  return (
    <div className="w-full">
      <ChatWindow
        endpoint="/api/chat"
        emptyStateComponent={<>empty</>}
        placeholder="Hello, how can I help you today?"
        titleText="VoiceAI"
        emoji="🔊"
        // showIntermediateStepsToggle={true}
      ></ChatWindow>
    </div>
  );
}
