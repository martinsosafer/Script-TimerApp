import type { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@voiceai/ui";
import { Input } from "@voiceai/ui/@/components/ui/input";

import { poppins } from "~/app/fonts";
import type { SubscriptionData } from "~/lib/types";
import TrialImg from "../modalimgs/TrialExpireImg.png";
import CheckoutButton3 from "./checkoutbutton3";

interface FreeModalProps {
  subData?: SubscriptionData | null | undefined;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  session?: SubscriptionData | null | undefined;
}

export default function TrialExpirationModal({
  setOpenModal,
  session,
  openModal,
}: FreeModalProps) {
  if (!openModal) {
    return null;
  }

  // Define the product IDs for Creator and Business plans
  const creatorMonthlyId = "prod_Q6wRA3CPKOd872";
  
  const businessMonthlyId = "prod_Q6wRdg67cs52NR";
  

  return (
    <div
      className={`fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur ${poppins.className}`}
    >
      <div className="h-[545px] w-[925px] overflow-hidden rounded-xl border border-primary bg-white shadow-xl">
        <div className="flex h-full">
          {/* Left section */}
          <div className="flex h-full w-[400px] flex-col items-center justify-center bg-gray-100">
            <div className="relative flex h-[330px] w-[330px] items-center justify-center">
              <Image
                src={TrialImg}
                alt="Trial is about to expire image"
                width={350}
                height={350}
              />
            </div>
          </div>

          {/* Right section */}
          <div className="bg-cp-primary flex w-[525px] flex-col items-center pb-[60px] text-white">
            <div className="flex w-[375px] flex-grow flex-col items-center justify-start px-[75px] pt-[60px]">
              <div className="mb-[44px] h-[85px] w-[375px] items-center">
                <h2 className="mb-[12px] text-center text-[20px] font-normal leading-[28px]">
                  Don't miss out <br />
                  <span className=" text-[28px] font-bold leading-[33-6px]">
                    First month special
                  </span>
                </h2>
                <p className="text-center text-[16px] font-bold leading-[22px]">
                  Let's make it simple with a one-time offer for a monthly plan
                  (We know it's ridiculous!)
                </p>
              </div>
            </div>
            <div className="  flex flex-col items-center justify-center">
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="col-span-1 flex flex-col items-center justify-center">
                  <h2 className="mb-1 text-[28px]  font-bold leading-[33.6px]">
                    Creator
                  </h2>
                  <span className="rounded-xl bg-teal-400 px-3 py-1 font-poppins text-[11px] font-semibold leading-[15.4px] text-black">
                    MOST POPULAR
                  </span>
                </div>
                <div className="text-center">
                  <div className=" flex items-center justify-center gap-[24px]">
                    <div className="relative px-2 py-1 text-[24px] font-bold text-white">
                      <span className="relative z-10">$19</span>
                      {/* Orange line */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-[2px] w-full rotate-[-12deg] bg-orange-500"></div>
                      </div>
                    </div>
                    <div className="text-[24px] font-bold text-white">
                      $5.70
                    </div>
                  </div>
                  {/* Pass the Creator Monthly productId */}
                  <CheckoutButton3
                    productId={creatorMonthlyId}
                    session={session}
                  />
                </div>
              </div>

              <div className="mb-6 grid grid-cols-2 items-center justify-center gap-4">
                <div className="col-span-1 flex flex-col items-center justify-center">
                  <h2 className="mb-1 text-[28px]  font-bold leading-[33.6px]">
                    Business
                  </h2>
                  <span className="bg-cp-primary text-cp-primary rounded-xl px-3 py-1 font-poppins text-[11px] font-semibold leading-[15.4px]">
                    MOST POPULAR
                  </span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-[24px]">
                    <div className="relative px-2 py-1 text-[24px] font-bold text-white">
                      <span className="relative z-10">$39</span>
                      {/* Orange line */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-[2px] w-full rotate-[-12deg] bg-orange-500"></div>
                      </div>
                    </div>
                    <div className="text-[24px] font-bold text-white">
                      $11.70
                    </div>
                  </div>
                  {/* Pass the Business Monthly productId */}
                  <CheckoutButton3
                    productId={businessMonthlyId}
                    session={session}
                  />
                </div>
              </div>
            </div>
            <div className="relative mt-[44px]">
              <div className="mb-4 text-center">
                <Link
                  href="/plans"
                  className="text-[14px] font-bold leading-[16.8px]  underline"
                >
                  See all Plans
                </Link>
              </div>

              <div className="flex items-center ">
                <p className="space-x-1 text-[14px]  font-bold leading-[19.6px] ">
                  Add this one-time-promotion code:
                </p>
                <span className="text-teal-400"> AIPRODUCER</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => setOpenModal(false)}
        className="absolute right-4 top-4 text-white hover:text-gray-300 focus:outline-none"
        aria-label="Close modal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
