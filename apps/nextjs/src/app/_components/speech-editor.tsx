"use client";

import { useEffect, useState } from "react";

import { Button, SimpleEditor } from "@voiceai/ui";

import { usePlayer } from "../providers/player-context";

interface SpeechEditorProps {}

const SpeechEditor: React.FC<SpeechEditorProps> = ({}) => {
  const { state, dispatch } = usePlayer();

  // Function to update the speech value
  const setSpeech = (newSpeech: string) => {
    dispatch({ type: "SET_SPEECH", payload: newSpeech });
  };

  const handleEditorChange = (content: string) => {
    console.log("HANDLING SPEECH CHANGE", content);
    setSpeech(content);
  };

  return (
    <>
      <SimpleEditor
        content={state.speech ?? ""}
        className="h-full w-full rounded-md px-4 pt-8"
        onChange={handleEditorChange}
      />
    </>
  );
};

export default SpeechEditor;
