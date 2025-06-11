import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@voiceai/ui";
import { IconClose } from "@voiceai/ui/@/components/ui/icons";
import { toast } from "@voiceai/ui/@/components/ui/toast";
import { IlustrationTransformYourCareer } from "@voiceai/ui/@/illustrations";

import { addBooster } from "~/app/(site)/boosters/actions";
import type { BoosterType, SubData } from "~/app/(site)/boosters/types";
import { poppins, roboto } from "~/app/fonts";
import { BOOSTER_START_CREDITS } from "~/constants/credits";
import { BOOSTER_PRICE } from "~/constants/products";

interface BoostersModalProps {
  setIsBoostersModalOpen: (isBoostersModalOpen: boolean) => void;
  type: BoosterType;
  subData: SubData;
  setBoosterType?: (type: BoosterType | null) => void;
}

export default function BoostersModal({
  setIsBoostersModalOpen,
  type,
  subData,
  setBoosterType,
}: BoostersModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const handleAddBooster = async ({
    type,
    subData,
  }: {
    type: BoosterType;
    subData: SubData;
  }) => {
    try {
      setIsLoading(true);

      // AppSumo users and FREE plans resend to Stripe page
      if (
        subData.status === "1" ||
        subData.status === "2" ||
        subData.planId === "initial_plan_id"
      ) {
        const res = await fetch("api/checkout-booster", {
          method: "POST",
          body: JSON.stringify({
            subData,
            type,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const {
          session: { url },
        } = await res.json();
        return (window.location.href = url as string);
      } else {
        // Regular users with subscription
        await addBooster({ subData, type });
      }

      if (setBoosterType) {
        setBoosterType(null);
      }
      toast({
        title: "Booster added!",
        description: `You have successfully added ${type.toLowerCase()} booster`,
      });

      if (type === "VOICES" && pathname !== "/my-profile")
        return router.push("/texttovoice");
      if (type === "IMAGES" && pathname !== "/my-profile")
        return router.push("/image-generator");
      if (type === "MASTERCLASS" && pathname !== "/my-profile")
        return router.push("/masterclasses");
      if (type === "PLAGIARISM" && pathname !== "/my-profile")
        return router.push("/plagiarism-detector");

      return window.location.reload();
    } catch (error: any) {
      console.error("Error adding booster:", error.message);
      return toast({
        title: "Something went wrong",
        description: error.message as string,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsBoostersModalOpen(false);
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const handleBoosterDescription = (type: BoosterType) => {
    if (type === "VOICES")
      return `${formatNumber(BOOSTER_START_CREDITS[type])} credits for $${BOOSTER_PRICE[type]}`;
    if (type === "IMAGES")
      return `${formatNumber(BOOSTER_START_CREDITS[type])} credits for $${BOOSTER_PRICE[type]}`;
    if (type === "MASTERCLASS")
      return `1 year access for $${BOOSTER_PRICE[type]}`;
    if (type === "PLAGIARISM")
      return `${formatNumber(BOOSTER_START_CREDITS[type])} credits for $${BOOSTER_PRICE[type]}`;
    return "";
  };

  const handleSubscriptionPayment = () => {
    // AppSumo users
    if (subData.status === "1" || subData.status === "2") {
      return false;
    }
    // Free plans
    if (subData.status === "FREE" || subData.status === "FREE_TRIAL") {
      return false;
    }
    return true;
  };

  return (
    <div
      className={`fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur ${poppins.className}`}
    >
      <div className="bg-cp-bakground relative h-[700px] w-[98%] overflow-hidden rounded-xl border border-primary shadow-xl md:w-[925px] lg:h-[545px]">
        <button
          className="absolute right-4 top-4 z-20"
          onClick={() => setIsBoostersModalOpen(false)}
        >
          <IconClose className="max-md:text-cp-gray-500 h-5 w-5 text-white hover:text-gray-300" />
        </button>

        <div className="flex h-full flex-col md:flex-row">
          {/* Left section */}
          <div className="flex h-[180px] w-full flex-col items-center justify-center bg-gray-100  md:h-full md:w-[400px]">
            <div className="relative flex h-[330px] w-[330px] items-center justify-center px-4 pt-8 lg:h-[442px] lg:w-[328px]">
              <IlustrationTransformYourCareer className="md:h-[430px] md:w-[430px]" />
            </div>
          </div>

          {/* Right section */}
          <div className="bg-cp-primary text-cp-white z-10 flex h-full w-full flex-col items-center pb-12 md:pb-16">
            <div className="flex w-full min-w-[90%] flex-col items-center justify-start gap-3 px-7 pt-10 md:pt-16">
              <div className="items-center">
                <h2 className="pb-[12px] text-center text-[24px] font-bold leading-[28px]">
                  Happy to help you!
                </h2>
                <p className="text-wrap text-center text-[16px] font-bold leading-[22px]">
                  Your ability to create is about to improve.
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center px-6 pb-1">
              <p className={`${roboto.className} text-center text-lg`}>
                You're about to add
              </p>
              <p
                className={`${roboto.className} text-cp-accent pt-3 text-center text-2xl font-bold`}
              >{`${type} BOOSTER`}</p>
              <p className={`${roboto.className} pt-3 text-center text-lg`}>
                {handleBoosterDescription(type)}
              </p>
              {handleSubscriptionPayment() ? (
                <p className={`${roboto.className} text-center text-lg`}>
                  using your subscription payment method
                </p>
              ) : (
                <p className={`${roboto.className} text-center text-lg`}>
                  using credit card payment
                </p>
              )}
            </div>

            <div className="flex flex-col items-center gap-4 px-3 md:px-10">
              <p
                className={`${poppins.className} pt-6 text-center text-base lg:w-[80%]`}
              >
                Please confirm below, and start creating more, safer, better,
                and faster.
              </p>

              <Button
                className={`${poppins.className} disabled:bg-cp-secondary-light w-full
                 py-6 text-base font-semibold`}
                variant="accent"
                onClick={() => handleAddBooster({ type, subData })}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span className="ml-2">Adding...</span>
                  </div>
                ) : (
                  "Yes, let's do this"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
