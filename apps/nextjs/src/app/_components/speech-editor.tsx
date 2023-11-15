"use client";

import { useEffect, useState } from "react";

import { Button, TiptapEditor } from "@voiceai/ui";

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
      <TiptapEditor
        content={state.speech ?? ""}
        className="w-full rounded-md border-4 border-red-500"
        onChange={handleEditorChange}
      />
    </>
  );
};

export default SpeechEditor;
