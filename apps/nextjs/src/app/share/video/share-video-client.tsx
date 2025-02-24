"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import MotionTransition from "~/app/(site)/components/herosection/MotionTransition/MotionTransition";
import { RevealText } from "~/app/animations/RevealText";
import { poppins } from "~/app/fonts";

export default function ShareVideoClient({
  initialUrl,
  sharedByEmail,
}: {
  initialUrl?: string;
  sharedByEmail?: string;
}) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (typeof initialUrl === "string") {
      setVideoUrl(decodeURIComponent(initialUrl));
    }
  }, [initialUrl]);

  if (!videoUrl) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-tr from-black to-blue-500">
        <div className="text-2xl font-bold text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-center bg-gradient-to-tr from-black to-blue-500 p-4 text-white ${poppins.className}`}
    >
      <RevealText>
        {sharedByEmail && (
          <p className="mb-6 mt-6 text-center text-[35px] font-bold leading-[38.5px]">
            This video was shared by{" "}
            <span className="text-cp-secondary">{sharedByEmail}</span>
          </p>
        )}
      </RevealText>
      <MotionTransition>
        <div className="w-full max-w-3xl rounded-lg bg-black bg-opacity-50 p-4 shadow-2xl">
          <video controls className="mx-auto w-full rounded-lg" src={videoUrl}>
            Your browser does not support the video tag.
          </video>
        </div>
      </MotionTransition>
      <div className="mt-8 max-w-2xl text-center">
        <p className="mb-6 text-lg">
          Want to record your own voices? Get help with writing a speech? Create
          images for your presentation? Or maybe just use one of our 100 AI
          voices? IF YOU DO, please join!
        </p>
        <Link href="/register" className="inline-block">
          <button className="bg-cp-secondary hover:bg-cp-secondary-light rounded-full px-8 py-3 text-lg font-bold text-white transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Register Now
          </button>
        </Link>
      </div>
    </div>
  );
}
