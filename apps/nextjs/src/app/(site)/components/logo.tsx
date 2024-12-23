import React from "react";

import { poppins } from "~/app/fonts";

const Logo = ({
  className = "",
  coColor = "black",
  producerColor = "primary",
}) => {
  return (
    <div className="flex flex-col items-start">
      <div className={`hidden items-center lg:flex ${poppins.className}`}>
        <span className={`font-poppins text-5xl font-bold text-${coColor}`}>
          C
          <span
            className={`relative -top-[5px] font-poppins text-4xl font-bold text-${coColor}`}
          >
            o
          </span>
        </span>
        <span className="mx-1 text-black">-</span>
        <span
          className={`font-poppins text-5xl font-bold text-${producerColor}`}
        >
          P
        </span>
        <span
          className={`relative -top-[2.5px] font-poppins text-4xl font-bold text-${producerColor}`}
        >
          roducer
        </span>
      </div>
      <div className="flex items-center lg:hidden">
        <span className={`font-poppins text-2xl font-bold text-${coColor}`}>
          Co
        </span>
        <span className="mx-1 text-black">-</span>
        <span
          className={`font-poppins text-2xl font-bold text-${producerColor}`}
        >
          Producer
        </span>
      </div>
      <span className="-mt-1 hidden w-full text-right font-poppins text-sm font-medium text-white lg:block">
        Created by Script-Timer
      </span>
    </div>
  );
};

export default Logo;
