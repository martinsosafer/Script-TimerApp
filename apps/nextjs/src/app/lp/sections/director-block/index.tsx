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
      className={`bg-cp-primary flex h-full w-full flex-row justify-center ${poppins.className} gap-10 p-10`}
    >
      <div className="relative h-[370px] w-[360px]  ">
        <Image src={DirectorImg} alt="Alternate content image" fill />
      </div>

      <div className="flex h-[360px] w-[368px] flex-col justify-center">
        <h3 className="text-[34px] font-bold leading-[41px] text-white">
          Boost your video and content production
        </h3>
        <p className="text-cp-accent mb-10 mt-4 w-[327px] text-[28px] font-normal leading-[34px]">
          Save money and time: up to 85% per video produced
        </p>
        <Button
          label="Start Now"
          type="accent"
          className="w-[158px]"
          onClick={() => router.push("/")}
        />
      </div>
    </div>
  );
}
