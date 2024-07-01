"use client";

import React from "react";
import Link from "next/link";

import { AspectRatio } from "@voiceai/ui/@/components/ui/aspect-ratio";

import { TextToVoiceClick } from "~/app/_components/googleAnalytics/LandingEvents/LandingEvents";
import { RevealText } from "~/app/animations/RevealText";
import PrimaryButton from "../../primary-button";
import MotionTransition from "../MotionTransition/MotionTransition";

export default function HeroSection() {
  return (
    <div>
      <MotionTransition>
        <h1 className="py-6 text-center font-poppins text-3xl  font-bold tracking-tighter text-primary sm:text-5xl  xl:text-6xl/none">
          Welcome
        </h1>
      </MotionTransition>
      <div className="relative">
        <div className="mx-auto mt-2 grid max-w-5xl md:grid-cols-2">
          <div className="mt-4">
            <RevealText>
              <h1 className="font-poppins text-2xl font-semibold sm:text-3xl xl:text-5xl/none">
                From Idea to Script to Voice in
                <span className="block text-primary"> Seconds</span>
              </h1>
            </RevealText>
            <RevealText>
              <p className="max-w-md">
                Only these custom build Ai's and classes were built for success
                for scripts.
              </p>
              <p>
                Build with multiple Ai models to save you hours of work and
                thousands in expense. Try:
              </p>
            </RevealText>
            <RevealText>
              <div className="flex justify-center gap-3">
                <PrimaryButton onClick={TextToVoiceClick}>
                  <Link href="/texttospeech">Text to Voice</Link>
                </PrimaryButton>
                <PrimaryButton>
                  <Link href="/chat">Script Coach</Link>
                </PrimaryButton>
                <PrimaryButton>
                  <Link href="/masterclasses" target="_blank">
                    Masterclasses
                  </Link>
                </PrimaryButton>
              </div>
            </RevealText>
          </div>

          <MotionTransition className="ml-8 mt-6 flex items-center justify-center md:ml-4 lg:ml-2 xl:ml-0">
            <AspectRatio
              ratio={15 / 9}
              style={{
                maxWidth: "1400px",
              }}
            >
              <iframe
                src="https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                className="flex h-full w-full items-center justify-center border-4 border-primary"
                allow="autoplay; fullscreen; picture-in-picture"
                title="Script-Timer Ai_ On boarding video (Short version) (1)"
              />
            </AspectRatio>
          </MotionTransition>
        </div>
      </div>
    </div>
  );
}
