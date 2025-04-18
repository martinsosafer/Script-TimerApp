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
  description: string;
  detailsList: string[];
  descriptionEnd?: string;
}

const BoosterCard = ({
  amount,
  amountDescription,
  title,
  price,
  description,
  detailsList,
  descriptionEnd,
}: BoosterCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article
      className={`bg-cp-primary grid w-full grid-cols-2 grid-rows-[32px_96px_100px_100px_280px] rounded-2xl p-10 shadow-lg lg:max-w-5xl ${isOpen ? "h-[690px]" : "h-[408px]"} overflow-y-hidden transition-[height] delay-200 ease-in-out`}
    >
      {/* Left side */}
      <p className="text-cp-accent-lightest col-start-1 col-end-3 text-lg">
        10% credits left - Add this booster and keep creating like a pro!
      </p>

      <span className="col-start-1 col-end-2 flex items-baseline gap-1 self-end">
        <h2
          className={`${poppins.className} text-cp-accent text-[50px]/[64px] font-bold`}
        >
          {amount}
        </h2>
        <h4 className={`${poppins.className} text-cp-accent-lightest text-3xl`}>
          {amountDescription}
        </h4>
      </span>

      <h3
        className={`${poppins.className} col-start-1 col-end-2 text-4xl font-bold text-white`}
      >
        {title}
      </h3>

      <div className="col-start-1 col-end-2 flex justify-between">
        <span>
          <p
            className={`${poppins.className} text-center text-[42px] font-bold text-white`}
          >
            ${price}
          </p>
          <Button
            className={`${poppins.className} bg-cp-secondary font-semibold`}
          >
            ADD NOW
          </Button>
        </span>

        <div className="flex items-end">
          <Button
            variant="link"
            className="p-0 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            See more
          </Button>
        </div>
      </div>

      <div className="col-start-1 col-end-2 flex flex-col self-end">
        <p className="text-lg/10 font-bold text-white">{description}</p>
        {detailsList.map((detail, i) => (
          <p key={i} className="text-cp-secondary-lightest text-lg font-bold">
            {detail}
          </p>
        ))}
        {descriptionEnd && (
          <p className="pb-2 text-lg font-bold text-white">{descriptionEnd}</p>
        )}
      </div>

      {/* Right side */}
      <div className="relative z-0 col-start-2 col-end-3 row-start-3 row-end-6 w-[420px] justify-self-end ">
        <Image
          src={"/boostersImages/boost_images.png"}
          alt="Booster images"
          // width={410}
          // height={472}
          fill
          // sizes="420px"
          // style={{
          //   objectFit: "contain",
          // }}
          className={`object-contain object-top`}
        />
      </div>
    </article>
  );
};

export default BoosterCard;
