"use client";

import { useEffect, useState } from "react";

import type { Prompt } from "~/app/(site)/data/chat-prompts/types";
import { clearChats } from "~/app/actions/newChatActions";
import { api } from "~/utils/api";
import ClearChatHistoryModal from "../../components/modals/clear-chat-history";
import ChatModal from "../../old-chat/chat/chatmodal";
import ChatFeedback from "./chat-feedback";
import GoToOldChat from "./go-to-old-chat";
import PromptInput from "./prompt-input";
import Prompter from "./prompter";
import PromptsSelector from "./promptSelector";
import type { Chat, ChatMessage } from "./types";
import WelcomeMessage from "./welcome-message/welcome-message";

export default function ChatInteraction({ userId }: { userId: string }) {
  const [selectedCard, setSelectedCard] = useState<Prompt | undefined>();
  const [promptInput, setPromptInput] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const [selectedChatHistory, setSelectedChatHistory] = useState<
    Chat | undefined
  >(undefined);

  const [isDeletingHistory, setIsDeletingHistory] = useState<boolean>(false);

  const [feedbackInput, setFeedbackInput] = useState<string>("");

  const [assistansResponse, setAssistantsResponse] = useState<
    ChatMessage | undefined
  >(undefined);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data: subscriptionData, isLoading: subscriptionLoading } =
    api.subscription.mySubscription.useQuery();

  const isSubscriptionActive =
    subscriptionData &&
    (subscriptionData.status === "STUDENT" ||
      subscriptionData.status === "CREATOR" ||
      subscriptionData.status === "BUSINESS" ||
      subscriptionData.status === "FREE_TRIAL");

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
    getChatHistory({ userId });
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
      setMessages(data.messages);
      setSelectedChatHistory(data);
      setAssistantsResponse(data.messages[data.messages?.length - 1]);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {subscriptionLoading && <div className="h-screen w-full"></div>}
      {!isSubscriptionActive && (
        <div className="h-screen w-full">
          <ChatModal />
        </div>
      )}
      {!subscriptionLoading && isSubscriptionActive && (
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
        </div>
      )}
    </>
  );
}
