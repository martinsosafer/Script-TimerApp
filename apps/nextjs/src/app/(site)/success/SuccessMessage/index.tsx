"use client";

import React from "react";
import Link from "next/link";

import { TextToVoiceClick } from "~/app/_components/googleAnalytics/LandingEvents/LandingEvents";
import { RevealText } from "~/app/animations/RevealText";
import { poppins } from "~/app/fonts";
import MotionTransition from "../../components/herosection/MotionTransition/MotionTransition";
import PrimaryButton from "../../components/primary-button";

export default function SucessMessage() {
  return (
    <div className={`${poppins.className} relative`}>
      <div className="mb-[40px]  grid  items-start gap-10  px-[122px] pt-[60px] md:grid-cols-2 ">
        <div className=" h-[169px] w-[452px]">
          <RevealText>
            <h1 className=" text-cp-primary font-poppins text-[50px] font-bold leading-[60px]">
              Congratulations!
            </h1>
          </RevealText>
          <RevealText>
            <p className="mt-[25px] justify-start text-start text-[20px] font-normal leading-[28px] ">
              You have upgraded your Co-Producer <br /> to create the highest
              quality content,
              <br /> faster than ever before!
            </p>
          </RevealText>
        </div>

        <MotionTransition className="flex items-center justify-center">
          <div className=" h-[169px] w-[288px]   overflow-hidden rounded-2xl border-2 border-blue-800  bg-blue-700  ">
            <iframe
              src="https://player.vimeo.com/video/969324308?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
              className="h-full w-full  rounded-lg"
              allow="autoplay; fullscreen; picture-in-picture"
              title="Script-Timer Ai Onboarding video"
            />
          </div>
        </MotionTransition>
      </div>
      <div className="mx-auto mb-10 flex w-full justify-center text-center">
        <RevealText>
          <h2 className="text-cp-secondary text-[50px] font-bold leading-[60px]">
            Thank you for joining us!
          </h2>
        </RevealText>
      </div>
    </div>
  );
}
