import {
  IconDownload,
  IconHeart,
  IconMusic,
} from "@voiceai/ui/@/components/ui/icons";

import { poppins } from "~/app/fonts";
import type { Blob } from "../types";
import { formatSoundNameFromUrl } from "../utils";

interface AudioPlayerListProps {
  soundsList: Blob[] | undefined;
}

const AudioPlayerList = ({ soundsList }: AudioPlayerListProps) => {
  const audioPLayerStyle = {
    boxShadow: "0px 1px 3px 0px rgba(0,0,0,0.4)",
    borderRadius: "28px",
  };

  return (
    <div className="flex w-full flex-col gap-3">
      {soundsList?.map((sound: Blob) => (
        <div
          key={sound?.url}
          className="flex w-full items-center justify-between rounded-lg p-4 shadow-md"
        >
          <div className="flex items-center gap-4 ">
            <i className="rounded-full bg-[#7FB2FF] p-3">
              <IconMusic className="h-6 w-6 text-white" />
            </i>
            <p className={`${poppins.className} text-sm font-bold capitalize`}>
              {formatSoundNameFromUrl(sound.pathname)}
            </p>
          </div>

          <div className="flex items-center gap-8">
            <audio
              controls
              controlsList="nodownload noplaybackrate"
              src={sound.url}
              style={audioPLayerStyle}
            />
            <div className="flex items-center gap-4">
              <IconHeart className="text-primary" />
              {/* <IconHeartFill className="text-primary" /> */}

              <a href={sound.downloadUrl}>
                <IconDownload className="h-7 w-7 text-primary" />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AudioPlayerList;

// ToDo:
// Add to favorites functionality
