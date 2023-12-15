"use client";

import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactElement } from "react";
import { useChat } from "ai/react";
import type { Message } from "ai/react";

import { Button } from "@voiceai/ui/@/components/ui/button";
import { Card, CardContent } from "@voiceai/ui/@/components/ui/card";
import { Input } from "@voiceai/ui/@/components/ui/input";

export function ChatMessageBubble(props: {
  message: Message;
  aiEmoji?: string;
}) {
  const colorClassName =
    props.message.role === "user" ? "bg-slate-500" : "bg-slate-50 text-black";
  const alignmentClassName =
    props.message.role === "user" ? "ml-auto" : "mr-auto";
  const prefix = props.message.role === "user" ? "🧑" : props.aiEmoji;
  return (
    <Card
      className={`${alignmentClassName} ${colorClassName} mb-8 flex max-w-lg rounded px-4 py-2`}
    >
      <CardContent className="space-x-4 p-4">
        <div className="flex flex-grow flex-col">
          <p className="overflow-hidden whitespace-normal break-words text-sm font-medium leading-none">
            {props.message.content}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function ChatWindow(props: {
  endpoint: string;
  emptyStateComponent: ReactElement;
  placeholder?: string;
  titleText?: string;
  emoji?: string;
  showIngestForm?: boolean;
  showIntermediateStepsToggle?: boolean;
}) {
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  const {
    endpoint,
    emptyStateComponent,
    placeholder,
    titleText = "An LLM",
    showIntermediateStepsToggle,
    emoji,
  } = props;

  const [showIntermediateSteps, setShowIntermediateSteps] = useState(false);
  const [intermediateStepsLoading, setIntermediateStepsLoading] =
    useState(false);

  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading: chatEndpointIsLoading,
    setMessages,
  } = useChat({
    api: endpoint,
    onError: (e) => {
      toast(e.message, {
        theme: "dark",
      });
    },
  });

  useEffect(() => {
    // Scroll the message container to the bottom when new messages come in
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  async function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (messageContainerRef.current) {
      messageContainerRef.current.classList.add("grow");
    }

    if (!messages.length) {
      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    if (chatEndpointIsLoading ?? intermediateStepsLoading) {
      return;
    }

    if (!showIntermediateSteps) {
      handleSubmit(e);
    } else {
      setIntermediateStepsLoading(true);
      setInput("");
      const messagesWithUserReply = messages.concat({
        id: messages.length.toString(),
        content: input,
        role: "user",
      });
      setMessages(messagesWithUserReply);

      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({
          messages: messagesWithUserReply,
          show_intermediate_steps: true,
        }),
      });

      const json = await response.json();
      setIntermediateStepsLoading(false);

      if (response.status === 200) {
        const newMessages = messagesWithUserReply;
        setMessages([
          ...newMessages,
          {
            id: newMessages.length.toString(),
            content: json.output,
            role: "assistant",
          },
        ]);
      } else {
        if (json.error) {
          console.log(json.error);
          toast(json.error, {
            theme: "dark",
          });
          throw new Error(json.error);
        }
      }
    }
  }

  return (
    <div className="flex max-h-[500px] min-h-[250px] flex-grow flex-col items-center overflow-hidden rounded-xl border p-8 md:min-h-[600px]">
      <div
        className="flex w-full flex-grow flex-col-reverse overflow-auto transition-[flex-grow] ease-in-out"
        ref={messageContainerRef}
      >
        {messages.length > 0 &&
          [...messages]
            .reverse()
            .map((m) =>
              m.role === "system" ? (
                <div key={m.id}></div>
              ) : (
                <ChatMessageBubble
                  key={m.id}
                  message={m}
                  aiEmoji={emoji}
                ></ChatMessageBubble>
              ),
            )}
      </div>

      <form
        onSubmit={sendMessage}
        className="mb-4 mt-6 flex w-full flex-col text-black"
      >
        <div className="flex sm:justify-evenly">
          <Input
            value={input}
            placeholder={placeholder ?? "What's it like to be a pirate?"}
            onChange={handleInputChange}
            className="w-9/12"
          />
          <Button
            type="submit"
            className="ml-1 bg-blue-700 hover:bg-blue-700 sm:m-0"
          >
            <div
              role="status"
              className={`${
                chatEndpointIsLoading || intermediateStepsLoading
                  ? ""
                  : "hidden"
              } ml-1 flex justify-center `}
            >
              <svg
                aria-hidden="true"
                className="h-6 w-6 animate-spin fill-sky-800 text-white dark:text-white"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* ... (your loading SVG) */}
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
            <span
              className={
                chatEndpointIsLoading || intermediateStepsLoading
                  ? "hidden"
                  : ""
              }
            >
              Send
            </span>
          </Button>
        </div>
      </form>

      {/* {messages.length === 0 && emptyStateComponent} */}

      <ToastContainer />
    </div>
  );
}
