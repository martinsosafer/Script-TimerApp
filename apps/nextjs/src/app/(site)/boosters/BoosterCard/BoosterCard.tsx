"use client";

import { useState } from "react";
import Image from "next/image";

import { Button } from "@voiceai/ui";

import { poppins, roboto } from "~/app/fonts";

interface BoosterCardProps {
  amount: number;
  amountDescription?: string;
  title: string;
  price: number;
}

const BoosterCard = ({
  amount,
  amountDescription,
  title,
  price,
}: BoosterCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article
      className={`bg-cp-primary flex w-full flex-col gap-7 rounded-2xl px-10 pt-9 ${isOpen && "pb-9"} shadow-lg lg:max-w-5xl`}
      style={
        isOpen
          ? { minHeight: "672px", transition: "min-height 0.15s ease-out" }
          : { minHeight: "405px", transition: "min-height 0.15s ease-in" }
      }
    >
      <p className="text-cp-accent-lightest text-lg">
        10% credits left - Add this booster and keep creating like a pro!
      </p>

      <div className="flex justify-between">
        <div className="flex h-[280px] w-[50%] flex-col justify-between gap-4">
          <span>
            <span className="flex items-baseline gap-1">
              <h2
                className={`${poppins.className} text-cp-accent-lightest text-5xl font-bold`}
              >
                {amount}
              </h2>
              <h4
                className={`${poppins.className} text-cp-accent-lightest text-3xl`}
              >
                {amountDescription}
              </h4>
            </span>
            <h3
              className={`${poppins.className} text-4xl font-bold text-white`}
            >
              {title}
            </h3>
          </span>

          <span className="flex justify-between">
            <div className="pb-2">
              <p
                className={`${poppins.className} text-center text-[42px] font-bold text-white`}
              >
                ${price}
              </p>
              <Button className=" bg-[#FF9900]">ADD NOW</Button>
            </div>
            <div className="flex items-end">
              <Button
                variant="link"
                className="p-0 text-white"
                onClick={() => setIsOpen(!isOpen)}
              >
                See more
              </Button>
            </div>
          </span>
        </div>

        <div className="h-full w-[50%] place-items-center">
          <div className=" pt-10">
            <Image
              src={"/boost_images.png"}
              alt="Booster images"
              width={410}
              height={472}
              className={`h-[${isOpen ? "472px" : "273px"}] rounded-t-xl ${isOpen && "rounded-b-xl"} object-cover object-top transition-[height]`}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default BoosterCard;
