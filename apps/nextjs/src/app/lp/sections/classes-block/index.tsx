import Image from "next/image";
import AtlassianImg from "@public/AtlassianImg.png";
import GoogleImg from "@public/GoogleImg.png";
import NotionImg from "@public/NotionImg.png";

import { poppins, roboto } from "~/app/fonts";

export default function ClassesBlock() {
  return (
    <div
      className={`h-full w-full bg-white ${poppins.className} flex justify-center`}
    >
      <div className="flex w-[1024px] items-center gap-10 px-10 py-[74px] ">
        <div className="w-[452px] text-left text-[28px] font-normal leading-[33.6px] text-black">
          Write more engaging scripts with classes taught by Hollywood
          producers.
        </div>

        <div className="flex flex-col items-center">
          <div className="flex w-[452px] items-center justify-between">
            <div className="relative h-10 w-[105px]">
              <Image src={NotionImg} alt="NotionLogo" fill />
            </div>
            <div className="relative h-5 w-[143px]">
              <Image src={AtlassianImg} alt="NotionLogo" fill />
            </div>
            <div className="relative h-[35px] w-[102px]">
              <Image src={GoogleImg} alt="NotionLogo" fill />
            </div>
          </div>
          <span
            className={`${roboto.className} mt-5 text-[16px] text-[#636D80]`}
          >
            Tools we may replace
          </span>
        </div>
      </div>
    </div>
  );
}
