import { useState } from "react";
import Image from "next/image";

import type { Session } from "@voiceai/auth";
import { IconClose } from "@voiceai/ui/@/components/ui/icons";
import { toast } from "@voiceai/ui/@/components/ui/toast";

import { upgrade } from "~/app/actions/checkoutActions";
import { poppins, roboto } from "~/app/fonts";
import Button from "../../button";
import Director from "../modalimgs/DirectorImg.png";

interface UpgradeProps {
  onClose: () => void;
  session: Session | null;
  priceId: string;
  period: "monthly" | "yearly";
  selectedPlan?: string | null;
}

export default function UpgradeModal({
  onClose,
  session,
  priceId,
  period,
  selectedPlan,
}: UpgradeProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleConfirm() {
    setIsLoading(true);
    try {
      await upgrade(
        priceId,
        session!.user.subscription!.planId!,
        session!.user.id,
      );
      setIsLoading(false);
      window.location.reload();
      onClose();
      return toast({
        title: "Subscription updated!",
        description: "Your plan has been updated",
      });
    } catch (error) {
      onClose();
      return toast({
        title: "Something went wrong",
        description: "Please, try again later",
      });
    }
  }

  return (
    <div
      className={`fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur ${poppins.className}`}
    >
      <div className="bg-cp-bakground relative h-[700px] w-[98%] overflow-hidden rounded-xl border border-primary shadow-xl md:w-[925px] lg:h-[545px]">
        <button className="absolute right-4 top-4 z-20" onClick={onClose}>
          <IconClose className="max-md:text-cp-gray-500 h-5 w-5 text-white hover:text-gray-300" />
        </button>

        <div className="flex h-full flex-col md:flex-row">
          {/* Left section */}
          <div className="flex h-[180px] w-full flex-col items-center justify-center bg-gray-100  md:h-full md:w-[400px]">
            <div className="relative flex h-[330px] w-[330px] items-center justify-center px-4 pt-8 lg:h-[442px] lg:w-[328px] lg:px-[36px] lg:pt-[52px]">
              <Image
                src={Director}
                alt="Trial is about to expire image"
                width={350}
                height={350}
              />
            </div>
          </div>

          {/* Right section */}
          <div className="bg-cp-primary z-10 flex h-full w-full flex-col items-center pb-14 text-white md:pb-20">
            <div className="flex w-full min-w-[90%] flex-grow flex-col items-center justify-start gap-3 px-7 pt-10 md:pt-16">
              <div className="pb-2 items-center">
                <h2 className="pb-[12px] text-center text-[24px] font-bold leading-[28px]">
                  Happy to help you!
                </h2>
                <p className="text-center text-[16px] font-bold leading-[22px] text-wrap">
                  Your ability to create is about to improve.
                </p>
              </div>
            </div>

            <div className="flex-1 items-center px-6 pb-1">
              <p className={`${roboto.className} text-center text-lg`}>
                You're about to change your current plan{" "}
                {session?.user?.subscription?.status} to:
              </p>
              <p
                className={`${roboto.className} text-cp-accent pt-3 text-center text-2xl font-bold`}
              >{`${selectedPlan} (${period})`}</p>
            </div>

            <div className="pt-4">
              <Button
                type="secondary"
                label="I have a discount cupon"
                className="border-cp-gray-300 text-cp-gray-300 hover:border-cp-white hover:text-cp-white text-sm"
                onClick={() => console.log("Discount cupon clicked")}
              />
            </div>

            <div className="flex flex-col items-center gap-4">
              <p
                className={`${poppins.className} w-[80%] pt-6 text-center text-base`}
              >
                Please confirm below, and start creating more, safer, better,
                and faster.
              </p>
              <Button
                label={isLoading ? "Upgrading..." : "Yes, let's do this"}
                onClick={handleConfirm}
                type="accent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
