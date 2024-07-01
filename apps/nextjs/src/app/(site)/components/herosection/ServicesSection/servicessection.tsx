"use client";

import React from "react";

import {
  IconAudioLines,
  IconBookPlus,
  IconBrainCog,
  IconFileHeart,
  IconGraduationCap,
  IconLibraryBig,
  IconMic2,
} from "@voiceai/ui/@/components/ui/icons";

import { RevealText } from "~/app/animations/RevealText";
import { servicesData } from "./servicesdata";

const iconComponents = {
  IconAudioLines,
  IconBookPlus,
  IconBrainCog,
  IconFileHeart,
  IconGraduationCap,
  IconLibraryBig,
  IconMic2,
};
export default function ServiceSection() {
  return (
    <div className="relative px-6 py-6 md:py-10">
      <div className="mx-auto grid max-w-5xl md:grid-cols-2">
        <div>
          <RevealText>
            <h2 className="font-poppins text-5xl font-semibold   leading-tight">
              <span className="block text-primary">You have an project</span>
              Bring it to life with <br />
              custp, AI built <br />
              for scripts
            </h2>
          </RevealText>
          <RevealText>
            <p className=" mt-4 max-w-md">
              Even for the most most gifted writers, squeezing a lot of of
              information into a short amount of time is extremly hard work
            </p>
          </RevealText>
          <RevealText>
            <p className=" max-w-md">
              The script is critical to your most effective whiteboard video,
              explainer video, speech or feature film
            </p>
          </RevealText>
          <RevealText>
            <p className=" max-w-md">
              If you need help or advice on the script or storyboard,please just
              ask.
            </p>
          </RevealText>
        </div>
        <div className="md:p8 ml-12 grid items-center py-5">
          {servicesData.map(({ id, icon, title, description }) => {
            // Get the corresponding icon component based on the icon name
            const IconComponent = iconComponents[icon];
            return (
              <RevealText key={id}>
                <div className=" group grid grid-flow-col gap-2 rounded-3xl px-4">
                  <div>
                    <IconComponent className=" h-10 w-10" />
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-primary">
                      {title}
                    </h4>
                    <p className="font-medium text-black dark:text-white">
                      {description}
                    </p>
                  </div>
                </div>
              </RevealText>
            );
          })}
        </div>
      </div>
    </div>
  );
}
