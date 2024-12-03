import React from "react";

import { RevealText } from "~/app/animations/RevealText";
import { roboto } from "~/app/fonts";
import Slide from "./slide";

export default function Testimonials() {
  return (
    <div className="relative py-[40px] sm:py-[80px]">
      <div className="mx-4 grid max-w-5xl items-start gap-y-8 sm:mx-[200px] sm:grid-cols-[1fr] sm:gap-x-[50px] sm:gap-y-0 md:grid-cols-[269px_650px]">
        {/* First column */}
        <div className="text-center sm:text-left">
          <RevealText>
            <h2 className="text-cp-primary xs:text-[28px] xs:leading-[34px] mb-3 mt-3 font-poppins text-[24px] font-bold leading-[30px] sm:mb-5 sm:mt-5 sm:text-[34px] sm:leading-[41px]">
              What our <br className="hidden sm:inline" />
              members have <br className="hidden sm:inline" />
              to say
            </h2>
          </RevealText>
          <RevealText>
            <p
              className={`${roboto.className} xs:text-[14px] xs:leading-[20px] text-[12px] font-normal leading-[18px] sm:text-[16px] sm:leading-[22.4px]`}
            >
              Our members have witnessed a
              <br className="hidden sm:inline" /> marked improvement in their
              skills for <br className="hidden sm:inline" /> speech and content
              creation.
            </p>
          </RevealText>
        </div>

        {/* Second column */}
        <div className="xs:w-auto w-full">
          <Slide />
        </div>
      </div>
    </div>
  );
}
