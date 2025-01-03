import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

import { IconSearch } from "@voiceai/ui/@/components/ui/icons";

import type {
  PromptCategory,
  PromptSubcategory,
} from "~/app/(site)/(admin)/admin-prompt-categories/types";
import { isNewPrompt } from "~/app/(site)/chat/chat-interaction/utils";
import {
  BOOST_YOUR_VIDEO_SCRIPT_PROMPTS,
  ENHANCE_YOUR_PRESENTATION_PROMPTS,
  HEADLINES_AND_OPENINGS_PROMPTS,
  IMPROVE_SALES_PROMPTS,
  IMPROVE_YOUR_SPEECH_PROMPTS,
} from "~/app/(site)/data/chat-prompts/";
import type { Prompt } from "~/app/(site)/data/chat-prompts/types";

const staticPrompts = [
  ...HEADLINES_AND_OPENINGS_PROMPTS,
  ...IMPROVE_YOUR_SPEECH_PROMPTS,
  ...ENHANCE_YOUR_PRESENTATION_PROMPTS,
  ...BOOST_YOUR_VIDEO_SCRIPT_PROMPTS,
  ...IMPROVE_SALES_PROMPTS,
];

const promptNames = staticPrompts.map((prompt) => prompt.name);

interface SearchPromptsProps {
  setSelectedPrompt: Dispatch<SetStateAction<Prompt | undefined>>;
  setSelectedSubCategory: Dispatch<SetStateAction<PromptSubcategory>>;
  setSelectedCategory: Dispatch<SetStateAction<PromptCategory>>;
  prompts: Prompt[];
  categories: PromptCategory[];
  subcategories: PromptSubcategory[];
}

export default function SearchPrompts({
  setSelectedPrompt,
  setSelectedSubCategory,
  setSelectedCategory,
  prompts,
  categories,
  subcategories,
}: SearchPromptsProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredPrompts, setFilteredPrompts] = useState<string[] | []>([]);

  useEffect(() => {
    const filteredPrompts = promptNames
      .concat(prompts.map((prompt) => prompt.name))
      .filter((prompt) =>
        prompt.toLowerCase().includes(searchValue.toLowerCase()),
      );
    setFilteredPrompts(filteredPrompts);
  }, [searchValue]);

  function handleSelectPrompt(prompt: string) {
    const promptSelected = staticPrompts
      .concat(prompts)
      .find((p) => p.name === prompt);
    if (promptSelected) {
      setSelectedPrompt(promptSelected);
      setSelectedSubCategory(
        subcategories.find((sub) => sub.id === promptSelected.subcategoryId)!,
      );
      setSelectedCategory(
        categories.find((cat) => cat.id === promptSelected.categoryId)!,
      );
    }
    setSearchValue("");
  }

  return (
    <div className="relative flex items-center justify-between gap-2 rounded-lg border-2 border-[#898F98] bg-white p-4 lg:w-[565px]">
      <IconSearch className="h-5 w-5 text-gray-400" />
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.currentTarget.value)}
        className="w-full outline-none"
        placeholder="What are you writing?"
      />
      {searchValue.length > 0 && filteredPrompts.length > 0 && (
        <div className="absolute left-0 top-14 z-20 mt-1 flex max-h-[500px] flex-col overflow-y-auto border border-gray-400 bg-white lg:w-[565px]">
          {filteredPrompts.map((prompt) => (
            <button
              key={prompt}
              className="p-2 text-left hover:bg-blue-200"
              onClick={() => handleSelectPrompt(prompt)}
            >
              {prompt}{" "}
              {isNewPrompt(
                staticPrompts.concat(prompts).find((p) => p.name === prompt),
              ) && (
                <span className="bg-cp-secondary-light rounded-full px-2 py-1 text-xs font-bold">
                  NEW
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
