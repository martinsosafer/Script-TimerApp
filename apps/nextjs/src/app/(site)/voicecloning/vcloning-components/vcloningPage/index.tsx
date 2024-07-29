import * as React from "react";

import VoiceCloningForm from "../cloningForm";

export default function VoiceCloningPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center py-2">
      <main className=" mb-8 flex w-full flex-1 flex-col items-center justify-center px-4 text-center sm:mt-10">
        <h1 className="max-w-2xl font-poppins text-4xl font-bold text-primary sm:text-5xl">
          Voice Cloning
        </h1>
        <p className="sm:text-md text-md mt-5 max-w-md  font-poppins  font-bold text-black">
          Using Script Timer Ai , you can create different voices
          <br />
          if you provide a sound file
        </p>

        <hr className="border-1 h-px bg-gray-700 dark:bg-gray-700" />
      </main>
      <VoiceCloningForm />
    </div>
  );
}
