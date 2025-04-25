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

import { getSoundfxList } from "../../actions";
import CardsList from "../../cardList/CardList";

const SoundEffectsSection = ({ userId }: { userId: string | undefined }) => {
  const {
    data: soundEffectsList,
    isLoading: isLoadingSoundEffects,
    isError: isErrorSoundEffects,
  } = useQuery({
    queryKey: ["soundEffects"],
    queryFn: () => getSoundfxList("sound-effects"),
  });

  const icons = [
    { type: "alarms", icon: <IconAlerts /> },
    { type: "ambient", icon: <IconAmbient /> },
    { type: "bass-drops", icon: <IconBassDrops /> },
    { type: "clocks", icon: <IconClocks /> },
    { type: "keyboards", icon: <IconKeyboards /> },
    { type: "people", icon: <IconPeople /> },
    { type: "suspense", icon: <IconSuspense /> },
    { type: "technology", icon: <IconTechnology /> },
    { type: "videogames", icon: <IconVideogames /> },
    { type: "wooshes", icon: <IconWooshes /> },
  ];

  return (
    <CardsList
      data={soundEffectsList}
      icons={icons}
      isLoading={isLoadingSoundEffects}
      isError={isErrorSoundEffects}
      title="Sound Effects"
      userId={userId}
    />
  );
};

export default SoundEffectsSection;
