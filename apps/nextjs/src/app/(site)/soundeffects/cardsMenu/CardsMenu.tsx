import { useState } from "react";

import { Button } from "@voiceai/ui";
import {
  IconChevronLeft,
  IconDownload,
  IconHeart,
  IconHeartFill,
  IconMusic,
  IconSearch,
} from "@voiceai/ui/@/components/ui/icons";

import { poppins } from "~/app/fonts";
import type { Blob } from "../types";

interface CardsMenuProps {
  data: SoundType[] | undefined;
  icons: JSX.Element[];
  isLoading: boolean;
  isError: boolean;
  title: string;
}

interface SoundType {
  type: string;
  sounds: Blob[];
}

const CardsMenu = ({
  data,
  icons,
  isLoading,
  isError,
  title,
}: CardsMenuProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedType, setSelectedType] = useState<SoundType | null>(null);

  const audioPLayerStyle = {
    boxShadow: "0px 1px 3px 0px rgba(0,0,0,0.4)",
    borderRadius: "28px",
  };

  // console.log("selectedSection", selectedType);
  // console.log("data", data);

  const formatSoundNameFromUrl = (pathname: string) => {
    const splitPath = pathname.split("/");
    const soundName = splitPath[splitPath.length - 1]?.split(".")[0];
    const formattedSoundName = soundName?.replace(/-/g, " ");
    return formattedSoundName;
  };

  if (isError) {
    return (
      <div className="flex h-[200px] w-full items-center justify-center">
        <p className={`${poppins.className} text-lg font-bold`}>
          Error loading {title}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-[200px] w-full items-center justify-center">
        <p className={`${poppins.className} text-lg font-bold`}>
          Loading {title}...
        </p>
      </div>
    );
  }

  // Audio player list
  if (selectedType) {
    return (
      <div className="flex w-full flex-col items-center gap-5 px-10 py-2">
        <div className="flex w-full items-center justify-between">
          <Button
            variant="ghost"
            className={`${poppins.className} w-min p-0 text-base text-primary hover:text-primary hover:opacity-80`}
            onClick={() => setSelectedType(null)}
          >
            <IconChevronLeft className="h-7 w-7" />
          </Button>
          <h2
            className={`${poppins.className} text-center text-xl font-bold capitalize`}
          >
            {selectedType.type}
          </h2>
          <div />
        </div>
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
        <Button
          variant="ghost"
          className={`${poppins.className} w-min text-base text-primary hover:text-primary hover:opacity-80`}
          onClick={() => setSelectedType(null)}
        >
          Go back
        </Button>
      </div>
    );
  }

  // Cards list
  return (
    <>
      {/* Searchbar */}
      <div
        className={`flex w-full items-center gap-2 rounded-lg border-2 ${searchValue ? "border-[#212121]" : "border-[#898F98]"} bg-transparent p-2 lg:w-[46%]`}
      >
        <IconSearch
          className={`h-5 w-5 ${searchValue ? "text-[#212121]" : "text-gray-400"}`}
        />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
          className="w-full outline-none"
          placeholder={`Search for ${title.toLowerCase()}`}
        />
      </div>

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
    </>
  );
};

export default CardsMenu;
