import ChatHistory from "./chat-history";
import Feedback from "./feedback";
import type { FeedbackProps } from "./feedback";

interface ChatFeedbackProps {
  userId: string;
  chat: FeedbackProps;
  feedbackInput: string;
  setFeedbackInput: (value: string) => void;
  handleSubmit: (arg?: boolean) => void;
}

export default function ChatFeedback({
  userId,
  chat,
  feedbackInput,
  setFeedbackInput,
  handleSubmit,
}: ChatFeedbackProps) {
  return (
    <div className="mt-14 w-full">
      <p className="p-2 text-center text-lg font-semibold text-gray-900">
        I made this for you.
      </p>
      <div className="mt-4 flex gap-3">
        <ChatHistory userId={userId} />
        <Feedback
          chat={chat}
          feedbackInput={feedbackInput}
          setFeedbackInput={setFeedbackInput}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
