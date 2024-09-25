"use client";

import React from "react";
import Link from "next/link";

import { TextToVoiceClick } from "~/app/_components/googleAnalytics/LandingEvents/LandingEvents";
import { RevealText } from "~/app/animations/RevealText";
import PrimaryButton from "../../primary-button";
import MotionTransition from "../MotionTransition/MotionTransition";

export default function HeroSection() {
  return (
    <div>
      <div className="relative px-6 py-10 ">
        <div className=" mx-auto mt-2 grid max-w-5xl items-start  md:grid-cols-2">
          <div className="mt-8">
            <RevealText>
              <h1 className=" font-poppins text-4xl font-semibold sm:text-4xl xl:text-4xl/none">
                Idea to Script to Voice
                <span className="mt-1 block text-primary">in Seconds</span>
              </h1>
            </RevealText>
            <RevealText>
              <p className="mt-6 max-w-md">
                Only our custom built Ai and classes support every area of your
                work. Multiple Ai models will save you hours of work and extra
                expenses - guaranteed. What do you want to create?
              </p>
            </RevealText>
            <RevealText>
              <div className="mt-10 flex justify-center gap-7">
                <PrimaryButton onClick={TextToVoiceClick}>
                  <Link href="/texttovoice">Text to Voice</Link>
                </PrimaryButton>
                <PrimaryButton>
                  <Link href="/chat">Script Coach</Link>
                </PrimaryButton>
                <PrimaryButton>
                  <Link href="/masterclasses" target="_blank">
                    University
                  </Link>
                </PrimaryButton>
              </div>
            </RevealText>
          </div>

          <MotionTransition className="flex items-start justify-center">
            <div className="h-[340px] w-full overflow-hidden   rounded-lg">
              <iframe
                src="https://player.vimeo.com/video/969324308?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                className="h-full w-full  rounded-lg"
                allow="autoplay; fullscreen; picture-in-picture"
                title="Script-Timer Ai Onboarding video"
              />
            </div>
          </MotionTransition>
        </div>
      </div>
    </div>
  );
}
