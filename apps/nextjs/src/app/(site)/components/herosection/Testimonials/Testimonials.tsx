import React from "react";

import { RevealText } from "~/app/animations/RevealText";
import Slide from "./slide";

export function Testimonials() {
  return (
    <div className="relative p-8 md:py-20">
      <div className="mx-auto my-6 grid max-w-5xl gap-8 md:grid-cols-2">
        <RevealText>
          <h2 className="mb-5 font-poppins text-5xl font-semibold">
            What our students have to say
          </h2>
        </RevealText>
        <RevealText>
          <div className="mt-2 self-center">
            <p className="font-bold text-primary">
              Our students have witnessed a marked improvement in their skills
              for speech and content creation.
            </p>
          </div>
        </RevealText>
      </div>
      <Slide />
    </div>
  );
}
