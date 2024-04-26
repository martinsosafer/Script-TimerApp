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
    <div className="md:py-15 relative px-6 py-10">
      <div className="mx-auto grid max-w-5xl md:grid-cols-2">
        <div>
          <RevealText>
            <h2 className="font-poppins text-5xl font-semibold">
              <span className="block text-primary">You have an idea</span>
              we help you <br />
              make it real
            </h2>
          </RevealText>
          <RevealText>
            <p className="mt-10 max-w-md">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut
              distinctio corrupti nihil! Autem commodi fuga rem esse placeat
              quos explicabo aliquid sapiente iure eaque architecto, tempora
              mollitia reiciendis veritatis. Tenetur?
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
