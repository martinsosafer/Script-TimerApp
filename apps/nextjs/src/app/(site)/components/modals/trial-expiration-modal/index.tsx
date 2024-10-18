import type { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@voiceai/ui";
import { Input } from "@voiceai/ui/@/components/ui/input";

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
  const creatorYearlyId = "prod_Q6wR4wC3Y5Yili";
  const businessMonthlyId = "prod_Q6wRdg67cs52NR";
  const businessYearlyId = "prod_Q6wAIfC2x07sMV";

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur">
      <div className="w-full max-w-4xl overflow-hidden rounded-lg border border-primary bg-white shadow-xl">
        <div className="flex flex-col md:flex-row">
          {/* Left section */}
          <div className="w-full items-center bg-gray-100 p-6 pt-[60px] md:w-1/2">
            <div className="flex items-center justify-center">
              <Image
                src={TrialImg}
                alt="Trial is about to expire image"
                width={350}
                height={350}
              />
            </div>
          </div>

          {/* Right section */}
          <div className=" w-full bg-primary p-6 pt-[60px] text-white md:w-1/2">
            <div className=" mb-7">
              <h2 className="mb-2 text-center text-4xl font-bold">
                Upgrade now
              </h2>
              <p className=" text-center text-lg font-semibold">
                with a special one-time-only 70% discount on the monthly plans
                (We know it's ridiculous!)
              </p>
            </div>

            <div className="mb-2 grid grid-cols-3 gap-4">
              <div className="col-span-1"></div>
              <div className="text-center font-semibold">Monthly</div>
              <div className="text-center font-semibold">Yearly</div>
            </div>

            <div className="mb-6 grid grid-cols-3 gap-4">
              <div className="col-span-1 flex flex-col items-center justify-center">
                <h2 className="mb-1 text-2xl font-bold">Creator</h2>
                <span className="rounded-xl bg-teal-400 px-3 py-1 font-poppins text-xs font-bold text-black">
                  MOST POPULAR
                </span>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">$19</div>
                <div className="text-sm">month</div>
                {/* Pass the Creator Monthly productId */}
                <CheckoutButton3
                  productId={creatorMonthlyId}
                  session={session}
                />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">$14.75</div>
                <div className="text-sm">month</div>
                {/* Pass the Creator Yearly productId */}
                <CheckoutButton3
                  productId={creatorYearlyId}
                  session={session}
                />
              </div>
            </div>

            <div className="mb-6 grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <h2 className="text-2xl font-bold">Business</h2>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">$39</div>
                <div className="text-sm">month</div>
                {/* Pass the Business Monthly productId */}
                <CheckoutButton3
                  productId={businessMonthlyId}
                  session={session}
                />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">$24.75</div>
                <div className="text-sm">month</div>
                {/* Pass the Business Yearly productId */}
                <CheckoutButton3
                  productId={businessYearlyId}
                  session={session}
                />
              </div>
            </div>

            <div className="mb-4 text-center">
              <Link href="/plans" className="font-semibold underline">
                See all Plans
              </Link>
            </div>

            <div className="flex items-center space-x-2">
              <p className="font-semibold ">Add one-time-promotion code</p>
              <span className="text-teal-400"> AIPRODUCER</span>
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
