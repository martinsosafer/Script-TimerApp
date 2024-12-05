import Image from "next/image";
import AwardImg1 from "@public/AwardsBlockImg1.png";
import AwardImg2 from "@public/AwardsBlockImg2.png";
import AwardImg3 from "@public/AwardsBlockImg3.png";

import { poppins, roboto } from "~/app/fonts";

export default function AwardsBlock() {
  return (
    <div
      className={`w-full bg-[#E2E8F0] ${poppins.className} flex justify-center pb-6 pt-12`}
    >
      <div className="w-[1024px] items-center px-10 pb-[24px] text-center">
        <h2 className="mb-[40px] text-[28px] font-bold leading-[34px]">
          Speed your creativity and quality
        </h2>
        <div className="flex items-start gap-10">
          <div className="flex flex-col items-center">
            <div className="flex gap-[18px]">
              <div className="relative h-[150px] w-[139px]">
                <Image src={AwardImg1} alt="Clutch Award" fill />
              </div>
              <div className="relative h-[150px] w-[139px]">
                <Image src={AwardImg2} alt="Clutch Award" fill />
              </div>
              <div className="relative h-[150px] w-[139px]">
                <Image src={AwardImg3} alt="Clutch Award" fill />
              </div>
            </div>
            <span className={`${roboto.className} text-[#636D80]`}>
              Awarded
            </span>
          </div>

          <div className="mt-7 text-start text-[28px] font-normal leading-[33.6px] text-black">
            All the tools you need to create social media, videos, speeches...
            all in one place.
          </div>
        </div>
      </div>
    </div>
  );
}
