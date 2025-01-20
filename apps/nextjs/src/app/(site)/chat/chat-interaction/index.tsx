"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import type { CoreMessage } from "ai";
import { readStreamableValue } from "ai/rsc";

import { toast } from "@voiceai/ui/@/components/ui/toast";

import type { Prompt } from "~/app/(site)/data/chat-prompts/types";
import { clearChats } from "~/app/actions/newChatActions";
import deductOpenAiCredits from "~/app/actions/openAiCredits";
import { poppins, roboto } from "~/app/fonts";
import { nanoid } from "~/utils/helpers";
import { continueConversation } from "../../../actions/aiActions";
import type {
  PromptCategory,
  PromptSubcategory,
} from "../../(admin)/admin-prompt-categories/types";
import ClearChatHistoryModal from "../../components/modals/clear-chat-history";
import EditChatSubjectModal from "../../components/modals/edit-chat-subject";
import NoSessionModal from "../../components/modals/no-session-modal";
import ChatFeedback from "./chat-feedback";
import PromptInput from "./prompt-input";
import PromptsSelector from "./promptSelector";
import type { Chat, ChatMessage } from "./types";
import { getChatHistory, replaceWordInString } from "./utils";

interface ChatProps {
  userId: string | undefined;
  openAiCredits: number;
  prompts: Prompt[];
  categories: PromptCategory[];
  subcategories: PromptSubcategory[];
}

export default function ChatInteraction({
  userId,
  openAiCredits,
  prompts,
  categories,
  subcategories,
}: ChatProps) {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | undefined>();

  const [additionalFields, setAdditionalFields] = useState<Record<
    string,
    string
  > | null>(null);
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

  const [selectedCategory, setSelectedCategory] = useState<
    PromptCategory | undefined
  >(categories.find((category) => category.name === "IMPROVE YOUR SPEECH"));
  const [selectedSubCategory, setSelectedSubCategory] = useState<
    PromptSubcategory | undefined
  >();

  const [isInputMinimized, setIsInputMinimized] = useState(false);

  useEffect(() => {
    setPromptInput("");
    setMessages([]);
    setFeedbackInput("");
    setSelectedChatHistory(undefined);
    setFeedbackChatId(undefined);
  }, [selectedPrompt]);

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

        const systemMessage = selectedPrompt?.additional_fields
          ? replaceWordInString(selectedPrompt.prompt_ai, additionalFields!)
          : selectedPrompt?.prompt_ai;

        const newMessages: CoreMessage[] = [
          ...messages,
          {
            content: systemMessage ?? "",
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
        setSelectedPrompt(undefined);

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
    <div className={`${poppins.className} flex w-full flex-col items-center`}>
      <p
        className={`${roboto.className} bg-cp-accent-lightest w-full rounded-lg p-4 text-[16px] shadow-md lg:p-6 lg:text-lg`}
      >
        Use the quick-search bar or follow the steps below to get the best
        results with our pre built prompts.
      </p>
      <div className="mt-5 flex w-full flex-col items-center justify-center rounded-lg bg-white p-3 lg:mt-6 lg:px-[42px] lg:py-8">
        <PromptsSelector
          selectedPrompt={selectedPrompt}
          setSelectedPrompt={setSelectedPrompt}
          selectedSubCategory={selectedSubCategory}
          setSelectedSubCategory={setSelectedSubCategory}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setIsInputMinimized={setIsInputMinimized}
          prompts={prompts}
          categories={categories}
          subcategories={subcategories}
        />
        <PromptInput
          value={promptInput}
          onChange={setPromptInput}
          selectedPromptName={selectedPrompt?.name}
          onSubmit={async (e) => {
            const chatId = feedbackChatId ?? nanoid();
            await handleSubmitChat(e, chatId);
            await getChatHistory({ userId, setChatHistory });
            setFeedbackChatId(chatId);
          }}
          loadingMessages={isLoading}
          isEnabled={Boolean(selectedPrompt) && promptInput.length > 0}
          userId={userId}
          isInputMinimized={isInputMinimized}
          setIsInputMinimized={setIsInputMinimized}
          prompt={selectedPrompt}
          setAdditionalFields={setAdditionalFields}
          additionalFields={additionalFields}
        />
      </div>

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
