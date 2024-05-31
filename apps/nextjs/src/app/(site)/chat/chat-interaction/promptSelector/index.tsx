import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

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
import {
  boostYourVideoScriptSubtypes,
  enhanceYourPresentationSubtypes,
  headlinesAndopeningSubtypes,
  improveSalesSubtypes,
  improveYourSpeechsubtypes,
  types as tabs,
} from "~/app/(site)/data/chat-prompts/types";
import PromptCard from "./subComponents/card";
import Pill from "./subComponents/pill";
import Tab from "./subComponents/tab";

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
}

export default function PromptsSelector({
  selectedCard,
  setSelectedCard,
}: PromptsSelectorProps) {
  const [selectedTab, setSelectedTab] = useState<PromptType>(tabs[1]);
  const [selectedPill, setSelectedPill] = useState<PromptSubType>(
    improveYourSpeechsubtypes[0],
  );
  //const [selectedCard, setSelectedCard] = useState<Prompt | undefined>();

  return (
    <div className="mt-10 flex w-[1024px] flex-col items-center justify-center">
      <div className="z-10 flex w-full justify-center gap-1">
        {tabs.map((tab, index) => {
          const isSelected = selectedTab === tab;
          return (
            <Tab
              key={`${tab}-${index}`}
              isSelected={isSelected}
              tab={tab}
              setSelectedTab={setSelectedTab}
              setSelectedPill={setSelectedPill}
              setSelectedCard={setSelectedCard}
            />
          );
        })}
      </div>
      <div className="-mt-0.5 min-h-[600px] w-full rounded-md border border-gray-400 bg-white p-6">
        <div className="flex flex-wrap justify-center gap-4">
          {pills[selectedTab].map((pill) => {
            const isSelected = selectedPill === pill;
            return (
              <Pill
                key={pill}
                isSelected={isSelected}
                speechPill={pill}
                setSelectedPill={setSelectedPill}
                setSelectedCard={setSelectedCard}
              />
            );
          })}
        </div>
        <h4 className="p-6 text-center text-lg font-semibold text-primary">
          How can I help you today?
        </h4>
        <div className="flex w-full flex-wrap gap-5">
          {cards[selectedTab]
            .filter((card) => card.subtype === selectedPill)
            .map((card) => {
              const isSelected = selectedCard?.id === card.id;
              return (
                <PromptCard
                  key={`${card.id}`}
                  isSelected={isSelected}
                  card={card}
                  setSelectedCard={setSelectedCard}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
