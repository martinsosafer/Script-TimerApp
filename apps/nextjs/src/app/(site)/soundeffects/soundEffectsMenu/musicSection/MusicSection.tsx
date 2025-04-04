import { useQuery } from "@tanstack/react-query";

import {
  IconCinematic,
  IconHipHop,
  IconPop,
  IconTechnical,
} from "@voiceai/ui/@/components/ui/icons";

import { getSoundsBlob } from "../../actions";
import CardsList from "../../cardList/CardList";

const MusicSection = () => {
  const {
    data: musicList,
    isLoading: isLoadingMusic,
    isError: isErrorMusic,
  } = useQuery({
    queryKey: ["musicBlob"],
    queryFn: () => getSoundsBlob("music"),
  });

  const icons = [
    <IconCinematic key="cinematic" />,
    <IconHipHop key="hip-hop" />,
    <IconPop key="pop" />,
    <IconTechnical key="technical" />,
  ];

  return (
    <CardsList
      data={musicList}
      icons={icons}
      isLoading={isLoadingMusic}
      isError={isErrorMusic}
      title="Music"
    />
  );
};

export default MusicSection;
