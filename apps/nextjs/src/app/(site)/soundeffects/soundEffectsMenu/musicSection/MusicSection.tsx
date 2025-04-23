import { useQuery } from "@tanstack/react-query";

import {
  IconCinematic,
  IconHipHop,
  IconPop,
  IconTechnical,
} from "@voiceai/ui/@/components/ui/icons";

import { getSoundfxList } from "../../actions";
import CardsList from "../../cardList/CardList";

const MusicSection = ({ userId }: { userId: string | undefined }) => {
  const {
    data: musicList,
    isLoading: isLoadingMusic,
    isError: isErrorMusic,
  } = useQuery({
    queryKey: ["music"],
    queryFn: () => getSoundfxList("music"),
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
      userId={userId}
    />
  );
};

export default MusicSection;
