import { useEffect, useRef } from "react";
import type { FormEvent } from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@voiceai/ui";
import { IconCopy } from "@voiceai/ui/@/components/ui/icons";
import { toast } from "@voiceai/ui/@/components/ui/toast";

import type { ChatMessage } from "../../types";
import FeedbackInput from "./feedback-input";
import STMessage from "./sTMessage";
import UserMessage from "./userMessage";

export type Chat = ChatMessage[];

export interface FeedbackProps {
  chat: Chat;
  feedbackInput: string | undefined;
  setFeedbackInput: (value: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
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
  const filteredChats = chat.filter((chatItem) => chatItem.role !== "system");

  const messageEnd = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messageEnd.current?.scrollTo({
      top: messageEnd.current?.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [filteredChats]);

  return (
    <div className="relative z-20 flex w-full flex-col justify-between gap-2 lg:w-[656px]">
      {chat.length > 0 && (
        <Tooltip>
          <TooltipTrigger asChild className="mb-17">
            <button
              className="absolute -top-8 right-2 h-6 w-6"
              onClick={() => {
                void window.navigator.clipboard.writeText(
                  filteredChats.map((chatItem) => chatItem.content).join("\n"),
                );
                toast({
                  title: "Copied to clipboard",
                  description:
                    "The conversation has been copied to the clipboard",
                });
              }}
            >
              <IconCopy className="h-6 w-6 text-primary hover:text-blue-400" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            Copy the conversation to the clipboard
          </TooltipContent>
        </Tooltip>
      )}

      <div
        className="flex h-[624px] w-full flex-col items-start gap-6 overflow-y-auto rounded-lg bg-white p-2 lg:p-6"
        ref={messageEnd}
      >
        {filteredChats.map((chatItem, idx) => {
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
        isDisabled={chat.length === 0 && !feedbackInput}
      />
    </div>
  );
}
