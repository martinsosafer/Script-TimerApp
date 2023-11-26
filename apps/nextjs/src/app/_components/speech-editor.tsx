"use client";

import { useEffect, useState } from "react";

import { Button, SimpleEditor } from "@voiceai/ui";

import { api } from "~/utils/api";
import { usePlayer } from "../providers/player-context";

interface SpeechEditorProps {}

const SpeechEditor: React.FC<SpeechEditorProps> = ({}) => {
  const { state, dispatch } = usePlayer();
  const { currentVoice, speech } = state;

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
      <SimpleEditor
        content={state.speech ?? ""}
        onChange={handleEditorChange}
      />
      <div className="flex items-center space-x-4 text-black">
        {/* <Avatar>
          <AvatarImage src="/avatars/02.png" />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar> */}
        <div>
          <p className="text-sm font-medium leading-none">
            {currentVoice?.name}
          </p>
          <p className="text-sm text-muted-foreground">p@example.com</p>
        </div>
        <Button
          onClick={async () => {
            try {
              await generateVoice({
                voice_id: currentVoice?.id ?? "",
                message: speech ?? "",
              });
            } catch {}
          }}
          className="w-full"
        >
          Generate
        </Button>
      </div>
    </>
  );
};

export default SpeechEditor;
