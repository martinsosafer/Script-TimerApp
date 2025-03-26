"use client";

import { useState } from "react";

import Tabs from "../../components/tabs";
import { PromptingGuideAccordion } from "../SEAccordion/PromptingSoundGuideAccordion";
import { SoundEffectsGenerator } from "../soundeffectComponent";

const SoundEffectsMenu = ({ subData, credits }) => {
  const [selected, setSelected] = useState(2);

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
      label: "Favourites",
      active: selected === 3,
      action: () => setSelected(3),
    },
  ];

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-4 rounded-lg  border-gray-800 bg-white pb-5 shadow-xl">
      <Tabs options={tabsOptions} />
      <PromptingGuideAccordion />
      <SoundEffectsGenerator subData={subData} credits={credits} />
    </div>
  );
};

export default SoundEffectsMenu;
