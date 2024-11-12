"use client";

import * as React from "react";

import NoSessionModal from "~/app/(site)/components/modals/no-session-modal";
import TextTranslate from "../texttranslate/index";

export default function TextTranslatorPage({
  subData,
  openAiCredits,
}: {
  subData: SubscriptionData | null | undefined;
  openAiCredits: number;
}) {
  const [openNoSessionModal, setOpenNoSessionModal] =
    React.useState<boolean>(false);

  return (
    <div className="mx-auto mb-4 flex min-h-screen max-w-5xl flex-col items-center justify-center">
      <main className="mb-8 flex w-full flex-1 flex-col  items-center justify-start px-4 text-center sm:mt-10">
        <p className="sm:text-md text-md max-w-md font-poppins font-bold text-black">
          Enter the text you want to translate:
        </p>

        <TextTranslate
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
