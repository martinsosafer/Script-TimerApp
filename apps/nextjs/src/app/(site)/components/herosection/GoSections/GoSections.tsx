import React from "react";

import { RevealText } from "~/app/animations/RevealText";
import SlideCards from "../../slide-cards";

export default function GoSections() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center px-10 py-10 md:py-10">
      <div className="max-3xl  mx-auto block py-6 text-center ">
        <RevealText>
          <h2 className="mb-4 text-center text-5xl font-semibold">
            <span className="block  font-poppins text-primary">
              Explore and be your best
            </span>
          </h2>
        </RevealText>
      </div>
      <SlideCards />
    </div>
  );
}
