import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

import { IconSearch } from "@voiceai/ui/@/components/ui/icons";

import {
  BOOST_YOUR_VIDEO_SCRIPT_PROMPTS,
  ENHANCE_YOUR_PRESENTATION_PROMPTS,
  HEADLINES_AND_OPENINGS_PROMPTS,
  IMPROVE_SALES_PROMPTS,
  IMPROVE_YOUR_SPEECH_PROMPTS,
} from "~/app/(site)/data/chat-prompts/";
import type {
  Prompt,
  PromptSubType,
  PromptType,
} from "~/app/(site)/data/chat-prompts/types";

const prompts = [
  ...HEADLINES_AND_OPENINGS_PROMPTS,
  ...IMPROVE_YOUR_SPEECH_PROMPTS,
  ...ENHANCE_YOUR_PRESENTATION_PROMPTS,
  ...BOOST_YOUR_VIDEO_SCRIPT_PROMPTS,
  ...IMPROVE_SALES_PROMPTS,
];

const promptNames = prompts.map((prompt) => prompt.name);

interface SearchPromptsProps {
  setSelectedCard: Dispatch<SetStateAction<Prompt | undefined>>;
  setSelectedPill: Dispatch<SetStateAction<PromptSubType>>;
  setSelectedTab: Dispatch<SetStateAction<PromptType>>;
}

export default function SearchPrompts({
  setSelectedCard,
  setSelectedPill,
  setSelectedTab,
}: SearchPromptsProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredPrompts, setFilteredPrompts] = useState<string[] | []>([]);

  useEffect(() => {
    const filteredPrompts = promptNames.filter((prompt) =>
      prompt.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setFilteredPrompts(filteredPrompts);
  }, [searchValue]);

  function handleSelectPrompt(prompt: string) {
    const selectedPrompt = prompts.find((p) => p.name === prompt);
    if (selectedPrompt) {
      setSelectedCard(selectedPrompt);
      setSelectedPill(selectedPrompt.subtype);
      setSelectedTab(selectedPrompt.type);
    }
    setSearchValue("");
  }

  return (
    <div className="relative flex w-96 items-center justify-between gap-2 rounded-md border border-gray-400 bg-white p-2">
      <IconSearch className="h-6 w-6 text-gray-400" />
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.currentTarget.value)}
        className="w-full outline-none"
      />
      {searchValue.length > 0 && filteredPrompts.length > 0 && (
        <div className="absolute left-0 top-14 z-20 flex max-h-[500px] w-96 flex-col overflow-y-auto border border-gray-400 bg-white">
          {filteredPrompts.map((prompt) => (
            <button
              key={prompt}
              className="p-2 text-left hover:bg-blue-200"
              onClick={() => handleSelectPrompt(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
