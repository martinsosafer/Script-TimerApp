// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import type { Message } from "ai";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { cn } from "../../lib/utils";
import { ChatMessageActions } from "./chat-message-actions";
import { CodeBlock } from "./codeblock";
import { IconOpenAI, IconUser } from "./icons";
import { MemoizedReactMarkdown } from "./markdown";

export interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  return (
    <div
      className={cn("group relative mb-4 flex items-start md:-ml-12")}
      {...props}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow",
          message.role === "user"
            ? "bg-background"
            : "bg-primary text-primary-foreground",
        )}
      >
        {message.role === "user" ? <IconUser /> : <IconOpenAI />}
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        <MemoizedReactMarkdown
          className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return (
                <p className="mb-2 last:mb-0">
                  {children}
                  {message.role === "assistant" && isFirstMessage && (
                    <>
                      <br />
                      <span className="mt-8  text-xs text-muted-foreground">
                        If you like this script, CLICK COPY, then paste it in
                        the{" "}
                        <Link href="/texttospeech">
                          <span className="cursor-pointer underline">
                            TEXT to SPEECH
                          </span>
                        </Link>{" "}
                        page and choose your favorite voice actor.
                      </span>
                      {setIsFirstMessage(false)}{" "}
                      {/* Update isFirstMessage to false */}
                    </>
                  )}
                </p>
              );
            },
            code(props) {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <CodeBlock
                  key={Math.random()}
                  language={match?.[1] || ""}
                  value={String(children).replace(/\n$/, "")}
                  {...props}
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {message.content}
        </MemoizedReactMarkdown>
        <ChatMessageActions message={message} />
      </div>
    </div>
  );
}
