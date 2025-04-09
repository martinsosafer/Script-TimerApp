import { useQuery } from "@tanstack/react-query";

import {
  IconCinematic,
  IconHipHop,
  IconPop,
  IconTechnical,
} from "@voiceai/ui/@/components/ui/icons";

import { getSoundsBlob } from "../../actions";
import CardsList from "../../cardList/CardList";
import type { RefetchFavorites } from "../../types";

const MusicSection = ({ refetchFavorites }: RefetchFavorites) => {
  const {
    data: musicList,
    isLoading: isLoadingMusic,
    isError: isErrorMusic,
  } = useQuery({
    queryKey: ["musicBlob"],
    queryFn: () => getSoundsBlob("music"),
  });

  const icons = [
    { type: "cinematic", icon: <IconCinematic /> },
    { type: "hip-hop", icon: <IconHipHop /> },
    { type: "pop", icon: <IconPop /> },
    { type: "technical", icon: <IconTechnical /> },
  ];

  return (
    <CardsList
      data={musicList}
      icons={icons}
      isLoading={isLoadingMusic}
      isError={isErrorMusic}
      title="Music"
      refetchFavorites={refetchFavorites}
    />
  );
};

export default MusicSection;
