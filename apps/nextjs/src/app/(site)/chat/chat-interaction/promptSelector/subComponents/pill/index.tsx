import type { Dispatch, SetStateAction } from "react";

import type {
  Prompt,
  PromptSubType,
} from "~/app/(site)/data/chat-prompts/types";

interface SpeechPillProps {
  speechPill: PromptSubType;
  isSelected: boolean;
  setSelectedPill: Dispatch<SetStateAction<PromptSubType>>;
  setSelectedCard: Dispatch<SetStateAction<Prompt | undefined>>;
  setIsInputMinimized: Dispatch<SetStateAction<boolean>>;
}

const pillStyles = {
  selected: "text-white bg-[#0066FF] rounded-full py-2 px-4",
  unselected:
    "text-gray-500 border border-gray-500 rounded-full py-2 px-4 hover:bg-gray-100 hover:text-gray-600",
};

export default function Pill({
  speechPill,
  isSelected,
  setSelectedPill,
  setSelectedCard,
  setIsInputMinimized,
}: SpeechPillProps) {
  return (
    <button
      className={isSelected ? pillStyles.selected : pillStyles.unselected}
      onClick={() => {
        setSelectedPill(speechPill);
        setSelectedCard(undefined);
        setIsInputMinimized(false);
      }}
    >
      {speechPill}
    </button>
  );
}
