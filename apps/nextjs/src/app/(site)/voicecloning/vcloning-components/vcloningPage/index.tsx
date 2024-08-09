"use client";

import * as React from "react";

import { IconInfo } from "@voiceai/ui/@/components/ui/icons";

import { api } from "~/utils/api";
import CustomVoiceCards from "../cloningCard";
import VoiceCloningForm from "../cloningForm";

export default function VoiceCloningPage() {
  // Use the query hook directly inside the functional component
  const { data: customVoices = [], refetch } =
    api.voiceCustom.listAllCustomVoices.useQuery("", {
      refetchOnWindowFocus: true,
    });
  console.log("CUSTOMVOICE==", customVoices);
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center">
      <main className="mt-10 flex w-full flex-col items-center px-4 text-center">
        <h1 className="max-w-2xl font-poppins text-4xl font-bold text-primary sm:text-5xl">
          Voice Cloning
        </h1>
        <p className="sm:text-md text-md mt-5 max-w-md font-poppins font-bold text-black">
          You can add your own voices by recording or
          <br />
          uploading sound files below
        </p>
        <div className="mt-2 flex max-w-md items-start text-sm text-slate-500 sm:text-sm">
          <div className="flex h-9 w-9 items-center justify-center gap-3 rounded-lg border-2 border-[#1877F290] bg-blue-300">
            <IconInfo className="text-black" />
          </div>
          <span className="ml-3">
            Use a clean recording without background sounds.
            <br />
            Contain 1 speaker over 1 minute long.
            <br />
            You can record your own voice below with our sample script, or your
            own.
          </span>
        </div>
        <hr className="border-1 my-5 h-px bg-gray-700 dark:bg-gray-700" />
        <VoiceCloningForm onVoiceCreated={refetch} />
      </main>
      <div className="mb-4 mt-4">
        <CustomVoiceCards customVoices={customVoices} refetch={refetch} />
      </div>
    </div>
  );
}
