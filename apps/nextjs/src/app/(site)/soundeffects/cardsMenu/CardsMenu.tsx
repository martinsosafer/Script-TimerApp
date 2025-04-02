import { useState } from "react";

import {
  IconDownload,
  IconHeart,
  IconHeartFill,
  IconMusic,
} from "@voiceai/ui/@/components/ui/icons";

import { poppins } from "~/app/fonts";
import type { Blob } from "../types";

interface CardsMenuProps {
  data: SoundType[] | undefined;
  icons: JSX.Element[];
}

interface SoundType {
  type: string;
  sounds: Blob[];
}

const CardsMenu = ({ data, icons }: CardsMenuProps) => {
  const [selectedType, setSelectedType] = useState<SoundType | null>(null);

  const audioPLayerStyle = {
    // backgroundColor: "red",
    boxShadow: "0px 1px 3px 0px rgba(0,0,0,0.4)",
    borderRadius: "28px",
  };

  console.log("selectedSection", selectedType);
  // console.log("data", data);

  const formatSoundNameFromUrl = (pathname: string) => {
    const splitPath = pathname.split("/");
    const soundName = splitPath[splitPath.length - 1]?.split(".")[0];
    const formattedSoundName = soundName?.replace(/-/g, " ");
    return formattedSoundName;
  };

  if (selectedType) {
    return (
      <div className="flex w-full flex-col gap-4 px-10 py-4">
        <h2
          className={`${poppins.className} text-center text-xl font-bold capitalize`}
        >
          {selectedType.type}
        </h2>
        <div className="flex w-full flex-col gap-3">
          {selectedType?.sounds?.map((sound) => (
            <div
              key={selectedType?.type}
              className="flex w-full items-center justify-between rounded-lg p-4 shadow-md"
            >
              <div className="flex items-center gap-4 ">
                <i className="rounded-full bg-[#7FB2FF] p-3">
                  <IconMusic className="h-6 w-6 text-white" />
                </i>
                <p
                  className={`${poppins.className} text-sm font-bold capitalize`}
                >
                  {formatSoundNameFromUrl(sound.pathname)}
                </p>
              </div>
              <div className="flex items-center gap-8">
                <audio
                  controls
                  controlsList="nodownload"
                  src={sound.url}
                  style={audioPLayerStyle}
                />
                <div className="flex items-center gap-4">
                  <IconHeart className="text-primary" />
                  {/* <IconHeartFill className="text-primary" /> */}
                  <button>
                    <IconDownload className="h-7 w-7 text-primary" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(160px,1fr))] justify-items-center gap-x-5 gap-y-10 py-3 max-sm:grid-cols-[repeat(auto-fill,minmax(140px,1fr))] max-sm:gap-x-2 max-sm:gap-y-6">
      {data?.map((section, i) => (
        <button
          key={i}
          className="flex h-[108px] w-[140px] flex-col items-center justify-between rounded-lg p-3 shadow-md"
          onClick={() => setSelectedType(section)}
        >
          <i>{icons[i]}</i>
          <p className={`${poppins.className} text-sm font-bold capitalize`}>
            {section.type}
          </p>
        </button>
      ))}
    </div>
  );
};

export default CardsMenu;
