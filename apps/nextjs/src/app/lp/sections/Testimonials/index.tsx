import React from "react";

import { RevealText } from "~/app/animations/RevealText";
import { poppins, roboto } from "~/app/fonts";
import Slide from "./slide";

export default function Testimonials() {
  return (
    <div className="bg-cp-background flex w-full flex-col justify-center p-4 pt-5 lg:flex-row lg:gap-[60px] lg:p-10 lg:pt-20">
      {/* First column */}
      <div className="flex w-[269px] flex-col">
        <RevealText>
          <h2
            className={`${poppins.className} text-cp-primary text-[34px] font-bold leading-[40px]`}
          >
            What our members have to say
          </h2>
        </RevealText>
        <RevealText>
          <p
            className={`${roboto.className} mt-2 text-[16px] font-normal leading-[22px]`}
          >
            Our members have witnessed a marked improvement in their skills for
            speech and content creation.
          </p>
        </RevealText>
      </div>

      {/* Second column */}
      <div className="h-[315px] w-[700px]">
        <Slide />
      </div>
    </div>
  );
}
