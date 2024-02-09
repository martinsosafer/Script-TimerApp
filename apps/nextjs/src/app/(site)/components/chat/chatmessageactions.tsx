"use client";

import * as React from "react";
import type { Message } from "ai";

import { Button } from "@voiceai/ui";
import {
  IconCheck,
  IconCopy,
  IconPlay,
} from "@voiceai/ui/@/components/ui/icons";
import { useCopyToClipboard } from "@voiceai/ui/@/hooks/use-copy-to-clipboard";
import { cn } from "@voiceai/ui/@/lib/utils";

import { api } from "~/utils/api";
import { ActorsDropdown } from "./actorsdropdown";

interface ChatMessageActionsProps extends React.ComponentProps<"div"> {
  message: Message;
}

export function ChatMessageActions({
  message,
  className,
  ...props
}: ChatMessageActionsProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const [selectedModel, setSelectedModel] = React.useState(null);
  const { data: voices } = api.voice.list.useQuery({ name: "" });
  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(message.content);
  };
  const handleSetSelectedModel = (model: any) => {
    setSelectedModel(model);
    console.log("Selected model:", model); // Adding console.log to see if setSelectedModel works
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
      <ActorsDropdown
        voices={voices}
        setSelectedModel={handleSetSelectedModel}
      />
    </div>
  );
}
