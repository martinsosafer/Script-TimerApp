import type { Dispatch, SetStateAction } from "react";

import type {
  PromptCategory,
  PromptSubcategory,
} from "~/app/(site)/(admin)/admin-prompt-categories/types";
import {
  BOOST_YOUR_VIDEO_SCRIPT_PROMPTS,
  ENHANCE_YOUR_PRESENTATION_PROMPTS,
  HEADLINES_AND_OPENINGS_PROMPTS,
  IMPROVE_SALES_PROMPTS,
  IMPROVE_YOUR_SPEECH_PROMPTS,
  YOUR_OWN_PROMPT,
} from "~/app/(site)/data/chat-prompts/";
import type { Prompt } from "~/app/(site)/data/chat-prompts/types";
import { roboto } from "~/app/fonts";
import SearchPrompts from "../seach-prompts";
import { isNewPrompt } from "../utils";

const staticPrompts = [
  ...HEADLINES_AND_OPENINGS_PROMPTS,
  ...IMPROVE_YOUR_SPEECH_PROMPTS,
  ...ENHANCE_YOUR_PRESENTATION_PROMPTS,
  ...BOOST_YOUR_VIDEO_SCRIPT_PROMPTS,
  ...IMPROVE_SALES_PROMPTS,
];

interface PromptsSelectorProps {
  selectedPrompt: Prompt | undefined;
  setSelectedPrompt: Dispatch<SetStateAction<Prompt | undefined>>;
  selectedCategory?: PromptCategory;
  setSelectedCategory: Dispatch<SetStateAction<PromptCategory | undefined>>;
  selectedSubCategory?: PromptSubcategory;
  setSelectedSubCategory: Dispatch<
    SetStateAction<PromptSubcategory | undefined>
  >;
  setIsInputMinimized: Dispatch<SetStateAction<boolean>>;
  prompts: Prompt[];
  categories: PromptCategory[];
  subcategories: PromptSubcategory[];
}

export default function PromptsSelector({
  selectedPrompt,
  setSelectedPrompt,
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
  prompts,
  categories,
  subcategories,
}: PromptsSelectorProps) {
  return (
    <div className="mt-10 flex flex-col lg:w-[565px]">
      <p className="text-cp-gray-500 mb-3 text-[16px] font-bold lg:text-xl">
        You can do a quick search
      </p>
      <SearchPrompts
        setSelectedPrompt={setSelectedPrompt}
        setSelectedSubCategory={setSelectedSubCategory}
        setSelectedCategory={setSelectedCategory}
        prompts={prompts}
        categories={categories}
        subcategories={subcategories}
      />
      <p className="text-cp-gray-500 mb-3 mt-10 text-[16px] font-bold lg:mt-[60px] lg:text-xl">
        Or choose options from our categories
      </p>
      <select
        className={`${roboto.className} border-cp-accent-light bg-cp-accent-light h-[56px] w-full rounded-lg border-2 px-2 font-bold lg:px-6`}
        value={
          selectedCategory?.name ?? "Select a category to see subcategories"
        }
        onChange={(e) =>
          setSelectedCategory(
            categories.find((category) => category.name === e.target.value),
          )
        }
      >
        {categories.map((category, idx) => {
          return (
            <option
              value={category.name}
              key={`${category.name}-${idx}`}
              className="bg-white"
            >
              {category.name}
            </option>
          );
        })}
      </select>
      <span
        className={`${roboto.className} mt-[16px] text-[16px] font-bold lg:mt-6`}
      >
        Select a subcategory:
      </span>
      <select
        className={`${roboto.className} border-cp-accent-light mt-2 h-[56px] w-full rounded-lg border-2 bg-white px-2 font-bold lg:px-6`}
        value={selectedSubCategory?.name}
        onChange={(e) =>
          setSelectedSubCategory(
            subcategories.find((subcat) => subcat.name === e.target.value),
          )
        }
      >
        <option value="" hidden>
          Select a Subcategory
        </option>
        {subcategories
          .filter((subcat) => subcat.categoryId === selectedCategory?.id)
          .map((subcategory, idx) => {
            return (
              <option
                value={subcategory.name}
                key={`${subcategory.name}-${idx}`}
              >
                {subcategory.name}
              </option>
            );
          })}
      </select>
      <span
        className={`${roboto.className} mt-[16px] text-[16px] font-bold lg:mt-6`}
      >
        Select a prompt:
      </span>
      <select
        className={`${roboto.className} border-cp-accent-light mt-2 h-[56px] w-full rounded-lg border-2 bg-white px-2 font-bold lg:px-6`}
        value={selectedPrompt?.name ?? ""}
        onChange={(e) => {
          if (e.target.value === YOUR_OWN_PROMPT.name) {
            return setSelectedPrompt(YOUR_OWN_PROMPT);
          }
          setSelectedPrompt(
            staticPrompts
              .concat(
                prompts.filter(
                  (prompt) => prompt.category_id === selectedCategory?.id,
                ),
              )
              .find((prompt) => prompt.name === e.target.value),
          );
        }}
      >
        <option value="" hidden>
          Select a Prompt
        </option>
        {staticPrompts
          .concat(
            prompts.filter(
              (prompt) => prompt.category_id === selectedCategory?.id,
            ),
          )
          .filter((prompt) => prompt.subcategory_id === selectedSubCategory?.id)
          .map((prompt, idx) => {
            return (
              <option value={prompt.name} key={`${prompt.name}-${idx}`}>
                {prompt.name} {isNewPrompt(prompt) ? "- New" : ""}
              </option>
            );
          })}
      </select>
    </div>
  );
}
