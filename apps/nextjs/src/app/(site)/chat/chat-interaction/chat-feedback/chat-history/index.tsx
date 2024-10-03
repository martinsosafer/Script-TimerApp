import { useState } from "react";
import Image from "next/image";

import { Tooltip, TooltipContent, TooltipTrigger } from "@voiceai/ui";
import {
  IconPencilLine,
  IconSpinner,
  IconTrash,
} from "@voiceai/ui/@/components/ui/icons";

import { removeChat } from "~/app/actions/newChatActions";
import type { Chat, ChatMessage } from "../../types";

interface ChatHistoryProps {
  chatHistory: Chat[];
  setMessages: (value: ChatMessage[]) => void;
  onClearChatHistory: () => void;
  setSelectedChatHistory: (arg: Chat | undefined) => void;
  setChatHistory: (value: Chat[]) => void;
  setIsEditingChatSubject: (arg: boolean) => void;
}

export default function ChatHistory({
  chatHistory,
  setMessages,
  onClearChatHistory,
  setSelectedChatHistory,
  setChatHistory,
  setIsEditingChatSubject,
}: ChatHistoryProps) {
  const noChatHistory = chatHistory?.length === 0;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="flex h-[900px] w-[30%] flex-col rounded-md border border-gray-400 bg-white p-4">
      <div className="flex h-full w-full flex-col justify-between">
        <>
          <p className="p-2 text-start text-lg font-semibold text-gray-900">
            Your recent scripts.
          </p>
          <div className="flex h-full w-full flex-col overflow-y-auto ">
            {chatHistory?.length === 0 ? (
              <p className="mt-4 text-center text-gray-500">
                Recent script history is empty.
              </p>
            ) : (
              <>
                {chatHistory.map((item: Chat) => {
                  return (
                    <div
                      key={`${item.id}`}
                      className="group flex w-full items-center justify-between hover:bg-gray-100"
                    >
                      <div
                        className="flex cursor-pointer items-start justify-start gap-4 p-2 "
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
                      <div className="flex gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild className="mb-17">
                            <button
                              className="flex h-6 w-6 items-center justify-center"
                              onClick={() => {
                                setIsEditingChatSubject(true);
                                setSelectedChatHistory(item);
                              }}
                            >
                              <IconPencilLine className="invisible h-5 w-5 cursor-pointer text-green-800 hover:text-green-400 group-hover:visible" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            Add or edit the name/title.
                          </TooltipContent>
                        </Tooltip>

                        <button
                          className="flex h-6 w-6 items-center justify-center"
                          onClick={async () => {
                            setIsLoading(true);
                            await removeChat({ id: item.id });
                            const newChatHistory = chatHistory.filter(
                              (chat) => chat.id !== item.id,
                            );
                            setChatHistory(newChatHistory);
                            setIsLoading(false);
                            setMessages([]);
                          }}
                        >
                          {isLoading ? (
                            <IconSpinner className="invisible h-5 w-5 animate-spin group-hover:visible" />
                          ) : (
                            <IconTrash className="invisible h-5 w-5 cursor-pointer text-[#FF0000] hover:text-red-400 group-hover:visible" />
                          )}
                        </button>
                      </div>
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
