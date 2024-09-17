"use client";

import React from "react";
import Image from "next/image";

import {
  IconAudioLines,
  IconBookPlus,
  IconBrainCog,
  IconClone,
  IconEar,
  IconFileHeart,
  IconGraduationCap,
  IconLibraryBig,
  IconMic2,
} from "@voiceai/ui/@/components/ui/icons";

import { RevealText } from "~/app/animations/RevealText";
import ArtificialIntelligenceRobot from "../../../../../../public/Artificial-Intelligence-2--Streamline-Brooklyn 1.png";
import { servicesData } from "./servicesdata";

const iconComponents = {
  IconAudioLines,
  IconBookPlus,
  IconBrainCog,
  IconFileHeart,
  IconGraduationCap,
  IconLibraryBig,
  IconMic2,
  IconClone,
  IconEar,
};
export default function ServiceSection() {
  return (
    <div className="relative px-6 py-10 md:py-16">
      <div className="mx-auto max-w-6xl">
        <RevealText>
          <h2 className="mb-8 text-center font-poppins text-4xl font-semibold leading-tight md:text-5xl">
            <span className="block text-gray-800">You have a project.</span>
            <span className="text-primary">
              Bring it to life with custom AI built for scripts.
            </span>
          </h2>
        </RevealText>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex items-center justify-center">
            <Image
              src={ArtificialIntelligenceRobot}
              alt="AI Robot"
              width={535}
              height={535}
              className="rounded-lg"
            />
          </div>

          <div className="grid gap-2">
            {servicesData
              .slice(0, 4)
              .map(({ id, icon, title, description }) => {
                const IconComponent = iconComponents[icon];
                return (
                  <RevealText key={id}>
                    <div className="flex h-full w-[250px] flex-col rounded-lg border border-black bg-white px-4 shadow-sm transition-shadow hover:shadow-md">
                      <div className="flex flex-grow items-start gap-2">
                        <div className="flex-shrink-0">
                          <IconComponent className="h-12 w-12 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-poppins text-base font-semibold text-primary">
                            {title}
                          </h4>
                          <p className="mt-1 text-xs text-gray-600">
                            {description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </RevealText>
                );
              })}
          </div>

          <div className="grid gap-2">
            {servicesData
              .slice(5, 6)
              .map(({ id, icon, title, description }) => {
                const IconComponent = iconComponents[icon];
                return (
                  <RevealText key={id}>
                    <div className="flex h-full w-[250px] flex-col rounded-lg border border-black bg-white px-4 shadow-sm transition-shadow hover:shadow-md">
                      <div className="flex flex-grow items-start gap-2">
                        <div className="flex-shrink-0">
                          <IconComponent className="h-12 w-12 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-poppins text-base font-semibold text-primary">
                            {title}
                          </h4>
                          <p className="mt-1 text-xs text-gray-600">
                            {description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </RevealText>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
