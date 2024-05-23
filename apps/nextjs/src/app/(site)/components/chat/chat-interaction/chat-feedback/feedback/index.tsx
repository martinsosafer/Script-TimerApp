import FeedbackInput from "./feedback-input";
import STMessage from "./sTMessage";
import UserMessage from "./userMessage";

interface ChatItems {
  message: { content: string; role: "user" | "assistant" | "system" };
}

export type Chat = ChatItems[];

export interface FeedbackProps {
  chat: Chat;
  feedbackInput: string;
  setFeedbackInput: (value: string) => void;
  handleSubmit: (arg?: boolean) => void;
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
}: FeedbackProps) {
  return (
    <div className="flex w-[70%] flex-col gap-2">
      <div className="flex h-[800px] w-full  flex-col items-start gap-6 overflow-y-auto rounded-md border border-gray-400 bg-white p-6">
        {chat.map((chatItem, idx) => {
          const formattedContent = contentFormatter(chatItem.message.content);
          return chatItem.message.role === "assistant" ? (
            <STMessage
              messageContent={formattedContent}
              key={`${chatItem.message.role}-${idx}`}
            />
          ) : (
            <UserMessage
              messageContent={formattedContent}
              key={`${chatItem.message.role}-${idx}`}
            />
          );
        })}
      </div>
      <FeedbackInput
        value={feedbackInput}
        onChange={setFeedbackInput}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
