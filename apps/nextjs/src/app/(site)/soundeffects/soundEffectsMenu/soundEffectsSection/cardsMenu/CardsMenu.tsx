import { useQuery } from "@tanstack/react-query";

import { getSoundEffectsBlob } from "../../../actions";

const CardsMenu = () => {
  const {
    data: soundEffectsList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["soundEffectsBlob"],
    queryFn: () => getSoundEffectsBlob(),
  });


    console.log("soundEffectsList", !isLoading && soundEffectsList);
// const soundEffectsList = getSoundEffectsBlob()

  return <div>CardsMenu</div>;
};

export default CardsMenu;
