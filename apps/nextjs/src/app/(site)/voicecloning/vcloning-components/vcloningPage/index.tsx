import * as React from "react";

import { IconInfo } from "@voiceai/ui/@/components/ui/icons";

import CloningCard from "../cloningCard";
import VoiceCloningForm from "../cloningForm";

export default function VoiceCloningPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center">
      <main className="mt-10 flex w-full flex-col items-center px-4 text-center">
        <h1 className="max-w-2xl font-poppins text-4xl font-bold text-primary sm:text-5xl">
          Voice Cloning
        </h1>
        <p className="sm:text-md text-md mt-5 max-w-md font-poppins font-bold text-black">
          Using Script Timer Ai, you can create different voices
          <br />
          if you provide a sound file
        </p>
        <div className="mt-2 flex max-w-md items-center text-sm text-slate-500 sm:text-sm">
          <div className="flex h-9 w-9 items-center justify-center gap-3 rounded-lg border-2 border-[#1877F290] bg-blue-300">
            <IconInfo className="text-black" />
          </div>
          <span>
            Use a clean sample recording. Samples should contain 1 speaker and
            be over 1 minute long and not contain background noise.
          </span>
        </div>
        <hr className="border-1 my-5 h-px bg-gray-700 dark:bg-gray-700" />
        <VoiceCloningForm />
      </main>
      <div className=" mb-4 mt-4">
        <CloningCard
          name="Sample Voice"
          description="A sample voice for demonstration purposes."
        />
      </div>
    </div>
  );
}
