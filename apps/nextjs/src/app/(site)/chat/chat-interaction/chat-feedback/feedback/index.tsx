import type { ChatMessage } from "../../types";
import FeedbackInput from "./feedback-input";
import STMessage from "./sTMessage";
import UserMessage from "./userMessage";

export type Chat = ChatMessage[];

export interface FeedbackProps {
  chat: Chat;
  feedbackInput: string;
  setFeedbackInput: (value: string) => void;
  handleSubmit: (arg?: boolean) => void;
  loadingMessages: boolean;
}

function contentFormatter(data: string) {
  if (data.includes("\n")) {
    return data.split("\n");
  }
  return [data];
}

export default function Feedback({
  chat,
  feedbackInput,
  setFeedbackInput,
  handleSubmit,
  loadingMessages,
}: FeedbackProps) {
  return (
    <div className="flex h-[900px] w-[70%] flex-col justify-between gap-2">
      <div className="flex h-full w-full  flex-col items-start gap-6 overflow-y-auto rounded-md border border-gray-400 bg-white p-6">
        {chat.map((chatItem, idx) => {
          const formattedContent = contentFormatter(chatItem.content);
          return chatItem.role === "assistant" ? (
            <STMessage
              messageContent={formattedContent}
              key={`${chatItem.role}-${idx}`}
            />
          ) : (
            <UserMessage
              messageContent={formattedContent}
              key={`${chatItem.role}-${idx}`}
            />
          );
        })}
      </div>
      <FeedbackInput
        value={feedbackInput}
        onChange={setFeedbackInput}
        onSubmit={handleSubmit}
        loadingMessages={loadingMessages}
      />
    </div>
  );
}
