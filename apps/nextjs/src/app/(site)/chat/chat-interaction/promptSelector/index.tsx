import type { Dispatch, SetStateAction } from "react";

import {
  BOOST_YOUR_VIDEO_SCRIPT_PROMPTS,
  ENHANCE_YOUR_PRESENTATION_PROMPTS,
  HEADLINES_AND_OPENINGS_PROMPTS,
  IMPROVE_SALES_PROMPTS,
  IMPROVE_YOUR_SPEECH_PROMPTS,
  YOUR_OWN_PROMPT,
} from "~/app/(site)/data/chat-prompts/";
import type {
  Prompt,
  PromptSubType,
  PromptType,
} from "~/app/(site)/data/chat-prompts/types";
import {
  boostYourVideoScriptSubtypes,
  enhanceYourPresentationSubtypes,
  headlinesAndopeningSubtypes,
  improveSalesSubtypes,
  improveYourSpeechsubtypes,
  types as tabs,
} from "~/app/(site)/data/chat-prompts/types";
import { roboto } from "~/app/fonts";
import SearchPrompts from "../seach-prompts";

export const pills = {
  "HEADLINES & OPENINGS": headlinesAndopeningSubtypes,
  "IMPROVE YOUR SPEECH": improveYourSpeechsubtypes,
  "ENHANCE YOUR PRESENTATION": enhanceYourPresentationSubtypes,
  "BOOST YOUR VIDEO SCRIPT": boostYourVideoScriptSubtypes,
  "IMPROVE SALES": improveSalesSubtypes,
};

const cards = {
  "HEADLINES & OPENINGS": HEADLINES_AND_OPENINGS_PROMPTS,
  "IMPROVE YOUR SPEECH": IMPROVE_YOUR_SPEECH_PROMPTS,
  "ENHANCE YOUR PRESENTATION": ENHANCE_YOUR_PRESENTATION_PROMPTS,
  "BOOST YOUR VIDEO SCRIPT": BOOST_YOUR_VIDEO_SCRIPT_PROMPTS,
  "IMPROVE SALES": IMPROVE_SALES_PROMPTS,
};

interface PromptsSelectorProps {
  selectedCard: Prompt | undefined;
  setSelectedCard: Dispatch<SetStateAction<Prompt | undefined>>;
  selectedTab: PromptType;
  setSelectedTab: Dispatch<SetStateAction<PromptType>>;
  selectedPill: PromptSubType;
  setSelectedPill: Dispatch<SetStateAction<PromptSubType>>;
  setIsInputMinimized: Dispatch<SetStateAction<boolean>>;
  prompts: Prompt[];
}

export default function PromptsSelector({
  selectedCard,
  setSelectedCard,
  selectedTab,
  setSelectedTab,
  selectedPill,
  setSelectedPill,
  prompts,
}: PromptsSelectorProps) {
  return (
    <div className="flex flex-col lg:w-[565px]">
      <p className="text-cp-gray-500 mb-3 text-[16px] font-bold lg:text-xl">
        You can do a quick search
      </p>
      <SearchPrompts
        setSelectedCard={setSelectedCard}
        setSelectedPill={setSelectedPill}
        setSelectedTab={setSelectedTab}
        prompts={prompts}
      />
      <p className="text-cp-gray-500 mb-3 mt-10 text-[16px] font-bold lg:mt-[60px] lg:text-xl">
        Or choose options from our categories
      </p>
      <select
        className={`${roboto.className} border-cp-accent-light bg-cp-accent-light h-[56px] w-full rounded-lg border-2 px-2 font-bold lg:px-6`}
        value={selectedTab}
        onChange={(e) => setSelectedTab(e.target.value as PromptType)}
      >
        {tabs.map((tab, idx) => {
          return (
            <option value={tab} key={`${tab}-${idx}`} className="bg-white">
              {tab}
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
        value={selectedPill}
        onChange={(e) => setSelectedPill(e.target.value as PromptSubType)}
      >
        {pills[selectedTab].map((pill, idx) => {
          return (
            <option value={pill} key={`${pill}-${idx}`}>
              {pill}
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
        value={selectedCard?.name}
        onChange={(e) =>
          setSelectedCard(
            cards[selectedTab]
              .concat(prompts.filter((prompt) => prompt.type === selectedTab))
              .find((card) => card.name === e.target.value),
          )
        }
      >
        {cards[selectedTab]
          .concat(prompts.filter((prompt) => prompt.type === selectedTab))
          .filter((card) => card.subtype === selectedPill)
          .map((card, idx) => {
            return (
              <option value={card.name} key={`${card.name}-${idx}`}>
                {card.name}
              </option>
            );
          })}
      </select>
    </div>
  );
}
