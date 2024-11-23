import { useState } from "react";

import { IconPencilLine, IconSpinner } from "@voiceai/ui/@/components/ui/icons";

import {
  addPrompt,
  updatePrompt,
} from "~/app/(site)/(admin)/admin-prompts/actions";
import type { Prompt } from "~/app/(site)/(admin)/admin-prompts/types";
import {
  boostYourVideoScriptSubtypes,
  enhanceYourPresentationSubtypes,
  headlinesAndopeningSubtypes,
  improveSalesSubtypes,
  improveYourSpeechsubtypes,
  types,
} from "~/app/(site)/data/chat-prompts/types";

const subtypes: Record<string, string[]> = {
  "HEADLINES & OPENINGS": [...headlinesAndopeningSubtypes],
  "IMPROVE YOUR SPEECH": [...improveYourSpeechsubtypes],
  "ENHANCE YOUR PRESENTATION": [...enhanceYourPresentationSubtypes],
  "BOOST YOUR VIDEO SCRIPT": [...boostYourVideoScriptSubtypes],
  "IMPROVE SALES": [...improveSalesSubtypes],
};

interface ModalProps {
  onClose: () => void;
  prompt?: Prompt;
  refetch: () => void;
}

const aiTypes = ["CHAT", "IMAGE", "VOICE", "OTHER"];

export default function AdminPromptModal({
  onClose,
  prompt,
  refetch,
}: ModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedAiType, setSelectedAiType] = useState<string | undefined>(
    () => prompt?.ai_model_type,
  );
  const [selectedType, setSelectedType] = useState<string | undefined>(() =>
    selectedAiType === "CHAT" ? prompt?.type : undefined,
  );
  const [selectedSubType, setSelectedSubType] = useState<string | undefined>(
    () => (selectedAiType === "CHAT" ? prompt?.subtype : undefined),
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (prompt) {
      await updatePrompt(form, prompt.id);
      refetch();
      return onClose();
    }
    const newPrompt = await addPrompt(form);
    console.log("newPrompt", newPrompt);
    refetch();
    onClose();
    setIsLoading(false);
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur">
      <div className="flex flex-col items-center justify-between rounded-lg bg-white p-4">
        <h2 className="flex w-full items-center gap-2 text-xl font-semibold text-gray-800">
          {" "}
          <IconPencilLine /> Add or Edit Prompt
        </h2>
        <form className="flex flex-col gap-2 p-2" onSubmit={handleSubmit}>
          <div className="flex w-full gap-2">
            <div className="flex w-[300px] flex-col gap-2">
              <label htmlFor="name" className="text-sm font-semibold">
                Prompt name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={prompt?.name}
                placeholder={"Prompt Name"}
                className="w-full rounded-md border-2 border-primary p-2"
              />
              <label htmlFor="description" className="text-sm font-semibold">
                Prompt description
              </label>
              <textarea
                name="description"
                defaultValue={prompt?.description}
                placeholder={"Prompt Description"}
                rows={4}
                className="w-full rounded-md border-2 border-primary p-2"
              />
              <label htmlFor="ai_model_type" className="text-sm font-semibold">
                AI Type
              </label>
              <select
                name="ai_model_type"
                defaultValue={prompt?.ai_model_type}
                className="w-full rounded-md border-2 border-primary p-2"
                onChange={(e) => {
                  setSelectedAiType(e.target.value);
                  setSelectedType(undefined);
                  setSelectedSubType(undefined);
                }}
              >
                <option value="" hidden>
                  Select AI Type
                </option>
                {aiTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {selectedAiType === "CHAT" && (
                <>
                  <label htmlFor="type" className="text-sm font-semibold">
                    Chat Prompt Type
                  </label>
                  <select
                    name="type"
                    defaultValue={selectedAiType === "CHAT" ? prompt?.type : ""}
                    className="w-full rounded-md border-2 border-primary p-2"
                    disabled={selectedAiType === "CHAT" ? false : true}
                    onChange={(e) => {
                      setSelectedType(e.target.value);
                    }}
                  >
                    <option value="" hidden>
                      Select Chat Prompt Type
                    </option>
                    {types.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="subtype" className="text-sm font-semibold">
                    Chat Prompt SubType
                  </label>
                  <select
                    name="subtype"
                    defaultValue={prompt?.subtype}
                    className="w-full rounded-md border-2 border-primary p-2"
                    disabled={selectedAiType === "CHAT" ? false : true}
                  >
                    <option value="" hidden>
                      Select Chat Prompt SubType
                    </option>

                    {selectedType &&
                      subtypes[selectedType]?.map((subtype) => (
                        <option key={subtype} value={subtype}>
                          {subtype}
                        </option>
                      ))}
                  </select>
                </>
              )}
            </div>
            <div className="flex w-[500px] flex-col gap-2">
              <label htmlFor="prompt_ai" className="text-sm font-semibold">
                Ai Prompt
              </label>
              <textarea
                name="prompt_ai"
                defaultValue={prompt?.prompt_ai}
                placeholder={"Ai Prompt"}
                rows={6}
                className="w-full rounded-md border-2 border-primary p-2"
              />
              <label htmlFor="prompt_display" className="text-sm font-semibold">
                Display Prompt
              </label>
              <textarea
                name="prompt_display"
                defaultValue={prompt?.prompt_display}
                placeholder={"Prompt to Display"}
                rows={6}
                className="w-full rounded-md border-2 border-primary p-2"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              className="rounded-md bg-gray-500 px-4 py-3 text-white hover:opacity-80"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="flex w-[140px] items-center justify-center rounded-md bg-primary px-4 py-3 text-white hover:opacity-80"
              type="submit"
            >
              {isLoading ? (
                <IconSpinner className="h-6 w-6 animate-spin" />
              ) : prompt ? (
                "Edit Propmt"
              ) : (
                "Save Prompt"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
