"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import NoSessionModal from "~/app/(site)/components/modals/no-session-modal";
import AudioTranslate from "../AudioTranslate";
import TextTranslate from "../TextTranslate";

export default function TranslatorPage({
  subData,
}: {
  subData: SubscriptionData | null | undefined;
}) {
  const [mode, setMode] = React.useState<boolean>(true);
  const [openNoSessionModal, setOpenNoSessionModal] =
    React.useState<boolean>(false);
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center py-2">
      <main className="mb-8 flex w-full flex-1 flex-col items-center justify-center px-4 text-center sm:mt-10">
        <h1 className="max-w-2xl font-poppins text-4xl font-bold text-primary sm:text-5xl">
          Let's Translate
        </h1>
        <p className="sm:text-md text-md mt-5 max-w-md font-poppins font-bold text-black">
          Using Script Timer AI, you can translate text
          <br />
          into multiple languages.
        </p>
        <p className="sm:text-md text-md mt-2 max-w-md font-poppins font-bold text-black">
          Enter the text or upload an audio file:
        </p>
        <div className="mb-[-5px] mt-5 flex">
          <button
            className={`rounded-md px-4 py-2 font-semibold ${
              mode ? "bg-primary text-white" : "bg-gray-300 text-black"
            }`}
            onClick={() => setMode(!mode)}
          >
            Translate Text
          </button>
          <button
            className={`rounded-md px-4 py-2 font-semibold ${
              !mode ? "bg-primary text-white" : "bg-gray-300 text-black"
            }`}
            onClick={() => setMode(!mode)}
          >
            Translate Audio
          </button>
        </div>
        {mode ? (
          <TextTranslate
            subData={subData}
            setOpenNoSessionModal={() => setOpenNoSessionModal(true)}
          />
        ) : (
          <AudioTranslate
            subData={subData}
            setOpenNoSessionModal={() => setOpenNoSessionModal(true)}
          />
        )}
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
