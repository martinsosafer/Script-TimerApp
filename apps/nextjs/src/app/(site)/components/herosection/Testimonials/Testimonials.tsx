import React from "react";

import { RevealText } from "~/app/animations/RevealText";
import { poppins, roboto } from "~/app/fonts";
import Slide from "./slide";

export default function Testimonials() {
  return (
    <div className={`relative py-[32px] ${poppins.className}`}>
      <div className="mx-auto flex flex-col items-center justify-center">
        {/* Heading and description */}
        <div className="mb-6 flex h-[150px] w-[321px] flex-col items-center justify-center text-center">
          <RevealText>
            <h2 className="text-cp-primary text-[26px] font-bold leading-[31px]">
              What our members
              <br /> have to say
            </h2>
          </RevealText>
          <RevealText>
            <p
              className={`${roboto.className} text-[14px] font-normal leading-[20px]`}
            >
              Our members have witnessed a marked improvement in their skills
              for speech and content creation.
            </p>
          </RevealText>
        </div>

        {/* Slide component */}
        <div className="w-full">
          <Slide />
        </div>
      </div>
    </div>
  );
}
