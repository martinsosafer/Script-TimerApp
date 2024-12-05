import Image from "next/image";

import { poppins } from "~/app/fonts";
import BotInPhoneImg from "../../../../public/BotInphone.png";
import VoiceGeneratorMockup from "./mockwidget";

export default function MockUpBlock() {
  return (
    <div className="h-full w-full bg-gradient-to-t from-[#0066FF] via-[#55a0e2] to-[#125FF133]">
      <div
        className={`flex flex-row items-center justify-center ${poppins.className}`}
      >
        {/* first col */}
        <div className="pt-[123px] text-start font-bold">
          <h2 className="text-cp-primary mb-[30px] text-[50px] font-bold leading-[60px]">
            Create the highest <br /> quality scripts, voice <br /> overs and
            images
          </h2>
          <p className="text-cp-primary text-[24px] font-bold leading-[34px]">
            This is your home for content. Explore <br /> what's inside
          </p>
        </div>

        {/* second col with bot in phone image */}
        <div className="ml-[50px] pt-[95px]">
          <Image
            src={BotInPhoneImg}
            alt="Bot in Phone"
            width={370}
            height={370}
            className="object-cover"
          />
        </div>
      </div>
      <div className=" pb-[160px]">
        <VoiceGeneratorMockup />
      </div>
    </div>
  );
}
