import { useState } from "react";

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
    borderRadius: "28px"
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
      <div className=" w-full px-6">
        <div className="flex w-full flex-col gap-3">
          {selectedType?.sounds?.map((sound) => (
            <div
              key={selectedType?.type}
              className="g-1 flex w-full items-center justify-between rounded-lg p-4 shadow-md"
            >
              <p
                className={`${poppins.className} text-sm font-bold capitalize`}
              >
                {formatSoundNameFromUrl(sound.pathname)}
              </p>
              <audio
                controls
                controlsList="nodownload"
                src={sound.url}
                style={audioPLayerStyle}
              />
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
