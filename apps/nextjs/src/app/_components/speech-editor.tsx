"use client";

import { useState } from "react";
import Link from "next/link";

import { Button, SimpleEditor } from "@voiceai/ui";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@voiceai/ui/@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
} from "@voiceai/ui/@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@voiceai/ui/@/components/ui/hover-card";
import { Icons } from "@voiceai/ui/@/components/ui/icons";
import { toast, ToastAction } from "@voiceai/ui/@/components/ui/toast";

import { api } from "~/utils/api";
import { generateRandomString } from "~/utils/helpers";
import { usePlayer } from "../providers/player-context";

interface SpeechEditorProps {}

const SpeechEditor: React.FC<SpeechEditorProps> = ({}) => {
  const { data: subscription } = api.subscription.mySubscription.useQuery();

  const [loading, setLoading] = useState(false);
  const { state, dispatch } = usePlayer();
  const { currentVoice, speech, stability, similarity } = state;

  const gatewayFreePlan = (): boolean => {
    return Boolean(
      speech && speech?.length > 250 && subscription?.status !== "ACTIVE",
    );
  };

  const { mutateAsync: generateVoice, error } = api.voice.create.useMutation({
    onSuccess(data) {
      const dataURI = `data:audio/mpeg;base64,${data?.audio}`;
      dispatch({ type: "SET_AUDIO", payload: dataURI });
    },
    onError(error) {
      setLoading(false);
      console.log("IN ERROR", error?.data?.code);
      if (error?.data?.code === "FORBIDDEN") {
        toast({
          title: "Upgrade your plan",
          description: "The base plan only supports up to 250 characters",
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

  // Function to update the speech value
  const setSpeech = (newSpeech: string) => {
    dispatch({ type: "SET_SPEECH", payload: newSpeech });
  };

  const handleEditorChange = (content: string) => {
    if (gatewayFreePlan()) {
      toast({
        title: "Upgrade your plan",
        description: "The base plan only supports up to 250 characters",
        action: (
          <ToastAction altText="subscribe">
            <Link href="/settings/billing">Subscribe</Link>
          </ToastAction>
        ),
      });
    }
    setSpeech(content);
  };

  const getInitials = (name: string): string =>
    name ? name.substring(0, 2).toUpperCase() : "OM";

  // Function to create the avatar URL
  const createAvatarUrl = (): string => {
    const randomString: string = generateRandomString();
    const initials: string = getInitials(currentVoice?.name ?? "IV");
    return `https://avatar.vercel.sh/${randomString}?text=${initials}`;
  };

  // Avatar URL
  const avatarUrl: string = createAvatarUrl();

  return (
    <Card className="flex flex-shrink flex-col justify-between bg-white">
      <CardContent>
        <div className="self-start pt-1">
          <SimpleEditor
            content={state.speech ?? ""}
            onChange={handleEditorChange}
            className="min-h-[150px] w-full"
          />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between px-4">
        <div className="mx-2 inline-flex items-center whitespace-nowrap rounded-lg bg-blue-700 px-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-5">
          <Avatar className="py-2">
            <AvatarImage src={avatarUrl} className="rounded-full" />
            <AvatarFallback className="border border-stone-500 bg-blue-700 text-white hover:bg-blue-700">
              IV
            </AvatarFallback>
          </Avatar>
          <div className="mx-4 max-w-min truncate">
            <p className="truncate text-sm font-medium leading-none">
              {currentVoice?.name}
            </p>
          </div>
        </div>

        <HoverCard>
          <HoverCardTrigger className="w-full">
            <Button
              disabled={
                currentVoice?.id === undefined || loading || gatewayFreePlan()
              }
              onClick={async () => {
                setLoading(true);
                try {
                  await generateVoice({
                    voice_id: currentVoice?.id ?? "",
                    message: speech ?? "",
                    stability: stability,
                    similarity: similarity,
                  });
                  setLoading(false);
                } catch {}
              }}
              className="w-full bg-blue-700 hover:bg-blue-700"
            >
              {loading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Generate"
              )}
            </Button>
          </HoverCardTrigger>
          <HoverCardContent side="top">
            Choose a voice on the left before generating
          </HoverCardContent>
        </HoverCard>
      </CardFooter>
    </Card>
  );
};

export default SpeechEditor;
