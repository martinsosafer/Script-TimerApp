import Image from "next/image";
import AwardImg1 from "@public/AwardsBlockImg1.png";
import AwardImg2 from "@public/AwardsBlockImg2.png";
import AwardImg3 from "@public/AwardsBlockImg3.png";

import { poppins } from "~/app/fonts";

export default function AwardsBlock() {
  return (
    <div className={`h-full w-full bg-[#E2E8F0]  ${poppins.className}`}>
      <div className="container mx-auto items-center pb-[24px]  text-center">
        <h2 className="mb-[40px] pt-[48px]  text-[28px] font-bold leading-[34px]">
          Speed your creativity and quality
        </h2>

        <div className="mb-[54px] grid items-center gap-[40px] md:grid-cols-2">
          <div className="flex flex-wrap justify-end ">
            <Image
              src={AwardImg1}
              alt="Clutch Award"
              className="h-[138px] w-[150px] object-contain"
            />
            <div className="flex flex-col items-center">
              <Image
                src={AwardImg2}
                alt="Clutch Award"
                className="h-[138px] w-[150px] object-contain"
              />
              <span className="mt-2 text-center text-gray-600">Awarded</span>
            </div>
            <Image
              src={AwardImg3}
              alt="Clutch Award"
              className="h-[138px] w-[150px] object-contain"
            />
          </div>

          <div className="mb-8 items-start  text-start text-[28px] font-normal leading-[33.6px] text-black">
            All the tools you need to create <br /> social media, videos,
            <br />
            speeches...all in one place.
          </div>
        </div>
      </div>
    </div>
  );
}
