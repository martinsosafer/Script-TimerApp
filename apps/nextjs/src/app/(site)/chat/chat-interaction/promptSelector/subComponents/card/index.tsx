import type { Dispatch, SetStateAction } from "react";
import Image from "next/image";

import type { Prompt } from "~/app/(site)/data/chat-prompts/types";

interface PromptCardProps {
  card: Prompt;
  isSelected: boolean;
  setSelectedCard: Dispatch<SetStateAction<Prompt | undefined>>;
  isAddYourOwn?: boolean;
}

const styles = {
  selected: {
    card: "flex h-[105px] w-[310px] items-center justify-center gap-3 rounded-lg border-2 border-[#FB8C0A70]",
    icon: "flex h-[52px] w-[52px] items-center justify-center rounded-md bg-[#FB8C0A40]",
  },
  unSelected: {
    card: "flex h-[105px] w-[310px] items-center justify-center gap-3 rounded-lg border-2 border-[#1877F290]",
    icon: "flex h-[52px] w-[52px] items-center justify-center rounded-md bg-[#1877F233]",
  },
  addYourOwn: {
    card: "flex h-[105px] w-[310px] items-center justify-center gap-3 rounded-lg border-2 border-gray-400",
    icon: "flex h-[52px] w-[52px] items-center justify-center rounded-md bg-gray-400",
  },
};

function handleStyle(isSelected: boolean, isAddYourOwn: boolean) {
  if (isSelected) {
    return styles.selected;
  } else if (isAddYourOwn) {
    return styles.addYourOwn;
  } else {
    return styles.unSelected;
  }
}

export default function PromptCard({
  card,
  isSelected,
  setSelectedCard,
  isAddYourOwn = false,
}: PromptCardProps) {
  const { icon, name } = card;
  console.log("PromptCardProps", isSelected, isAddYourOwn);
  return (
    <button
      className={handleStyle(isSelected, isAddYourOwn).card}
      onClick={() => setSelectedCard(card)}
    >
      <div className={handleStyle(isSelected, isAddYourOwn).icon}>
        <Image src={icon} alt="manito" width={24} height={24} />
      </div>
      <p className="w-[215px] text-left">{name}</p>
    </button>
  );
}
