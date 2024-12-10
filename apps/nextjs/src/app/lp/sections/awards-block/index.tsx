import Image from "next/image";
import AwardImg1 from "@public/AwardsBlockImg1.png";
import AwardImg2 from "@public/AwardsBlockImg2.png";
import AwardImg3 from "@public/AwardsBlockImg3.png";

import { poppins, roboto } from "~/app/fonts";

export default function AwardsBlock() {
  return (
    <div
      className={`w-full bg-[#E2E8F0] ${poppins.className} flex justify-center py-8 lg:pt-12`}
    >
      <div className="w-full items-center px-6 text-center lg:w-[1024px] lg:px-10 lg:pb-[24px]">
        <h2 className="mb-[40px] text-[22px] font-bold leading-[34px] lg:text-[28px]">
          Speed your creativity and quality
        </h2>
        <div className="items-centerb flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center gap-[18px] lg:flex-row">
              <div className="relative h-[150px] w-[139px]">
                <Image src={AwardImg1} alt="Clutch Award" fill />
              </div>
              <div className="-mt-10 flex gap-[18px] lg:mt-0">
                <div className="relative h-[150px] w-[139px]">
                  <Image src={AwardImg2} alt="Clutch Award" fill />
                </div>
                <div className="relative h-[150px] w-[139px]">
                  <Image src={AwardImg3} alt="Clutch Award" fill />
                </div>
              </div>
            </div>
            <span className={`${roboto.className} text-[#636D80]`}>
              Awarded
            </span>
          </div>

          <div className="text-center text-[22px] font-normal leading-[27px] text-black lg:mt-7 lg:text-start lg:text-[28px] lg:leading-[33.6px]">
            All the tools you need to create social media, videos, speeches...
            all in one place.
          </div>
        </div>
      </div>
    </div>
  );
}
