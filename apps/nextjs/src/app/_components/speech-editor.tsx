"use client";

import { useEffect, useState } from "react";

import { Button, SimpleEditor } from "@voiceai/ui";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@voiceai/ui/@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
    <>
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          {/* <CardTitle className="text-sm font-medium">Total Revenue</CardTitle> */}
        </CardHeader>
        <CardContent>
          <SimpleEditor
            content={state.speech ?? ""}
            onChange={handleEditorChange}
          />
        </CardContent>
        <CardFooter>
          <div className="mx-4 inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-5">
            <Avatar className="py-2">
              <AvatarImage src="/avatars/01.png" />
              <AvatarFallback className="text-white">OM</AvatarFallback>
            </Avatar>
            <div className="mx-4">
              <p className="text-sm font-medium leading-none">
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
            className="w-full"
          >
            {loading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Generate"
            )}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default SpeechEditor;
