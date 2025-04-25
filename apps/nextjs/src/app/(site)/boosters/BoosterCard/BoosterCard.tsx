"use client";

import { useState } from "react";

import { Button } from "@voiceai/ui";

import { poppins, roboto } from "~/app/fonts";

interface BoosterCardProps {
  type: "images" | "plagiarism" | "voice";
  amount: number;
  amountDescription?: string;
  title: string;
  price: number;
  description: string;
  detailsList: string[];
  descriptionEnd?: string;
  imageMain: React.ReactNode;
  imageBottomLeft?: React.ReactNode;
  imageBottomRight?: React.ReactNode;
}

const BoosterCard = ({
  type,
  amount,
  amountDescription,
  title,
  price,
  description,
  detailsList,
  descriptionEnd,
  imageMain,
  imageBottomLeft,
  imageBottomRight,
}: BoosterCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const cardHeight = {
    images: "h-[1006px]",
    plagiarism: "h-[694px]",
    voice: "h-[694px]",
  };

  const amountFormat = new Intl.NumberFormat("en-US").format(amount);

  return (
    <article
      className={`bg-cp-primary grid w-full grid-cols-2 grid-rows-[30px_54px_90px_92px_318px_auto] gap-x-4 gap-y-2 rounded-2xl p-10 shadow-lg lg:max-w-5xl ${isOpen ? `${cardHeight[type]}` : "h-[374px]"} overflow-y-hidden transition-[height] duration-500 ease-in-out`}
    >
      {/* Left side */}
      <p className="text-cp-accent-lightest col-start-1 col-end-3 text-lg">
        10% credits left - Add this booster and keep creating like a pro!
      </p>

      <span className="col-start-1 col-end-2 flex items-baseline gap-2 self-end">
        <h2
          className={`${poppins.className} text-cp-accent text-[50px]/none font-bold`}
        >
          {amountFormat}
        </h2>
        <h4 className={`${poppins.className} text-cp-accent text-3xl`}>
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
            className={`${poppins.className} text-center text-[42px]/[52px] font-bold text-white`}
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
            {!isOpen ? "See more" : "See less"}
          </Button>
        </div>
      </div>

      <div className="col-start-1 col-end-2 flex flex-col self-end">
        <p className="text-lg font-bold text-white">{description}</p>
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
      <div className="relative col-start-2 col-end-3 row-start-3 row-end-6 mt-[-46px] w-[458px] justify-self-end">
        {imageMain}
      </div>

      {/* Bottom */}
      <div className="relative col-start-1 col-end-2 row-start-6 row-end-7 mt-5 h-[270px] w-[458px] justify-self-start">
        {imageBottomLeft}
      </div>
      <div className="relative col-start-2 col-end-3 row-start-6 row-end-7 mt-5 h-[270px] w-[458px] justify-self-end">
        {imageBottomRight}
      </div>
    </article>
  );
};

export default BoosterCard;
