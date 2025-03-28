"use client";

import { useState } from "react";

import Tabs from "../../components/tabs";
import Create from "../create/Create";
import type { SubData } from "../types";

interface SoundEffectsMenuProps {
  subData: SubData;
  credits: number;
}

const SoundEffectsMenu = ({ subData, credits }: SoundEffectsMenuProps) => {
  const [selected, setSelected] = useState<number>(2);

  const tabsOptions = [
    {
      label: "Sound Effects",
      active: selected === 0,
      action: () => setSelected(0),
    },
    {
      label: "Music",
      active: selected === 1,
      action: () => setSelected(1),
    },
    {
      label: "Create",
      active: selected === 2,
      action: () => setSelected(2),
    },
    {
      label: "Favorites",
      active: selected === 3,
      action: () => setSelected(3),
    },
  ];

  const handleSelection = (selected: number) => {
    if (selected === 0) return null;
    if (selected === 1) return null;
    if (selected === 2) return <Create subData={subData} credits={credits} />;
    if (selected === 3) return null;
  };

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-5 rounded-xl  border-gray-800 bg-white px-5 pb-5 shadow-xl">
      <Tabs options={tabsOptions} />
      {handleSelection(selected)}
    </div>
  );
};

export default SoundEffectsMenu;
