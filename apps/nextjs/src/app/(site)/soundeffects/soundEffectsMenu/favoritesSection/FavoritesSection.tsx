import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import NoSessionModal from "~/app/(site)/components/modals/no-session-modal";
import { poppins } from "~/app/fonts";
import { getFavorites, getSoundfxList } from "../../actions";
import AudioPlayerList from "../../audioPlayerList/AudioPlayerList";

const FavoritesSection = ({ userId }: { userId: string | undefined }) => {
  const [noSessionModalOpen, setNoSessionModalOpen] = useState<boolean>(true);

  const { data: soundEffectsList } = useQuery({
    queryKey: ["soundEffects"],
    queryFn: () => getSoundfxList("sound-effects"),
    enabled: !!userId,
  });

  const { data: musicList } = useQuery({
    queryKey: ["music"],
    queryFn: () => getSoundfxList("music"),
    enabled: !!userId,
  });

  const fullListData = [...(soundEffectsList ?? []), ...(musicList ?? [])]
    .map((sound) => sound.sounds)
    .flat()
    .sort((a, b) =>
      a.pathname.split("/")[2]!.localeCompare(b.pathname.split("/")[2]!),
    );

  const {
    data: favoritesList,
    isLoading: isLoadingFavorites,
    isError: isErrorFavorites,
    refetch: refetchFavorites,
  } = useQuery({
    queryKey: ["soundfxFavorites"],
    queryFn: () => getFavorites(),
    enabled: !!userId,
  });

  const favoritesSoundList = fullListData?.filter((sound) => {
    return favoritesList?.some((favorite) => {
      return sound.id === favorite;
    });
  });

  if (!userId) {
    return (
      <>
        <div className="flex h-[200px] w-full items-center justify-center">
          <p className={`${poppins.className} text-lg font-bold`}>
            Please login to use favorites
          </p>
        </div>

        {noSessionModalOpen && (
          <NoSessionModal
            openModal={noSessionModalOpen}
            page="image"
            setOpenModal={setNoSessionModalOpen}
          />
        )}
      </>
    );
  }

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

  if (!isLoadingFavorites && favoritesSoundList?.length === 0) {
    return (
      <div className="flex h-[200px] w-full items-center justify-center">
        <p className={`${poppins.className} text-lg font-bold`}>
          Add sound effects and music to your favorites list!
        </p>
      </div>
    );
  }

  return (
    <AudioPlayerList
      soundsList={favoritesSoundList}
      favoritesList={favoritesList}
      refetchFavorites={refetchFavorites}
      userId={userId}
    />
  );
};

export default FavoritesSection;
