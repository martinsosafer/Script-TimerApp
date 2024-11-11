"use client";

import { useState } from "react";
import Image from "next/image";
import type { Session } from "next-auth";

import { roboto } from "~/app/fonts";
import {
  PRICES_ID,
  PRODUCTS_ID,
  TEST_PRICES_ID,
  TEST_PRODUCTS_ID,
} from "~/constants/products";
import AddOnModal from "../../components/modals/add-ons";
import CheckoutButton from "../plans/plans-cards/checkout-button";
import { setHasPlan } from "../utils";

export default function Explore({
  session,
  period,
  interval,
}: {
  session: Session | null;
  period: "monthly" | "yearly";
  interval: string | undefined;
}) {
  const [addOnType, setAddOnType] = useState<
    "EDUCATION" | "CREATOR" | "BUSINESS" | null
  >(null);

  return (
    <>
      <section className="mt-[100px] flex flex-col items-center">
        <p className="w-[460px] text-center text-[24px] font-bold">
          Explore all the capabilities to become a better and faster creator
        </p>
        <div
          className={`${roboto.className} mb-0 mt-[48px] flex w-[893px] justify-around gap-2 text-[18px] font-bold`}
        >
          <div className="w-[205px]" />
          <span className="w-[122px] text-center">FREE</span>
          <span className="w-[122px] text-center">EDUCATION</span>
          <span className="w-[122px] text-center">CREATOR</span>
          <span className="w-[122px] text-center">BUSINESS</span>
        </div>
        <div className="relative h-[860px] w-[893px]">
          <Image alt="Voice Ai" src="/Voice AI.png" fill />
        </div>
        <div className="relative mt-[48px] h-[242px] w-[893px]">
          <Image alt="Voice Ai" src="/Script Writing.png" fill />
        </div>
        <div className="relative mt-[48px] h-[242px] w-[893px]">
          <Image alt="Voice Ai" src="/Images (Experimental).png" fill />
        </div>
        <div className="mt-[48px] flex flex-col items-center">
          <div className="relative  flex h-[380px] w-[893px]">
            <Image alt="Voice Ai" src="/Plagiarism detection.png" fill />
          </div>
          <div className="flex h-[48px] w-[893px] items-center justify-between rounded-md px-[12px]">
            <div className={`${roboto.className} w-[205px] text-[16px]`}>
              Easy add-on
            </div>
            <span
              className={`${roboto.className} w-[122px] text-center font-bold text-black`}
            >
              -
            </span>
            <button
              className={`${roboto.className} text-cp-primary w-[122px] underline`}
              onClick={() => setAddOnType("EDUCATION")}
            >
              Take a look
            </button>
            <button
              className={`${roboto.className} text-cp-primary w-[122px] underline`}
              onClick={() => setAddOnType("CREATOR")}
            >
              Take a look
            </button>
            <button
              className={`${roboto.className} text-cp-primary w-[122px] underline`}
              onClick={() => setAddOnType("BUSINESS")}
            >
              Take a look
            </button>
          </div>
        </div>
        <div className="relative mt-[48px] h-[345px] w-[893px]">
          <Image alt="Voice Ai" src="/Masterclasses.png" fill />
        </div>
        <div
          className={`${roboto.className} mb-0 mt-[8px] flex w-[893px] justify-around gap-1 text-[18px] font-bold`}
        >
          <div className="w-[220px]" />
          <span className="w-[140px] text-center">
            <CheckoutButton
              hasPlan={
                session?.user.subscription?.status === "FREE_TRIAL" ||
                session?.user.subscription?.status === "FREE"
              }
              productId={null}
              priceId={null}
              session={session}
              type="primary"
            />
          </span>
          <span className="w-[140px] text-center">
            <CheckoutButton
              hasPlan={setHasPlan(session, "EDUCATION", interval, period)}
              productId={PRODUCTS_ID.EDUCATION![period]}
              priceId={PRICES_ID.EDUCATION![period]}
              session={session}
              type="primary"
            />
          </span>
          <span className="w-[140px] text-center">
            <CheckoutButton
              hasPlan={setHasPlan(session, "CREATOR", interval, period)}
              productId={PRODUCTS_ID.CREATOR![period]}
              priceId={PRICES_ID.CREATOR![period]}
              session={session}
              type="accent"
            />
          </span>
          <span className="w-[140px] text-center">
            <CheckoutButton
              hasPlan={setHasPlan(session, "BUSINESS", interval, period)}
              productId={PRODUCTS_ID.BUSINESS![period]}
              priceId={PRICES_ID.BUSINESS![period]}
              session={session}
              type="primary"
            />
          </span>
        </div>
      </section>
      {addOnType && (
        <AddOnModal
          onClose={() => setAddOnType(null)}
          plan={addOnType}
          session={session}
        />
      )}
    </>
  );
}
