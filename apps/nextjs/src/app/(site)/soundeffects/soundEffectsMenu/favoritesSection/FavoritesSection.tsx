import { useQuery } from "@tanstack/react-query";

import { poppins } from "~/app/fonts";
import { getSoundfxFavorites, getSoundfxList } from "../../actions";
import AudioPlayerList from "../../audioPlayerList/AudioPlayerList";
import type { SessionProps } from "../../types";

const FavoritesSection = ({ subData }: SessionProps) => {
  const {
    data: soundEffectsList,
    // isLoading: isLoadingSoundEffects,
    // isError: isErrorSoundEffects,
  } = useQuery({
    queryKey: ["soundEffects"],
    queryFn: () => getSoundfxList("sound-effects"),
  });

  const {
    data: musicList,
    // isLoading: isLoadingMusic,
    // isError: isErrorMusic,
  } = useQuery({
    queryKey: ["music"],
    queryFn: () => getSoundfxList("music"),
  });

  const fullListData = [...(soundEffectsList ?? []), ...(musicList ?? [])]
    .map((sound) => sound.sounds)
    .flat();

  const {
    data: favoritesList,
    isLoading: isLoadingFavorites,
    isError: isErrorFavorites,
    refetch: refetchFavorites,
  } = useQuery({
    queryKey: ["soundfxFavorites"],
    queryFn: () => getSoundfxFavorites(),
  });

  const favoritesSoundList = fullListData?.filter((sound) => {
    return favoritesList?.some((favorite) => {
      return sound.id === favorite;
    });
  });

  if (isErrorFavorites) {
    return (
      <div className="flex h-[200px] w-full items-center justify-center">
        <p className={`${poppins.className} text-lg font-bold`}>
          Error loading Favorites
        </p>
      </div>
    );
  }

  if (isLoadingFavorites) {
    return (
      <div className="flex h-[200px] w-full items-center justify-center">
        <p className={`${poppins.className} text-lg font-bold`}>
          Loading Favorites...
        </p>
      </div>
    );
  }

  return (
    <AudioPlayerList
      soundsList={favoritesSoundList}
      favoritesList={favoritesList}
      refetchFavorites={refetchFavorites}
      subData={subData}
    />
  );
};

export default FavoritesSection;
