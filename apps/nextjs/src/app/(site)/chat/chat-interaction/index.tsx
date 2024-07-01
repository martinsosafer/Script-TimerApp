"use client";

import { useEffect, useState } from "react";

import type { Prompt } from "~/app/(site)/data/chat-prompts/types";
import { clearChats } from "~/app/actions/newChatActions";
import ClearChatHistoryModal from "../../components/modals/clear-chat-history";
import NoSessionModal from "../../components/modals/no-session-modal";
import ChatFeedback from "./chat-feedback";
import GoToOldChat from "./go-to-old-chat";
import PromptInput from "./prompt-input";
import Prompter from "./prompter";
import PromptsSelector from "./promptSelector";
import type { Chat, ChatMessage } from "./types";
import WelcomeMessage from "./welcome-message/welcome-message";

interface ChatProps {
  userId: string | undefined;
}

export default function ChatInteraction({ userId }: ChatProps) {
  const [selectedCard, setSelectedCard] = useState<Prompt | undefined>();
  const [promptInput, setPromptInput] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const [selectedChatHistory, setSelectedChatHistory] = useState<
    Chat | undefined
  >(undefined);

  const [noSessionModalOpen, setNoSessionModalOpen] = useState<boolean>(false);

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
    async function getChatHistory({ userId }: { userId: string }) {
      try {
        const response = await fetch("/api/chatHistory", {
          method: "POST",
          body: JSON.stringify({ userId }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = (await response.json()) as Chat[];
        setChatHistory(data);
        return data;
      } catch (err) {
        console.error(err);
      }
    }
    if (userId) {
      getChatHistory({ userId });
    }
  }, [userId, isLoading]);

  async function handleSubmit(isFeedback = false) {
    setIsLoading(true);
    const requestBody = {
      id: null,
      title: selectedCard?.name,
      prevMessages: null,
      messages: [
        {
          role: "user",
          content: `${selectedCard?.prompt_ai}\n ${promptInput}`,
        },
      ],
    };

    try {
      const response = await fetch("/api/newChat", {
        method: "POST",
        body: JSON.stringify(
          isFeedback
            ? {
                id: selectedChatHistory?.id ?? "",
                title: selectedChatHistory?.title,
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
      const data = (await response.json()) as Chat;
      setMessages(
        isFeedback
          ? data.messages
          : ([{ role: "user", content: promptInput }].concat(
              data.messages,
            ) as ChatMessage[]),
      );
      setSelectedChatHistory(data);
      setAssistantsResponse(data.messages[data.messages?.length - 1]);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex w-full flex-col items-center">
      <WelcomeMessage />
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
        isEnabled={Boolean(selectedCard)}
        setOpenMopdal={() => setNoSessionModalOpen(true)}
        userId={userId}
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
        setSelectedChatHistory={setSelectedChatHistory}
        loadingMessages={isLoading}
        setAssistantsResponse={setAssistantsResponse}
      />
      <GoToOldChat />
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
      {noSessionModalOpen && (
        <NoSessionModal
          openModal={noSessionModalOpen}
          page="chat"
          setOpenModal={setNoSessionModalOpen}
        />
      )}
    </div>
  );
}
