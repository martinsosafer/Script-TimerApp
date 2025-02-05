import React from "react";

import { poppins } from "~/app/fonts";

export default function CourseTittle({ courseName }) {
  return (
    <div className="flex h-[204px] w-full items-center justify-center bg-gradient-to-br from-[#0066FF] to-[#000000]">
      <div className="mx-auto w-full max-w-[944px]">
        <div className="text-start">
          <h2
            className={`text-cp-accent text-[24px] font-normal leading-[33px] ${poppins.className}`}
          >
            Masterclasses
          </h2>
          <p
            className={`text-[42px] font-bold leading-[50.4px] text-white ${poppins.className}`}
          >
            {courseName}
          </p>
        </div>
      </div>
    </div>
  );
}
