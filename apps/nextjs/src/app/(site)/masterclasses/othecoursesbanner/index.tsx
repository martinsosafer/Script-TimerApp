import React from "react";
import Link from "next/link";

import { poppins } from "~/app/fonts";

export default function OtherCoursesBanner() {
  return (
    <div
      className={`bg-cp-accent h-[245px] w-full ${poppins.className} flex flex-col items-center`}
    >
      {/* Heading */}
      <h3 className="text-cp-primary mt-[40px] text-center text-[24px] font-bold leading-[34px]">
        Increase revenue and save time with these courses
      </h3>

      {/* Cards */}
      <div className="mt-[24px] flex gap-x-[60px]">
        <Link href={`/masterclasses/2/1`} target="_blank">
          <div className="bg-cp-primary flex h-[107px] w-[176px] items-center justify-center rounded-lg">
            <h4 className="text-cp-secondary-lightest text-center text-[16px] font-bold leading-[22px]">
              How to create stunning videos
            </h4>
          </div>
        </Link>
        <Link href={`/masterclasses/3/1`} target="_blank">
          <div className="bg-cp-primary flex h-[107px] w-[176px] items-center justify-center rounded-lg">
            <h4 className="text-cp-secondary-lightest text-center text-[16px] font-bold leading-[22px]">
              Present and win your audience
            </h4>
          </div>
        </Link>
        <Link href={`/masterclasses/4/1`} target="_blank">
          <div className="bg-cp-primary flex h-[107px] w-[176px] items-center justify-center rounded-lg">
            <h4 className="text-cp-secondary-lightest text-center text-[16px] font-bold leading-[22px]">
              Create with Hollywood movie storylines
            </h4>
          </div>
        </Link>
        <Link href={`/masterclasses/5/1`} target="_blank">
          <div className="bg-cp-primary flex h-[107px] w-[176px] items-center justify-center rounded-lg">
            <h4 className="text-cp-secondary-lightest text-center text-[16px] font-bold leading-[22px]">
              How to build rapport with your audience
            </h4>
          </div>
        </Link>
      </div>
    </div>
  );
}
