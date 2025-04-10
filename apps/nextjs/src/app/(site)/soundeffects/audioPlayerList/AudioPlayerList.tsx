import {
  IconDownload,
  IconHeart,
  IconHeartFill,
  IconMusic,
} from "@voiceai/ui/@/components/ui/icons";

import { poppins } from "~/app/fonts";
import { deleteFavorite, postFavorite } from "../actions";
import type { RefetchFavorites, SoundTypeNeon, SubData } from "../types";
import { formatSoundNameFromUrl } from "../utils";

interface AudioPlayerListProps {
  soundsList: SoundTypeNeon[] | undefined;
  favoritesList: string[] | undefined;
  refetchFavorites: RefetchFavorites["refetchFavorites"];
  subData: SubData | null | undefined;
}

const AudioPlayerList = ({
  soundsList,
  favoritesList,
  refetchFavorites,
  subData,
}: AudioPlayerListProps) => {
  const audioPLayerStyle = {
    boxShadow: "0px 1px 3px 0px rgba(0,0,0,0.4)",
    borderRadius: "28px",
  };

  const handleFavorite = async (sound: SoundTypeNeon) => {
    try {
      const isFavorite = favoritesList?.includes(sound?.id);
      if (isFavorite) {
        await deleteFavorite({ sound, subData });
      } else {
        await postFavorite({ sound, subData });
      }
      return refetchFavorites();
    } catch (error) {
      console.error("Error adding sound to favorites:", error);
    }
  };

  return (
    <div className="flex w-full flex-col gap-3">
      {soundsList?.map((sound: SoundTypeNeon) => (
        <div
          key={sound?.url}
          className="flex w-full items-center justify-between gap-2 rounded-lg p-4 shadow-md max-md:flex-col max-md:items-start max-sm:p-2"
        >
          <div className="flex items-center gap-4 max-sm:gap-2">
            <i className="rounded-full bg-[#7FB2FF] p-3 max-md:p-2">
              <IconMusic className="h-6 w-6 text-white max-md:h-5 max-md:w-5" />
            </i>
            <p
              className={`${poppins.className} text-sm font-bold capitalize max-sm:text-xs`}
            >
              {formatSoundNameFromUrl(sound.pathname)}
            </p>
          </div>

          <div className="flex items-center gap-8 max-md:w-full max-md:justify-between max-md:gap-4">
            <audio
              controls
              controlsList="nodownload noplaybackrate"
              src={sound.url}
              style={audioPLayerStyle}
            />
            <div className="flex items-center gap-4 max-md:gap-3">
              <button onClick={() => handleFavorite(sound)}>
                {favoritesList?.includes(sound?.id) ? (
                  <IconHeartFill className="text-primary" />
                ) : (
                  <IconHeart className="text-primary max-md:h-5 max-md:w-5" />
                )}
              </button>
              <a href={sound.downloadurl} className="cursor-pointer">
                <IconDownload className="h-7 w-7 text-primary max-md:h-6 max-md:w-6" />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AudioPlayerList;
