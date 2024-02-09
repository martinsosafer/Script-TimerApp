"use client";

import type { Message } from "ai";

import { useCopyToClipboard } from "../../hooks/use-copy-to-clipboard";
import { cn } from "../../lib/utils";
import { ActorsDropdown } from "./actorsdropdown";
import { Button } from "./button";
import { IconCheck, IconCopy, IconPlay, IconUser, IconUsers } from "./icons";

interface ChatMessageActionsProps extends React.ComponentProps<"div"> {
  message: Message;
}

export function ChatMessageActions({
  message,
  className,
  ...props
}: ChatMessageActionsProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(message.content);
  };

  return (
    <div
      className={cn(
        " flex items-center justify-end md:absolute md:-right-24 md:-top-3",
        "md:flex-row",
        "flex-row",
        "md:mb-0",
        "mb-4",
        className,
      )}
      {...props}
    >
      <Button variant="ghost" size="icon" onClick={onCopy}>
        {isCopied ? <IconCheck /> : <IconCopy />}
        <span className="sr-only">Copy message</span>
      </Button>
      <Button variant="ghost" size="icon">
        <IconPlay />
        <span className="sr-only">Play sound</span>
      </Button>
      <ActorsDropdown />
    </div>
  );
}
