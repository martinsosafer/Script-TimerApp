"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import type { CoreMessage } from "ai";
import { readStreamableValue } from "ai/rsc";

import { toast } from "@voiceai/ui/@/components/ui/toast";

import type {
  Prompt,
  PromptSubType,
  PromptType,
} from "~/app/(site)/data/chat-prompts/types";
import {
  boostYourVideoScriptSubtypes,
  types as tabs,
} from "~/app/(site)/data/chat-prompts/types";
import { clearChats } from "~/app/actions/newChatActions";
import deductOpenAiCredits from "~/app/actions/openAiCredits";
import { nanoid } from "~/utils/helpers";
import { continueConversation } from "../../../actions/aiActions";
import ClearChatHistoryModal from "../../components/modals/clear-chat-history";
import EditChatSubjectModal from "../../components/modals/edit-chat-subject";
import NoSessionModal from "../../components/modals/no-session-modal";
import ChatFeedback from "./chat-feedback";
import GoToOldChat from "./go-to-old-chat";
import PromptInput from "./prompt-input";
import Prompter from "./prompter";
import PromptsSelector from "./promptSelector";
import SearchPrompts from "./seach-prompts";
import type { Chat, ChatMessage } from "./types";
import { getChatHistory } from "./utils";
import WelcomeMessage from "./welcome-message/welcome-message";

interface ChatProps {
  userId: string | undefined;
  openAiCredits: number;
}

export default function ChatInteraction({ userId, openAiCredits }: ChatProps) {
  const [selectedCard, setSelectedCard] = useState<Prompt | undefined>();
  const [promptInput, setPromptInput] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const [selectedChatHistory, setSelectedChatHistory] = useState<
    Chat | undefined
  >(undefined);

  const [feedbackChatId, setFeedbackChatId] = useState<string | undefined>();

  const [noSessionModalOpen, setNoSessionModalOpen] = useState<boolean>(false);

  const [isDeletingHistory, setIsDeletingHistory] = useState<boolean>(false);

  const [isEditingChatSubject, setIsEditingChatSubject] =
    useState<boolean>(false);

  const [feedbackInput, setFeedbackInput] = useState<string | undefined>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [credits, setCredits] = useState(openAiCredits);

  const [selectedTab, setSelectedTab] = useState<PromptType>(tabs[3]);
  const [selectedPill, setSelectedPill] = useState<PromptSubType>(
    boostYourVideoScriptSubtypes[0],
  );

  const [isInputMinimized, setIsInputMinimized] = useState(false);

  useEffect(() => {
    setPromptInput("");
    setMessages([]);
    setFeedbackInput("");
    setSelectedChatHistory(undefined);
    setFeedbackChatId(undefined);
  }, [selectedCard]);

  useEffect(() => {
    if (userId) {
      getChatHistory({ userId, setChatHistory });
    }
  }, [userId, isLoading]);

  async function handleSubmitChat(e: FormEvent, chatId?: string) {
    setIsLoading(true);
    const tokens = promptInput.length + (feedbackInput?.length ?? 0);
    if (!userId) {
      setIsLoading(false);
      return setNoSessionModalOpen(true);
    }

    if (tokens > credits) {
      toast({
        title: "Insufficient Credits",
        description: "You do not have enough credits for this interaction.",
      });
      setIsLoading(false);
    } else {
      try {
        e.preventDefault();

        const newMessages: CoreMessage[] = [
          ...messages,
          {
            content: selectedCard?.prompt_ai ?? "",
            role: "system",
          },
          {
            content: feedbackInput.length > 0 ? feedbackInput : promptInput,
            role: "user",
          },
        ];

        setCredits(credits - tokens);
        setMessages(newMessages);
        setPromptInput("");
        setFeedbackInput("");
        setSelectedCard(undefined);

        const { value } = await continueConversation(
          newMessages,
          selectedChatHistory,
          feedbackChatId ?? chatId,
        );

        for await (const content of readStreamableValue(value)) {
          setMessages([
            ...newMessages,
            {
              role: "assistant",
              content: content!,
            },
          ]);
        }
        await deductOpenAiCredits(tokens);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <div className="flex w-full flex-col items-center">
      <WelcomeMessage />
      <SearchPrompts
        setSelectedCard={setSelectedCard}
        setSelectedPill={setSelectedPill}
        setSelectedTab={setSelectedTab}
      />
      <PromptsSelector
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
        selectedPill={selectedPill}
        setSelectedPill={setSelectedPill}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        setIsInputMinimized={setIsInputMinimized}
      />
      <Prompter uiPrompt={selectedCard?.prompt_display} />
      <PromptInput
        value={promptInput}
        onChange={setPromptInput}
        selectedCardName={selectedCard?.name}
        onSubmit={async (e) => {
          const chatId = feedbackChatId ?? nanoid();
          await handleSubmitChat(e, chatId);
          await getChatHistory({ userId, setChatHistory });
          setFeedbackChatId(chatId);
        }}
        loadingMessages={isLoading}
        isEnabled={Boolean(selectedCard) && promptInput.length > 0}
        userId={userId}
        isInputMinimized={isInputMinimized}
        setIsInputMinimized={setIsInputMinimized}
      />
      <ChatFeedback
        chat={messages}
        chatHistory={chatHistory}
        setChatHistory={setChatHistory}
        feedbackInput={feedbackInput}
        setFeedbackInput={setFeedbackInput}
        setMessages={setMessages}
        handleSubmit={async (e) => {
          await handleSubmitChat(e);
          await getChatHistory({ userId, setChatHistory });
        }}
        setIsDeletingHistory={setIsDeletingHistory}
        setSelectedChatHistory={setSelectedChatHistory}
        loadingMessages={isLoading}
        setIsEditingChatSubject={setIsEditingChatSubject}
      />
      <GoToOldChat />
      {isDeletingHistory && (
        <ClearChatHistoryModal
          onClose={() => setIsDeletingHistory(false)}
          onConfirm={async () => {
            await clearChats();
            setChatHistory([]);
            setIsDeletingHistory(false);
          }}
        />
      )}
      {isEditingChatSubject && (
        <EditChatSubjectModal
          onClose={() => {
            setIsEditingChatSubject(false);
          }}
          setChatHistory={setChatHistory}
          chatHistory={chatHistory}
          selectedChat={selectedChatHistory}
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
