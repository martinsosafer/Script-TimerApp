import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { set } from "zod";

import { Tooltip, TooltipContent, TooltipTrigger } from "@voiceai/ui";
import {
  IconMessageFull,
  IconPencilLine,
  IconSpinner,
  IconTrash,
} from "@voiceai/ui/@/components/ui/icons";

import Button from "~/app/(site)/components/button";
import { removeChat } from "~/app/actions/newChatActions";
import { roboto } from "~/app/fonts";
import type { Chat, ChatMessage } from "../../types";

interface ChatHistoryProps {
  chatHistory: Chat[];
  setMessages: (value: ChatMessage[]) => void;
  onClearChatHistory: () => void;
  setSelectedChatHistory: (arg: Chat | undefined) => void;
  setChatHistory: (value: Chat[]) => void;
  setIsEditingChatSubject: (arg: boolean) => void;
  openChatHistory: boolean;
  setOpenChatHistory: Dispatch<SetStateAction<boolean>>;
}

export default function ChatHistory({
  chatHistory,
  setMessages,
  onClearChatHistory,
  setSelectedChatHistory,
  setChatHistory,
  setIsEditingChatSubject,
  openChatHistory,
  setOpenChatHistory,
}: ChatHistoryProps) {
  const noChatHistory = chatHistory?.length === 0;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div
      className={`${roboto.className} bg-cp-primary-lightest absolute right-0 top-0 z-30 flex h-[733px] w-full ${openChatHistory ? "-translate-x-0" : "-translate-x-[120%]"}  transform flex-col rounded-lg p-6 transition-all duration-300 lg:static lg:z-0 lg:w-[276px] lg:-translate-x-0`}
    >
      <div className="flex h-full w-full flex-col justify-between">
        <>
          <p className="text-start text-lg font-bold text-white">
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
                      className="hover:bg-cp-primary-light group flex w-full justify-between px-[10px] py-3"
                    >
                      <div
                        className="flex cursor-pointer items-start justify-start gap-2"
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                          setSelectedChatHistory(item);
                          setMessages(item.messages);
                          setOpenChatHistory(false);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            setMessages(item.messages);
                          }
                        }}
                      >
                        <IconMessageFull className="text-cp-secondary-lightest h-[30px] w-[30px]" />

                        <p className="w-full text-base text-white">
                          {item.title}
                        </p>
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
                              <IconPencilLine className="invisible h-5 w-5 cursor-pointer text-white hover:text-white/50 group-hover:visible" />
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
                            <IconTrash className="invisible h-5 w-5 cursor-pointer text-white hover:text-white/50 group-hover:visible" />
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
          <Button
            label="Clear Chat History"
            icon={IconTrash}
            onClick={onClearChatHistory}
            type="custom"
            fit
            className="border-2 border-white bg-transparent text-white transition-all duration-300 hover:border-white/80 hover:text-white/80 hover:shadow-md disabled:cursor-default disabled:border-white/50 disabled:text-white/50"
            iconColor="#ffffff"
          />
        </div>
      </div>
    </div>
  );
}
