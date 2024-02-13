"use client";

import * as React from "react";
import Link from "next/link";
import type { Message } from "ai";

import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@voiceai/ui";
import {
  IconCheck,
  IconCopy,
  IconPlay,
  Icons,
  IconStop,
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
    // console.log("Selected model:", model);
  };

  // Generate audio voice
  const [audio, setAudio] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const { mutateAsync: generateVoice, error } = api.voice.create.useMutation({
    onSuccess(data) {
      const dataURI = `data:audio/mpeg;base64,${data?.audio}`;
      setAudio(dataURI);
      setLoading(false);

      if (audioRef.current) {
        audioRef.current.src = dataURI;
        audioRef.current.addEventListener("loadeddata", playAudio);
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

  // console.log("Data for audio generation:", {
  //   voice_id: selectedModel,
  //   message: message.content,
  // });
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
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
      <Tooltip>
        <TooltipTrigger>
          <Button variant="ghost" size="icon" onClick={onCopy}>
            {isCopied ? <IconCheck /> : <IconCopy />}
            <span className="sr-only">Copy message</span>
          </Button>
          <TooltipContent>Copy this message</TooltipContent>
        </TooltipTrigger>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="ghost"
            size="icon"
            disabled={!selectedModel || !message.content || loading}
            onClick={async () => {
              setLoading(true);
              toast({
                description:
                  "Recording script,please keep in mind that longer scripts take longer to generate.",
              });
              try {
                await generateVoice({
                  voice_id: selectedModel.id,
                  message: message.content,
                });
              } catch (error) {
                toast({
                  description:
                    "Error:Keep in mind base plan only allows 1500 words scripts",
                });
                console.error("Error generating voice:", error);
              }
            }}
          >
            {loading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <IconPlay />
            )}
            <audio
              src={audio}
              className="col-span-2 col-start-2 mx-auto w-full"
              ref={audioRef}
              onEnded={() => setLoading(false)} // Handle loading state when audio ends
            />
            <span className="sr-only">Play sound</span>
          </Button>
          <TooltipContent>
            Play script, first you have to select a voice model!
          </TooltipContent>
        </TooltipTrigger>
      </Tooltip>
      {audio && !loading && (
        <Button variant="ghost" size="icon" onClick={stopAudio}>
          <IconStop />
          <span className="sr-only">Stop sound</span>
        </Button>
      )}
      <ActorsDropdown
        voices={voices}
        setSelectedModel={handleSetSelectedModel}
        selectedModel={selectedModel}
      />
    </div>
  );
}
