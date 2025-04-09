"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Tabs from "../../components/tabs";
import { getSoundfxFavorites } from "../actions";
import type { SessionProps } from "../types";
import CreateSection from "./createSection/CreateSection";
import FavoritesSection from "./favoritesSection/FavoritesSection";
import MusicSection from "./musicSection/MusicSection";
import SoundEffectsSection from "./soundEffectsSection/SoundEffectsSection";

const SoundEffectsMenu = ({ subData }: SessionProps) => {
  const [selected, setSelected] = useState<number>(0);

  const {
    data: soundfxFavoritesList,
    isLoading: isLoadingFavorites,
    isError: isErrorFavorites,
    refetch: refetchFavorites,
  } = useQuery({
    queryKey: ["soundfxFavorites"],
    queryFn: () => getSoundfxFavorites(),
  });

  console.log("soundfxFavoritesList", soundfxFavoritesList);

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
    if (selected === 0)
      return <SoundEffectsSection refetchFavorites={refetchFavorites} />;
    if (selected === 1)
      return <MusicSection refetchFavorites={refetchFavorites} />;
    if (selected === 2) return <CreateSection subData={subData} />;
    if (selected === 3) return <FavoritesSection subData={subData} />;
  };

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-5 rounded-xl  border-gray-800 bg-white p-3 shadow-xl lg:px-6 lg:pb-6 lg:pt-2">
      <Tabs options={tabsOptions} />

      {handleSelection(selected)}
    </div>
  );
};

export default SoundEffectsMenu;
