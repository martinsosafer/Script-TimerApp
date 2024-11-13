import type { Dispatch, SetStateAction } from "react";

import type {
  Prompt,
  PromptSubType,
  PromptType,
} from "~/app/(site)/data/chat-prompts/types";
import { pills } from "../../index";

interface TabProps {
  tab: PromptType;
  setSelectedTab: Dispatch<SetStateAction<PromptType>>;
  setSelectedPill: Dispatch<SetStateAction<PromptSubType>>;
  setSelectedCard: Dispatch<SetStateAction<Prompt | undefined>>;
  isSelected: boolean;
  setIsInputMinimized: Dispatch<SetStateAction<boolean>>;
}

const tabStyles = {
  selected:
    "text-[#0066FF] text-md bg-white border-l border-t border-r border-gray-400 rounded-md pt-2 pb-3 px-3 uppercase",
  unselected:
    "text-gray-500 text-md bg-transparent pt-2 pb-3 px-3 uppercase hover:text-gray-600",
};

export default function Tab({
  tab,
  setSelectedTab,
  setSelectedPill,
  setSelectedCard,
  isSelected,
  setIsInputMinimized,
}: TabProps) {
  return (
    <button
      className={isSelected ? tabStyles.selected : tabStyles.unselected}
      onClick={() => {
        setSelectedTab(tab);
        setSelectedPill(pills[tab][0]);
        setSelectedCard(undefined);
        setIsInputMinimized(false);
      }}
    >
      {tab}
    </button>
  );
}
