import React from "react";

import { RevealText } from "~/app/animations/RevealText";
import { roboto } from "~/app/fonts";
import Slide from "./slide";

export default function Testimonials() {
  return (
    <div className="relative py-[80px]">
      <div className="mx-[200px] grid h-[300px] max-w-5xl items-start gap-x-[50px] md:grid-cols-[269px_650px]">
        {/* First column */}
        <div>
          <RevealText>
            <h2 className="text-cp-primary mb-5 mt-5 font-poppins text-[34px] font-bold leading-[41px]">
              What our <br />
              members have <br />
              to say
            </h2>
          </RevealText>
          <RevealText>
            <p
              className={`${roboto.className} text-[16px] font-normal leading-[22.4px]`}
            >
              Our members have witnessed a<br /> marked improvement in their
              skills for <br /> speech and content creation.
            </p>
          </RevealText>
        </div>

        {/* Second column */}
        <div>
          <Slide />
        </div>
      </div>
    </div>
  );
}
