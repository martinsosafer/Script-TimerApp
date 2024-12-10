import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Button from "~/app/(site)/components/button";
import DirectorImg from "~/app/(site)/components/modals/modalimgs/CameraImg.png";
import { poppins } from "~/app/fonts";

export default function DirectorBlock() {
  const router = useRouter();
  return (
    <div
      className={`bg-cp-primary flex h-full w-full flex-col items-center p-6 lg:flex-row lg:justify-center ${poppins.className} gap-10 lg:p-10`}
    >
      <div className="relative h-[359px] w-[312px] lg:h-[325px] lg:w-[338px]">
        <Image src={DirectorImg} alt="Alternate content image" fill />
      </div>

      <div className="flex flex-col justify-center lg:h-[360px] lg:w-[368px]">
        <h3 className="text-[26px] font-bold leading-[41px] text-white lg:text-[34px]">
          Boost your video and content production
        </h3>
        <p className="text-cp-accent mb-10 mt-4 text-[22px] font-normal leading-[34px] lg:w-[327px] lg:text-[28px]">
          Save money and time: up to 85% per video produced
        </p>
        <Button
          label="Start Now"
          type="accent"
          className="w-full lg:w-[158px]"
          onClick={() => router.push("/")}
        />
      </div>
    </div>
  );
}
