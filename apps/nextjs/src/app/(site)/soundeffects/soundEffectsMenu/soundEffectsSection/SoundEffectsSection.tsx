import React from "react";
import { useQuery } from "@tanstack/react-query";

import {
  IconAlerts,
  IconAmbient,
  IconBassDrops,
  IconClocks,
  IconKeyboards,
  IconPeople,
  IconSuspense,
  IconTechnology,
  IconVideogames,
  IconWooshes,
} from "@voiceai/ui/@/components/ui/icons";

import { getSoundEffectsBlob } from "../../actions";
import CardsMenu from "../../cardsMenu/CardsMenu";

const SoundEffectsSection = () => {
  const {
    data: soundEffectsList,
    isLoading: isLoadingSoundEffects,
    isError: isErrorSoundEffects,
  } = useQuery({
    queryKey: ["soundEffectsBlob"],
    queryFn: () => getSoundEffectsBlob(),
  });

  const icons = [
    <IconAlerts key="alerts" />,
    <IconAmbient key="ambient" />,
    <IconBassDrops key="bass-drops" />,
    <IconClocks key="clocks" />,
    <IconKeyboards key="keyboards" />,
    <IconPeople key="people" />,
    <IconSuspense key="suspense" />,
    <IconTechnology key="technology" />,
    <IconVideogames key="videogames" />,
    <IconWooshes key="wooshes" />,
  ];

  return (
    <CardsMenu
      data={soundEffectsList}
      icons={icons}
      isLoading={isLoadingSoundEffects}
      isError={isErrorSoundEffects}
      title="Sound Effects"
    />
  );
};

export default SoundEffectsSection;
