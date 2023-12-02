"use client";

import { useCallback, useState } from "react";
import { useCompletion } from "ai/react";

import { Button, SimpleEditor } from "@voiceai/ui";
import {
  Card,
  CardContent,
  CardFooter,
} from "@voiceai/ui/@/components/ui/card";
import { Icons } from "@voiceai/ui/@/components/ui/icons";

import { usePlayer } from "../providers/player-context";

interface GrammarEditorProps {}

const GrammarEditor: React.FC<GrammarEditorProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = usePlayer();

  const [revisedSpeech, setRevisedSpeech] = useState("");
  const { speech } = state;
  const { complete } = useCompletion({
    api: "/api/completion",
  });

  const checkAndPublish = useCallback(
    async (c: string) => {
      const completion = await complete(c);
      if (!completion) throw new Error("Failed to check typos");
      setLoading(false);
      setRevisedSpeech(completion);
    },
    [complete],
  );

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
            updatedContent={revisedSpeech}
            onChange={handleEditorChange}
            className="min-h-[150px] w-full"
          />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between space-x-4 px-4">
        <Button
          onClick={() => {
            setLoading(true);

            checkAndPublish(speech ?? "");
          }}
          className="w-full bg-blue-700"
        >
          {loading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Revise Grammar"
          )}
        </Button>
        {revisedSpeech.length > 0 && (
          <Button
            onClick={() => {
              setLoading(true);

              dispatch({ type: "SET_SPEECH", payload: revisedSpeech });
              setLoading(false);
            }}
            className="w-1/3 bg-blue-700"
          >
            {loading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Update Speech"
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default GrammarEditor;
