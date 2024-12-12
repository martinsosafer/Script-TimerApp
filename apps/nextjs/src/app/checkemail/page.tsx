import React from "react";

import { Card, CardContent } from "@voiceai/ui/@/components/ui/card";
import { IconCheck } from "@voiceai/ui/@/components/ui/icons";

import { poppins } from "../fonts";

export default function CheckEmail() {
  return (
    <div
      className={`min-h-screen bg-gradient-to-tr from-black to-blue-500 p-8 ${poppins.className}`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="mb-6 text-6xl font-bold leading-tight text-white">
            Your email was sent. Congrats!
          </h1>
          <p className="mb-8 text-xl text-cyan-300">
            Please check your email to verify and open your free access. Get
            ready to save time, money, and stress:
          </p>
          <p className="mb-12 text-2xl font-semibold text-white">
            In minutes! - not weeks
          </p>

          <h2 className="mb-8 text-4xl font-bold">
            <span className="text-cyan-300">Watch how Co-Producer</span>
            <br />
            <span className="text-white">saves you time, money and stress</span>
          </h2>

          <div className="aspect-video w-full max-w-4xl rounded-lg bg-blue-500 shadow-lg">
            <iframe
              src="https://player.vimeo.com/video/1020211350"
              className="h-full w-full rounded-lg"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}
