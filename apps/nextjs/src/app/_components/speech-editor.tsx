"use client";

import { useState } from "react";

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
  CardHeader,
} from "@voiceai/ui/@/components/ui/card";
import { Icons } from "@voiceai/ui/@/components/ui/icons";

import { api } from "~/utils/api";
import { usePlayer } from "../providers/player-context";

interface SpeechEditorProps {}

const SpeechEditor: React.FC<SpeechEditorProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = usePlayer();
  const { currentVoice, speech, stability, similarity } = state;

  const { mutateAsync: generateVoice, error } = api.voice.create.useMutation({
    onSuccess(data) {
      const dataURI = `data:audio/mpeg;base64,${data?.audio}`;
      dispatch({ type: "SET_AUDIO", payload: dataURI });
    },
  });

  // Function to update the speech value
  const setSpeech = (newSpeech: string) => {
    dispatch({ type: "SET_SPEECH", payload: newSpeech });
  };

  const handleEditorChange = (content: string) => {
    setSpeech(content);
  };

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
        <div className="mx-2 inline-flex items-center whitespace-nowrap rounded-md bg-primary px-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-5">
          <Avatar className="py-2">
            <AvatarImage src="/avatars/01.png" />
            <AvatarFallback className="border border-stone-500 bg-black text-white">
              OM
            </AvatarFallback>
          </Avatar>
          <div className="mx-4 max-w-xs">
            <p className="truncate text-sm font-medium leading-none">
              {currentVoice?.name}
            </p>
            {/* <p className="text-sm text-muted-foreground">m@example.com</p> */}
          </div>
        </div>

        <Button
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
          className="w-9/12"
        >
          {loading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Generate"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SpeechEditor;
