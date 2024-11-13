"use client";

import React from "react";
import Image from "next/image";

import {
  FileImageIcon,
  IconAudioLines,
  IconBookPlus,
  IconBrainCog,
  IconClone,
  IconCopyright,
  IconEar,
  IconFileHeart,
  IconGlobe,
  IconGraduationCap,
  IconLibraryBig,
  IconMic2,
  IconNoAi,
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
  IconGlobe,
  IconNoAi,
  FileImageIcon,
  IconCopyright,
};
export default function ServiceSection() {
  return (
    <div className="relative mb-12 bg-slate-200 px-6 py-10 md:py-16">
      <div className="mx-auto max-w-6xl">
        <RevealText>
          <div className=" justify-center text-center align-middle">
            <h2 className="mb-8 ml-32 text-center font-poppins text-4xl font-semibold md:text-4xl">
              <span className="block text-center text-black">
                You have a project
              </span>
              <span className="text-center text-primary">
                Bring it to life with custom AI built for scripts
              </span>
            </h2>
          </div>
        </RevealText>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className=" -mt-4 flex items-center justify-center self-start md:row-span-3">
            {/* Ensures the image starts at the top, aligned with other columns */}
            <Image
              src={ArtificialIntelligenceRobot}
              alt="AI Robot"
              width={800}
              height={880}
              className=" rounded-lg" // Slightly taller than other columns
            />
          </div>

          <div className="grid gap-2">
            {servicesData
              .slice(0, 4)
              .map(({ id, icon, title, description }) => {
                const IconComponent = iconComponents[icon];
                return (
                  <RevealText key={id}>
                    <div className="flex h-full w-[230px] flex-col rounded-lg border border-black bg-white px-4 shadow-sm transition-shadow hover:shadow-md">
                      <div className="flex flex-grow items-start gap-2">
                        <div className="flex-shrink-0">
                          <IconComponent className="h-8 w-8 text-tertiary" />
                        </div>
                        <div>
                          <h4 className="font-poppins text-sm font-semibold text-primary">
                            {title}
                          </h4>
                          <p className="text-xs text-gray-600">{description}</p>
                        </div>
                      </div>
                    </div>
                  </RevealText>
                );
              })}
          </div>

          <div className="grid gap-2">
            {servicesData
              .slice(4, 8)
              .map(({ id, icon, title, description }) => {
                const IconComponent = iconComponents[icon];
                return (
                  <RevealText key={id}>
                    <div className="flex h-full w-[230px] flex-col rounded-lg border border-black bg-white px-4 shadow-sm transition-shadow hover:shadow-md">
                      <div className="flex flex-grow items-start gap-2">
                        <div className="flex-shrink-0">
                          <IconComponent className="h-8 w-8 text-tertiary" />
                        </div>
                        <div>
                          <h4 className="font-poppins text-sm font-semibold text-primary">
                            {title}
                          </h4>
                          <p className="text-xs text-gray-600">{description}</p>
                        </div>
                      </div>
                    </div>
                  </RevealText>
                );
              })}
          </div>

          <div className="grid gap-2">
            {servicesData
              .slice(8, 12)
              .map(({ id, icon, title, description }) => {
                const IconComponent = iconComponents[icon];
                return (
                  <RevealText key={id}>
                    <div className="flex h-full w-[230px] flex-col rounded-lg border border-black bg-white px-4 shadow-sm transition-shadow hover:shadow-md">
                      <div className="flex flex-grow items-start gap-2">
                        <div className="flex-shrink-0">
                          <IconComponent className="h-8 w-8 text-tertiary" />
                        </div>
                        <div>
                          <h4 className="font-poppins text-sm font-semibold text-primary">
                            {title}
                          </h4>
                          <p className="text-xs text-gray-600">{description}</p>
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
