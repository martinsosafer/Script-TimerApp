import Image from "next/image";

import type { Chat, ChatMessage } from "../../types";

interface ChatHistoryProps {
  chatHistory: Chat[];
  setMessages: (value: ChatMessage[]) => void;
  onClearChatHistory: () => void;
  setSelectedChatHistory: (arg: Chat | undefined) => void;
}

export default function ChatHistory({
  chatHistory,
  setMessages,
  onClearChatHistory,
  setSelectedChatHistory,
}: ChatHistoryProps) {
  const noChatHistory = chatHistory?.length === 0;

  return (
    <div className="flex h-[900px] w-[30%] flex-col rounded-md border border-gray-400 bg-white p-4">
      <div className="flex h-full w-full flex-col justify-between">
        <>
          <p className="p-2 text-start text-lg font-semibold text-gray-900">
            Chat History
          </p>
          <div className="flex h-full w-full flex-col overflow-y-auto ">
            {chatHistory?.length === 0 ? (
              <p className="mt-4 text-center text-gray-500">
                Chat History Empty
              </p>
            ) : (
              <>
                {chatHistory.map((item: Chat) => {
                  return (
                    <div
                      key={`${item.id}`}
                      className="flex cursor-pointer items-start justify-start gap-4 p-2 hover:bg-gray-100"
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        setSelectedChatHistory(item);
                        setMessages(item.messages);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setMessages(item.messages);
                        }
                      }}
                    >
                      <Image
                        src="/icons/messageIcon.svg"
                        width={20}
                        height={20}
                        alt="feedback"
                        className="mt-1"
                      />
                      <p className="w-full">{item.title}</p>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </>
        <div className="flex h-[100px] w-full items-center justify-center pt-6">
          <button
            className={`flex w-full items-center justify-center gap-4 bg-gray-200 p-4 ${!noChatHistory && "hover:bg-gray-100"}`}
            disabled={noChatHistory}
            onClick={onClearChatHistory}
          >
            <Image
              src="/icons/trash.svg"
              width={20}
              height={20}
              alt="delete conversation"
            />
            <span>Clear Chat History</span>
          </button>
        </div>
      </div>
    </div>
  );
}
