"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@voiceai/ui";
import { toast } from "@voiceai/ui/@/components/ui/toast";

import { poppins, roboto } from "~/app/fonts";
import { BOOSTER_PRICE } from "~/constants/products";
import BoostersModal from "../../components/modals/boosters-modal";
import type { BoosterType, SubData } from "../types";

interface BoosterCardProps {
  subData?: SubData;
  type: BoosterType;
  creditsPercentage: number;
  amount: number;
  amountDescription?: string;
  title: string;
  description: string;
  detailsList: string[];
  descriptionEnd?: string;
  imageMain: React.ReactNode;
  imageBottomLeft?: React.ReactNode;
  imageBottomRight?: React.ReactNode;
}

const BoosterCard = ({
  // subData,
  type,
  creditsPercentage,
  amount,
  amountDescription,
  title,
  description,
  detailsList,
  descriptionEnd,
  imageMain,
  imageBottomLeft,
  imageBottomRight,
}: BoosterCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBoostersModalOpen, setIsBoostersModalOpen] = useState(false);

      // DELETE!!!
      const subData = {
        userId: "f98cef60-59b1-4a14-bb96-a7007c94ee21",
        status: "1",
        planId: "initial_plan_id",
        trialExpiration: null,
      };

  const router = useRouter();

  const cardHeight = {
    IMAGES: "h-[1030px]",
    PLAGIARISM: "h-[684px]",
    VOICES: "h-[630px]",
    MASTERCLASS: "h-[716px]",
  };

  const amountFormat = new Intl.NumberFormat("en-US").format(amount);

  const handleBoostersModal = ({
    type,
    subData,
  }: {
    type: BoosterType;
    subData: SubData | undefined;
  }) => {
    //   // Resend to register if no user account found
    if (!subData) return router.push("/register?origin=booster");
    // Check if user has a paid plan
    if (
      (subData.status === "FREE" || subData.status === "FREE_TRIAL") &&
      type !== "MASTERCLASS"
    ) {
      return toast({
        title: "Upgrade your plan",
        description: "You need to upgrade your plan to add boosters",
        // variant: "destructive",
      });
    }

    return setIsBoostersModalOpen(true);
  };

  return (
    <>
      <section
        className={`bg-cp-primary shadow-cp-gray-400 flex flex-col gap-3 rounded-2xl p-10 shadow-lg max-lg:p-6 max-sm:p-5 lg:max-w-5xl ${isOpen ? `${cardHeight[type]}` : "h-[450px] max-lg:h-[420px] max-sm:h-[400px]"} w-full md:max-w-5xl overflow-hidden transition-[height] duration-500 ease-in-out`}
      >
        <p className="text-cp-accent-lightest col-start-1 col-end-3 text-lg max-sm:text-sm">
          <strong>
            {creditsPercentage <= 10 ? "10% credits left -" : null}
          </strong>{" "}
          Add this booster and keep creating like a pro!
        </p>

        <div className="flex gap-5">
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
              className={`${poppins.className} h-[130px] text-4xl font-bold text-white max-sm:w-[126%] max-sm:text-2xl max-md:text-3xl`}
            >
              {title}
            </h3>

            <div className="flex justify-between gap-2 max-sm:flex-col">
              <span className="flex w-28 flex-col gap-1">
                <p
                  className={`${poppins.className} text-center text-[42px]/[52px] font-bold text-white max-sm:text-4xl`}
                >
                  ${BOOSTER_PRICE[type]}
                </p>
                <Button
                  className={`${poppins.className} disabled:bg-cp-secondary-light font-semibold`}
                  variant="accent"
                  onClick={() => handleBoostersModal({ type, subData })}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      <span className="ml-2">Adding...</span>
                    </div>
                  ) : (
                    "ADD NOW"
                  )}
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

            <div className="flex flex-col pt-9 max-sm:w-[106%]">
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
        <div className="flex h-full w-full gap-7 pt-10 max-md:flex-col max-sm:gap-4 max-sm:pt-0">
          <div className="relative h-full w-full">{imageBottomLeft}</div>

          <div className="relative h-full w-full">{imageBottomRight}</div>
        </div>
      </section>

      {isBoostersModalOpen && (
        <BoostersModal
          setIsBoostersModalOpen={setIsBoostersModalOpen}
          type={type}
          subData={subData!}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </>
  );
};

export default BoosterCard;
