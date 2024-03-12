"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useChat } from "ai/react";
import type { Message } from "ai/react";

import { Button } from "@voiceai/ui/@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@voiceai/ui/@/components/ui/dialog";
import { Input } from "@voiceai/ui/@/components/ui/input";
import { ChatScrollAnchor } from "@voiceai/ui/@/components/ui/scroll-anchor";
import { toast } from "@voiceai/ui/@/components/ui/toast";
import { useLocalStorage } from "@voiceai/ui/@/hooks/use-local-storage";
import { cn } from "@voiceai/ui/@/lib/utils";

import useModal from "~/app/hooks/useModal";
import type { Prompt, PromptType } from "../../data/prompts";
import Modal from "../modal";
import { ChatList } from "./chat-list";
import { ChatPanel } from "./chat-panel";
import { EmptyScreen } from "./empty-screen";

const IS_PREVIEW = process.env.VERCEL_ENV === "preview";
export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
  id?: string;
}

export function Chat({ id, initialMessages, className }: ChatProps) {
  const router = useRouter();
  const path = usePathname();
  const [previewToken, setPreviewToken] = useLocalStorage<string | null>(
    "ai-token",
    null,
  );
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  // console.log("PROMPT", prompt);
  const [previewTokenDialog, setPreviewTokenDialog] = useState(IS_PREVIEW);

  const [previewTokenInput, setPreviewTokenInput] = useState(
    previewToken ?? "",
  );
  const { showModal, closeModal } = useModal();
  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      // api: "/api/chat",
      initialMessages: prompt
        ? [
            {
              id: "initial_prompt",
              role: "assistant",
              content: prompt.prompt_display,
            },
          ]
        : initialMessages,
      id,
      body: {
        id,
        previewToken,
        prompt: prompt?.id,
      },
      onError(error) {
        console.error("Chat stream error:", error);

        toast({
          title: "Error",
          description: "An error occurred while processing the chat.",
        });
      },

      onResponse(response) {
        if (response.status === 401) {
          toast({
            title: "Error",
            description: "Error generating chat. Please try again later",
          });
        }
      },

      onFinish() {
        console.log("path:", path);
        if (!path.includes("chat/")) {
          router.push(`/chat/${id}`, { scroll: false });
          router.refresh();
        }
      },
      // onFinish() {
      //   if (!path.includes("chat")) {
      //     window.history.pushState({}, "", `/chat/${id}`);
      //   }
      // },
    });
  console.log("messages:", messages);
  return (
    <>
      <div className={cn("pb-[200px] pt-4 md:pt-10", className)}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <EmptyScreen setInput={setInput} setPrompt={setPrompt} />
        )}
      </div>
      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
      />

      <Dialog open={previewTokenDialog} onOpenChange={setPreviewTokenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter your OpenAI Key</DialogTitle>
            <DialogDescription>
              If you have not obtained your OpenAI API key, you can do so by{" "}
              <a
                href="https://platform.openai.com/signup/"
                className="underline"
              >
                signing up
              </a>{" "}
              on the OpenAI website. This is only necessary for preview
              environments so that the open source community can test the app.
              The token will be saved to your browser&apos;s local storage under
              the name <code className="font-mono">ai-token</code>.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={previewTokenInput}
            placeholder="OpenAI API key"
            onChange={(e) => setPreviewTokenInput(e.target.value)}
          />
          <DialogFooter className="items-center">
            <Button
              onClick={() => {
                setPreviewToken(previewTokenInput);
                setPreviewTokenDialog(false);
              }}
            >
              Save Token
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Modal isOpen={showModal} onClose={closeModal} />
    </>
  );
}
