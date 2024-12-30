import type { FormEvent } from "react";
import Image from "next/image";

import type { Chat, ChatMessage } from "../types";
import ChatHistory from "./chat-history";
import Feedback from "./feedback";

interface ChatFeedbackProps {
  chat: ChatMessage[];
  chatHistory: Chat[];
  feedbackInput: string | undefined;
  setFeedbackInput: (value: string) => void;
  setMessages: (value: ChatMessage[]) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setIsDeletingHistory: (arg: boolean) => void;
  setSelectedChatHistory: (arg: Chat | undefined) => void;
  loadingMessages: boolean;
  setChatHistory: (value: Chat[]) => void;
  setIsEditingChatSubject: (arg: boolean) => void;
}

export default function ChatFeedback({
  chat,
  chatHistory,
  feedbackInput,
  setFeedbackInput,
  setMessages,
  handleSubmit,
  setIsDeletingHistory,
  setSelectedChatHistory,
  loadingMessages,
  setChatHistory,
  setIsEditingChatSubject,
}: ChatFeedbackProps) {
  return (
    <div className="mt-[148px] w-full" id="chatFeedback">
      <div className="relative -top-14 left-[254px]">
        <div className="absolute h-[152px] w-[98px]">
          <Image src="/bot.png" alt="bot" fill />
        </div>
        {chat && chat.length > 0 && (
          <div className="absolute -top-2 left-[86px] h-[54px] w-[113px]">
            <Image src="/made_this_for_you.png" alt="message bubble" fill />
          </div>
        )}
      </div>
      <div className="mt-4 flex gap-3">
        <ChatHistory
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
          setMessages={setMessages}
          onClearChatHistory={() => setIsDeletingHistory(true)}
          setSelectedChatHistory={setSelectedChatHistory}
          setIsEditingChatSubject={setIsEditingChatSubject}
        />
        <Feedback
          chat={chat}
          feedbackInput={feedbackInput}
          setFeedbackInput={setFeedbackInput}
          handleSubmit={handleSubmit}
          loadingMessages={loadingMessages}
        />
      </div>
    </div>
  );
}
