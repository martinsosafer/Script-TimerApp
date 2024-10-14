import type { FormEvent } from "react";

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
    <div className="mt-14 w-full" id="chatFeedback">
      <p className="p-2 text-center text-lg font-semibold text-primary">
        I made this for you:
      </p>
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
