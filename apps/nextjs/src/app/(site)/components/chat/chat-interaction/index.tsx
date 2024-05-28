"use client";

import { useEffect, useState } from "react";

import type { Prompt } from "~/app/(site)/data/chat-prompts/types";
import { clearChats } from "~/app/actions/newChatActions";
import ClearChatHistoryModal from "../../modals/clear-chat-history";
import ChatFeedback from "./chat-feedback";
import PromptInput from "./prompt-input";
import Prompter from "./prompter";
import PromptsSelector from "./promptSelector";
import type { ChatMessage, DbPayload } from "./types";

interface ChatHistoryProps {
  userId: string;
}

interface SelectedChatHistory {
  id: string;
  title: string;
}

export default function ChatInteraction({ userId }: { userId: string }) {
  const [selectedCard, setSelectedCard] = useState<Prompt | undefined>();
  const [promptInput, setPromptInput] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatHistory, setChatHistory] = useState<object[]>([]);
  const [selectedChatHistory, setSelectedChatHistory] = useState<
    SelectedChatHistory | undefined
  >(undefined);

  const [isDeletingHistory, setIsDeletingHistory] = useState<boolean>(false);

  const [feedbackInput, setFeedbackInput] = useState<string>("");

  const [assistansResponse, setAssistantsResponse] = useState<
    ChatMessage | undefined
  >(undefined);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setPromptInput("");
    setMessages([]);
    setFeedbackInput("");
    setAssistantsResponse(undefined);
  }, [selectedCard]);

  useEffect(() => {
    async function getChatHistory({ userId }: ChatHistoryProps) {
      try {
        const response = await fetch("/api/chatHistory", {
          method: "POST",
          body: JSON.stringify({ userId }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = (await response.json()) as ChatMessage[];
        setChatHistory(data);
        return data;
      } catch (err) {
        console.error(err);
      }
    }
    getChatHistory({ userId });
  }, [userId, isLoading]);

  async function handleSubmit(isFeedback = false) {
    setIsLoading(true);
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
                chatId: selectedChatHistory?.id ?? "",
                chatTitle: selectedChatHistory?.title,
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
      const data = (await response.json()) as DbPayload;
      setMessages(data.messages);
      setAssistantsResponse(data.messages[data.messages?.length - 1]);
      setIsLoading(false);
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
        loadingMessages={isLoading}
      />
      <ChatFeedback
        chat={messages}
        chatHistory={chatHistory}
        setChatHistory={setChatHistory}
        feedbackInput={feedbackInput}
        setFeedbackInput={setFeedbackInput}
        setMessages={setMessages}
        handleSubmit={handleSubmit}
        setIsDeletingHistory={setIsDeletingHistory}
        loadingMessages={isLoading}
      />
      {isDeletingHistory && (
        <ClearChatHistoryModal
          onClose={() => setIsDeletingHistory(false)}
          onConfirm={() => {
            clearChats();
            setChatHistory([]);
            setIsDeletingHistory(false);
          }}
        />
      )}
    </div>
  );
}
