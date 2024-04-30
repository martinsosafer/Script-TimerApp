import * as React from "react";
import Link from "next/link";
import type { UseChatHelpers } from "ai/react";

// import { shareChat } from '@/app/actions'
import { Button } from "@voiceai/ui/@/components/ui/button";
// import { ChatShareDialog } from "@/components/chat-share-dialog";
// import { FooterText } from "@/components/footer";
import {
  IconCopy,
  IconRefresh,
  // IconShare,
  IconStop,
} from "@voiceai/ui/@/components/ui/icons";

import { ButtonScrollToBottom } from "./button-scroll-to-bottom";
import { PromptForm } from "./prompt-form";

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | "append"
    | "isLoading"
    | "reload"
    | "messages"
    | "stop"
    | "input"
    | "setInput"
  > {
  id?: string;
  title?: string;
}

export function ChatPanel({
  id,
  title,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages,
}: ChatPanelProps) {
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false);

  return (
    <div className="animate-in relative inset-x-0 bottom-0 w-full bg-transparent duration-300 ease-in-out dark:bg-transparent peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <ButtonScrollToBottom />
      <div className="mx-auto text-center sm:max-w-2xl sm:px-4">
        <div>
          <br />
          <span className="mt-8  text-xs text-muted-foreground">
            Any time you want to hear a response, click COPY{" "}
            <span className="inline-block">
              <IconCopy />
            </span>{" "}
            and{" "}
            <Link href="/texttospeech" target="_blank">
              <span className="cursor-pointer underline">TEXT to SPEECH</span>
            </Link>{" "}
            for a voice actor.
          </span>
        </div>
        <div className="flex h-12 items-center justify-center">
          {isLoading ? (
            <Button
              variant="outline"
              onClick={() => stop()}
              className="bg-background"
            >
              <IconStop className="mr-2" />
              Stop generating
            </Button>
          ) : (
            messages?.length >= 2 && (
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => reload()}>
                  <IconRefresh className="mr-2" />
                  Regenerate response
                </Button>
                {id && title ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setShareDialogOpen(true)}
                    >
                      <IconShare className="mr-2" />
                      Share
                    </Button>
                    {/* <ChatShareDialog
                      open={shareDialogOpen}
                      onOpenChange={setShareDialogOpen}
                      onCopy={() => setShareDialogOpen(false)}
                      //   shareChat={shareChat}
                      chat={{
                        id,
                        title,
                        messages,
                      }}
                    /> */}
                  </>
                ) : null}
              </div>
            )
          )}
        </div>
        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm
            onSubmit={async (value) => {
              await append({
                id,
                content: value,
                role: "user",
              });
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
          {/* <FooterText className="hidden sm:block" /> */}
        </div>
      </div>
    </div>
  );
}
