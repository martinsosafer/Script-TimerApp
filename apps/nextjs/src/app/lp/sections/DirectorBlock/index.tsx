import React from "react";
import Image from "next/image";
import Link from "next/link";

import Button from "~/app/(site)/components/button";
import { poppins } from "~/app/fonts";
import DirectorImg from "../../(site)/components/modals/modalimgs/CameraImg.png";

export default function DirectorBlock() {
  return (
    <div
      className={`bg-cp-primary flex h-full w-full flex-row  justify-center gap-x-[100px] ${poppins.className}`}
    >
      <div className="py-[51px]">
        <div className=" flex h-[337px] w-[324px]  ">
          <Image
            src={DirectorImg}
            alt="Alternate content image"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="pt-[75px]">
        <div className="flex flex-col ">
          <h3 className="text-[34px] font-bold  leading-[41px]  text-white">
            Boost your video and
            <br />
            content production
          </h3>
          <p className="mb-10  mt-4 text-[28px] font-normal leading-[34px]  text-[#13EBDC]">
            Save money and time:
            <br /> up to 85% per video
            <br /> produced
          </p>
          <Link href="/register">
            <Button
              label="Start Now"
              type="accent"
              className="h-[48px] w-[158px]"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
