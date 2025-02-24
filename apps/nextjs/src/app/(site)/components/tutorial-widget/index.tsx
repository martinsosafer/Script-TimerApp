"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import { IconMonitorPlay } from "@voiceai/ui/@/components/ui/icons";

import { roboto } from "~/app/fonts";
import TutorialsModal from "../modals/tutorials-modal";

const pagesVideos: Record<string, string> = {
  "/texttovoice": "1036835445",
  "/chat": "1036841246",
  "/masterclasses": "1056542509",
  "/plagiarism-detector": "1036834353",
  "/image-generator": "1036840393",
};

export default function TutorialWidget() {
  const [opentutorial, setOpenTutorial] = useState(false);
  const path = usePathname();

  if (!Object.keys(pagesVideos).includes(path)) return null;

  return (
    <>
      <button
        className={`${roboto.className} bg-cp-secondary-light absolute right-0 top-[140px] z-10 flex h-10 w-10 flex-col items-center justify-center overflow-hidden rounded-l-lg font-bold text-white lg:top-[226px] lg:h-[69px] lg:w-[81px]`}
        onClick={() => setOpenTutorial(true)}
      >
        <IconMonitorPlay className="h-6 w-6 lg:hidden" />

        <span className="hidden text-[19.5px] lg:flex">VIDEO</span>
        <span className="hidden text-[12px] lg:flex">TUTORIAL</span>
      </button>
      {opentutorial && (
        <TutorialsModal
          onClose={() => setOpenTutorial(false)}
          videoCode={pagesVideos[path]!}
        />
      )}
    </>
  );
}
