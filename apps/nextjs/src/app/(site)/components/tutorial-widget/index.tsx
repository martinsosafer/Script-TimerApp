"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import { roboto } from "~/app/fonts";
import TutorialsModal from "../modals/tutorials-modal";

const pagesVideos: Record<string, string> = {
  "/texttovoice": "1036835445",
  "/chat": "1036841246",
  "/masterclasses": "1036832186",
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
        className={`${roboto.className} bg-cp-secondary-light absolute right-0 top-[226px] z-10 flex h-[69px] w-[81px] flex-col items-center justify-center rounded-l-lg font-bold text-white`}
        onClick={() => setOpenTutorial(true)}
      >
        <span className="text-[19.5px]">VIDEO</span>
        <span className="text-[12px]">TUTORIAL</span>
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
