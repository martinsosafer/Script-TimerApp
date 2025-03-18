"use client";

import * as React from "react";

import { IconInfo } from "@voiceai/ui/@/components/ui/icons";

import NoSessionModal from "~/app/(site)/components/modals/no-session-modal";
import AudioTranslate from "../atranslatepage";

export default function AudioTranslatorPage({
  subData,
  openAiCredits,
}: {
  subData: SubscriptionData | null | undefined;
  openAiCredits: number;
}) {
  const [openNoSessionModal, setOpenNoSessionModal] =
    React.useState<boolean>(false);

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center">
      <main className="mb-8 flex w-full flex-1 flex-col items-center justify-start px-4 text-center ">
        <p className="sm:text-md text-md max-w-md font-poppins font-bold text-black">
          Upload a file with the audio you want to translate:
        </p>

        <div className="mb-4 mt-2 flex max-w-md items-center gap-2 rounded-md border border-amber-300 bg-amber-50 px-4 py-2 text-amber-800">
          <IconInfo className="h-4 w-4 flex-shrink-0" />
          <p className="text-sm">Maximum audio file size is 25 MB</p>
        </div>

        <AudioTranslate
          subData={subData}
          setOpenNoSessionModal={() => setOpenNoSessionModal(true)}
          openAiCredits={openAiCredits}
        />
        {openNoSessionModal && (
          <NoSessionModal
            page="translator"
            openModal={openNoSessionModal}
            setOpenModal={setOpenNoSessionModal}
            subData={subData}
          />
        )}
        <hr className="border-1 h-px bg-gray-700 dark:bg-gray-700" />
      </main>
      <footer className="w-full">
        <p className="flex justify-center border-t-2 py-2 font-semibold">
          Translate anything with Script Timer!
        </p>
      </footer>
    </div>
  );
}
