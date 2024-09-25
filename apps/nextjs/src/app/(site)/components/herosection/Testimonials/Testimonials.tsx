import React from "react";

import { RevealText } from "~/app/animations/RevealText";
import Slide from "./slide";

export default function Testimonials() {
  return (
    <div className="lg:py-15 relative mb-10 md:py-10 xl:py-20">
      <div className="mx-auto mt-10   grid h-[500px]  max-w-5xl  items-start md:grid-cols-3">
        {/* First column */}
        <div className="mt-20 md:col-span-1">
          <RevealText>
            <h2 className="mb-5 font-poppins text-3xl font-semibold">
              What our <br />
              students have <br />
              to say
            </h2>
          </RevealText>
          <RevealText>
            <p className=" font-poppins text-base font-bold text-primary">
              Our students have witnessed a marked <br />
              improvement in their skills for speech
              <br />
              and content creation.
            </p>
          </RevealText>
        </div>

        {/* Carousel column with additional margin */}
        <div className="mt-20 md:col-span-2 md:ml-14">
          {" "}
          {/* Add margin left for separation */}
          <Slide />
        </div>
      </div>
    </div>
  );
}
