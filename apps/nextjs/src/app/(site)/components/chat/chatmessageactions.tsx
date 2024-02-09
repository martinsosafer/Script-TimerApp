"use client";

import * as React from "react";
import Link from "next/link";
import type { Message } from "ai";

import { Button } from "@voiceai/ui";
import {
  IconCheck,
  IconCopy,
  IconPlay,
} from "@voiceai/ui/@/components/ui/icons";
import { toast, ToastAction } from "@voiceai/ui/@/components/ui/toast";
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
  // Generate audio voice
  const [audio, setAudio] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const toggleAudioRef = React.useRef<React.Ref<HTMLButtonElement>>(null);
  const { mutateAsync: generateVoice, error } = api.voice.create.useMutation({
    onSuccess(data) {
      const dataURI = `data:audio/mpeg;base64,${data?.audio}`;
      setAudio(dataURI);

      setLoading(false);
      console.log("clicking");
      if (toggleAudioRef?.current) {
        // @ts-expect-error weird typing with ref
        toggleAudioRef.current?.click();
      }
    },
    onError(error) {
      setLoading(false);
      if (error?.data?.code === "FORBIDDEN") {
        toast({
          title: "Upgrade your plan",
          description: "The base plan only supports up to 1200 characters",
          action: (
            <ToastAction altText="subscribe">
              <Link href="/settings/billing">Subscribe</Link>
            </ToastAction>
          ),
        });
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again later",
        });
      }
    },
  });
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
      <Button
        variant="ghost"
        size="icon"
        disabled={!selectedModel || !message.content}
        onClick={async () => {
          setLoading(true);
          try {
            await generateVoice({
              // @ts-expect-error need to type this in the state
              voice_id: selectedModel?.id,
              message: message.content,
              stability: stability?.[0],
              similarity: similarity?.[0],
            });
            setLoading(false);
          } catch {}
        }}
      >
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
