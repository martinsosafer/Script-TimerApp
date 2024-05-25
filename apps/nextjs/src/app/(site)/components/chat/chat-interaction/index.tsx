"use client";

import { useEffect, useState } from "react";

import type { Prompt } from "~/app/(site)/data/chat-prompts/types";
import ChatFeedback from "./chat-feedback";
import PromptInput from "./prompt-input";
import Prompter from "./prompter";
import PromptsSelector from "./promptSelector";

export default function ChatInteraction({ userId }: { userId: string }) {
  const [selectedCard, setSelectedCard] = useState<Prompt | undefined>();
  const [promptInput, setPromptInput] = useState<string>("");
  const [messages, setMessages] = useState<object[]>([]);

  const [feedbackInput, setFeedbackInput] = useState<string>("");

  const [assistansResponse, setAssistantsResponse] = useState<object>({});

  useEffect(() => {
    setPromptInput("");
    setMessages([]);
    setFeedbackInput("");
    setAssistantsResponse({});
  }, [selectedCard]);

  async function handleSubmit(isFeedback = false) {
    const requestBody = {
      chatId: null,
      chatTitle: selectedCard?.name,
      prevMessages: null,
      messages: [
        {
          role: "user",
          content: selectedCard?.prompt_ai ?? "",
        },
        { role: "user", content: promptInput },
      ],
    };

    try {
      const response = await fetch("/api/newChat", {
        method: "POST",
        body: JSON.stringify(
          isFeedback
            ? {
                prevMessages: messages,
                messages: [
                  assistansResponse,
                  { role: "user", content: feedbackInput },
                ],
              }
            : requestBody,
        ),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = (await response.json()) as object[];
      setMessages(data);
      setAssistantsResponse(data[data?.length - 1]?.message);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex w-full flex-col items-center">
      <PromptsSelector
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
      />
      <Prompter uiPrompt={selectedCard?.prompt_display} />
      <PromptInput
        value={promptInput}
        onChange={setPromptInput}
        onSubmit={() => handleSubmit()}
      />
      <ChatFeedback
        userId={userId}
        chat={messages}
        feedbackInput={feedbackInput}
        setFeedbackInput={setFeedbackInput}
        setMessages={setMessages}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
