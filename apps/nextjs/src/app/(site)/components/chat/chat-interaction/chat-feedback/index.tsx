import type { ChatMessage } from "../types";
import ChatHistory from "./chat-history";
import Feedback from "./feedback";

interface ChatFeedbackProps {
  chat: ChatMessage[];
  chatHistory: object[];
  feedbackInput: string;
  setFeedbackInput: (value: string) => void;
  setMessages: (value: ChatMessage[]) => void;
  handleSubmit: (arg?: boolean) => void;
  setIsDeletingHistory: (arg: boolean) => void;
  loadingMessages: boolean;
}

export default function ChatFeedback({
  chat,
  chatHistory,
  feedbackInput,
  setFeedbackInput,
  setMessages,
  handleSubmit,
  setIsDeletingHistory,
  loadingMessages,
}: ChatFeedbackProps) {
  return (
    <div className="mt-14 w-full">
      <p className="p-2 text-center text-lg font-semibold text-primary">
        I made this for you:
      </p>
      <div className="mt-4 flex gap-3">
        <ChatHistory
          chatHistory={chatHistory}
          setMessages={setMessages}
          onClearChatHistory={() => setIsDeletingHistory(true)}
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
