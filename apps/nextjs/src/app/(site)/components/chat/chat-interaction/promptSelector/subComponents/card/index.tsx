import type { Dispatch, SetStateAction } from "react";
import Image from "next/image";

import type { Prompt } from "~/app/(site)/data/chat-prompts/types";

interface PromptCardProps {
  card: Prompt;
  isSelected: boolean;
  setSelectedCard: Dispatch<SetStateAction<Prompt | undefined>>;
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
};

export default function PromptCard({
  card,
  isSelected,
  setSelectedCard,
}: PromptCardProps) {
  const { icon, name } = card;

  return (
    <button
      className={isSelected ? styles.selected.card : styles.unSelected.card}
      onClick={() => setSelectedCard(card)}
    >
      <div
        className={isSelected ? styles.selected.icon : styles.unSelected.icon}
      >
        <Image src={icon} alt="manito" width={24} height={24} />
      </div>
      <p className="w-[215px] text-left">{name}</p>
    </button>
  );
}
