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
    plagiarism: "h-[654px]",
    voice: "h-[598px]",
  };

  const amountFormat = new Intl.NumberFormat("en-US").format(amount);

  return (
    <article
      className={`bg-cp-primary flex flex-col gap-3 rounded-2xl p-10 shadow-lg max-lg:p-6 max-sm:p-5 lg:max-w-5xl ${isOpen ? `${cardHeight[type]}` : "h-[430px] max-sm:h-[410px]"} w-full max-w-5xl overflow-hidden transition-[height] duration-500 ease-in-out`}
    >
      <p className="text-cp-accent-lightest col-start-1 col-end-3 text-lg max-sm:text-sm">
        10% credits left - Add this booster and keep creating like a pro!
      </p>

      <div className="flex gap-2">
        {/* Left side */}
        <div className="flex w-[50%] flex-col gap-4 max-sm:gap-2">
          <span className="flex items-baseline gap-2">
            <h2
              className={`${poppins.className} text-cp-accent pt-4 text-[50px]/none font-bold max-sm:text-[34px]`}
            >
              {amountFormat}
            </h2>
            <h4
              className={`${poppins.className} text-cp-accent text-3xl max-sm:text-xl`}
            >
              {amountDescription}
            </h4>
          </span>

          <h3
            className={`${poppins.className} h-[130px] text-4xl font-bold text-white max-sm:text-xl`}
          >
            {title}
          </h3>

          <div className="flex justify-between gap-2 max-sm:flex-col">
            <span className="flex w-32 flex-col gap-2">
              <p
                className={`${poppins.className} text-center text-[42px]/[52px] font-bold text-white max-sm:text-4xl`}
              >
                ${price}
              </p>
              <Button
                className={`${poppins.className} font-semibold`}
                variant="accent"
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

          <div className="flex flex-col pt-8">
            <p className="text-lg font-bold text-white max-sm:text-sm">
              {description}
            </p>
            {detailsList.map((detail, i) => (
              <p
                key={i}
                className="text-cp-secondary-lightest text-lg font-bold max-sm:text-sm"
              >
                {detail}
              </p>
            ))}
            {descriptionEnd && (
              <p className="pb-2 text-lg font-bold text-white max-sm:text-sm">
                {descriptionEnd}
              </p>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="flex w-[50%]">
          <div className="relative h-full w-full min-w-[200px]">
            {imageMain}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex h-full w-full gap-8 pt-8 max-sm:flex-col max-sm:gap-4 max-sm:pt-0">
        <div className="relative h-full w-full">{imageBottomLeft}</div>

        <div className="relative h-full w-full">{imageBottomRight}</div>
      </div>
    </article>

    // <article
    //   className={`bg-cp-primary grid w-full grid-cols-2 grid-rows-[30px_54px_90px_92px_318px_auto] gap-x-4 gap-y-2 rounded-2xl p-10 shadow-lg max-lg:p-6 lg:max-w-5xl ${isOpen ? `${cardHeight[type]}` : "h-[374px]"} overflow-y-hidden transition-[height] duration-500 ease-in-out`}
    // >
    //   {/* Left side */}
    //   <p className="text-cp-accent-lightest col-start-1 col-end-3 text-lg">
    //     10% credits left - Add this booster and keep creating like a pro!
    //   </p>

    //   <span className="col-start-1 col-end-2 flex items-baseline gap-2 self-end">
    //     <h2
    //       className={`${poppins.className} text-cp-accent text-[50px]/none font-bold`}
    //     >
    //       {amountFormat}
    //     </h2>
    //     <h4 className={`${poppins.className} text-cp-accent text-3xl`}>
    //       {amountDescription}
    //     </h4>
    //   </span>

    //   <h3
    //     className={`${poppins.className} col-start-1 col-end-2 text-4xl font-bold text-white`}
    //   >
    //     {title}
    //   </h3>

    //   <div className="col-start-1 col-end-2 flex justify-between">
    //     <span>
    //       <p
    //         className={`${poppins.className} text-center text-[42px]/[52px] font-bold text-white`}
    //       >
    //         ${price}
    //       </p>
    //       <Button
    //         className={`${poppins.className} bg-cp-secondary font-semibold`}
    //       >
    //         ADD NOW
    //       </Button>
    //     </span>

    //     <div className="flex items-end">
    //       <Button
    //         variant="link"
    //         className="p-0 text-white"
    //         onClick={() => setIsOpen(!isOpen)}
    //       >
    //         {!isOpen ? "See more" : "See less"}
    //       </Button>
    //     </div>
    //   </div>

    //   <div className="col-start-1 col-end-2 flex flex-col self-end">
    //     <p className="text-lg font-bold text-white">{description}</p>
    //     {detailsList.map((detail, i) => (
    //       <p key={i} className="text-cp-secondary-lightest text-lg font-bold">
    //         {detail}
    //       </p>
    //     ))}
    //     {descriptionEnd && (
    //       <p className="pb-2 text-lg font-bold text-white">{descriptionEnd}</p>
    //     )}
    //   </div>

    //   {/* Right side */}
    //   <div className="relative col-start-2 col-end-3 row-start-3 row-end-6 mt-[-38px] w-full justify-self-end">
    //     {imageMain}
    //   </div>

    //   {/* Bottom */}
    //   <div className="relative col-start-1 col-end-2 row-start-6 row-end-7 mt-5 h-[270px] w-full justify-self-start">
    //     {imageBottomLeft}
    //   </div>
    //   <div className="relative col-start-2 col-end-3 row-start-6 row-end-7 mt-5 h-[270px] w-full justify-self-end">
    //     {imageBottomRight}
    //   </div>
    // </article>
  );
};

export default BoosterCard;
