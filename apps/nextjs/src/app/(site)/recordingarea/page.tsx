import type { Metadata } from "next";

import { auth } from "@voiceai/auth";

import ModeSelectorRecorder from "./mode-selector-recorder";
import Recorder from "./recorder";
import ScreenRecorder from "./screenrecorder";

export const metadata: Metadata = {
  title: "Recording Area",
  description: "Record audio, video or your screen",
};

export default async function indexPage() {
  const session = await auth();
 
  const userId = session?.user.id;
  return (
    <div className="flex min-h-screen w-full items-center justify-center ">
      <div className="flex w-[1024px] flex-col py-10">
        <div className="flex flex-col items-center">
          <h2 className="font-poppins  text-3xl text-[#0066FF]">
            Record and Transcribe
          </h2>
          <p className="text-center text-gray-900">
            Capture your voice, video, and/or screen record
          </p>
        </div>
        <ModeSelectorRecorder userId={userId} />
      </div>
    </div>
  );
}
