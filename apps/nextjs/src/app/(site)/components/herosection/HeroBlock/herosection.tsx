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
      <MotionTransition>
        <h1 className="py-6 text-center font-poppins text-3xl font-bold tracking-tighter text-primary sm:text-5xl xl:text-6xl/none">
          Welcome
        </h1>
      </MotionTransition>
      <div className="relative px-6 ">
        <div className=" mx-auto mt-2 grid max-w-5xl items-start  md:grid-cols-2">
          <div className="mt-4">
            <RevealText>
              <h1 className=" font-poppins text-4xl font-semibold sm:text-4xl xl:text-4xl/none">
                Idea to Script to Voice
                <span className="mt-2 block text-primary">in Seconds</span>
              </h1>
            </RevealText>
            <RevealText>
              <p className="mt-8 max-w-md">
                Only our custom built Ai and classes support every area of your
                work. Multiple Ai models will save you hours of work and extra
                expenses - guaranteed. What do you want to create?
              </p>
            </RevealText>
            <RevealText>
              <div className="mt-8 flex justify-center gap-3">
                <PrimaryButton onClick={TextToVoiceClick}>
                  <Link href="/texttovoice">Text to Voice</Link>
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

          <MotionTransition className="flex items-start justify-center">
            <div className="w-full">
              <iframe
                src="https://player.vimeo.com/video/969324308?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                className="h-[340px] w-[520px] "
                allow="autoplay; fullscreen; picture-in-picture"
                title="Script-Timer Ai_ On boarding video (Short version) (1)"
              />
            </div>
          </MotionTransition>
        </div>
      </div>
    </div>
  );
}
