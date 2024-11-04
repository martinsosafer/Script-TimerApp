import Image from "next/image";
import type { Session } from "next-auth";

import { roboto } from "~/app/fonts";
import {
  DESCRIPTION,
  PRICE,
  TEST_PRICES_ID,
  TEST_PRODUCTS_ID,
} from "~/constants/products";
import CheckoutButton from "./checkout-button";

function RegularCard({
  type,
  period,
  session,
  interval,
}: {
  type: "FREE" | "EDUCATION" | "CREATOR" | "BUSINESS";
  period: "monthly" | "yearly";
  session: Session | null;
  interval: string | undefined;
}) {
  function setHasPlan() {
    if (
      type === "FREE" &&
      (session?.user.subscription?.status === "FREE_TRIAL" ||
        session?.user.subscription?.status === "FREE")
    )
      return true;
    if (period === "monthly" && interval === "month") {
      if (session?.user.subscription?.status === type) return true;
      else if (
        session?.user.subscription?.status === "STUDENTCLMO" &&
        type === "EDUCATION"
      )
        return true;
      else if (
        session?.user.subscription?.status === "CREATORCLMO" &&
        type === "CREATOR"
      )
        return true;
      else if (
        session?.user.subscription?.status === "BUSINESSCLMO" &&
        type === "BUSINESS"
      )
        return true;
    }
    if (period === "yearly" && interval === "year") {
      if (session?.user.subscription?.status === type) return true;
      else if (
        session?.user.subscription?.status === "STUDENTCLYR" &&
        type === "EDUCATION"
      )
        return true;
      else if (
        session?.user.subscription?.status === "CREATORCLYR" &&
        type === "CREATOR"
      )
        return true;
      else if (
        session?.user.subscription?.status === "BUSINESSCLYR" &&
        type === "BUSINESS"
      )
        return true;
    }

    return false;
  }
  return (
    <>
      {type === "CREATOR" ? (
        <div className="relative shadow-md">
          <Image
            alt="Crown Icon"
            src="/icons/Crown.svg"
            width={65}
            height={65}
            className="absolute -right-6 -top-11 z-10"
          />
          <div className="bg-cp-primary relative flex h-[441px] w-[195px] flex-col items-center justify-between overflow-hidden rounded-md text-white shadow-md">
            <span className="bg-cp-accent flex h-[21px] w-full items-center justify-center text-[11px] font-semibold text-black">
              MOST POPULAR
            </span>
            <div className="flex h-full flex-col items-center justify-between p-4">
              <div className="flex flex-col items-center">
                <h3 className="text-center text-[24px] font-semibold text-white">
                  {type}
                </h3>
                <p
                  className={`${roboto.className} mt-[4px] text-center text-[14px]`}
                >
                  {DESCRIPTION[type]}
                </p>
                <div
                  className={`${roboto.className} mt-[10px] flex flex-col items-center p-2 text-[14px]`}
                >
                  <span>Voice AI</span>
                  <span>Script Writing</span>
                  <span>Image Creation</span>
                  <span>Plagiarism Detection</span>
                  <span>Training</span>
                </div>
                <span className="mt-[10px] text-center text-[34px] font-bold">
                  {PRICE[type]?.[period]}
                  <span
                    className={`${roboto.className} text-[14px] font-light`}
                  >
                    /month
                  </span>
                </span>
                {period === "yearly" && (
                  <span
                    className={`${roboto.className} mb-[10px] mt-[2px] text-center text-[16px] font-light`}
                  >
                    {PRICE[type]?.total}
                  </span>
                )}
              </div>
              <CheckoutButton
                type="accent"
                productId={TEST_PRODUCTS_ID[type]?.[period]}
                priceId={TEST_PRICES_ID[type]?.[period]}
                session={session}
                hasPlan={setHasPlan()}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-[390px] w-[195px] flex-col items-center justify-between rounded-md bg-white p-4 shadow-md">
          <div className="flex flex-col items-center">
            <h3 className="text-cp-primary text-center text-[24px] font-semibold">
              {type}
            </h3>
            <p
              className={`${roboto.className} mt-[4px] h-[40px] px-6 text-center text-[14px]`}
            >
              {DESCRIPTION[type]}
            </p>
            <div
              className={`${roboto.className} mt-[10px] flex flex-col items-center p-2 text-[14px]`}
            >
              <span>Voice AI</span>
              <span>Script Writing</span>
              <span>Image Creation</span>
              <span>Plagiarism Detection</span>
              <span>Training</span>
            </div>
            <span className="mt-[10px] text-center text-[34px] font-bold">
              {PRICE[type]?.[period]}
              <span className={`${roboto.className} text-[14px] font-light`}>
                {type !== "FREE" && "/month"}
              </span>
            </span>
            {type === "FREE" && (
              <span
                className={`${roboto.className} mb-[10px] mt-[2px] text-center text-[16px] font-light`}
              >
                No card needed
              </span>
            )}
            {period === "yearly" && type !== "FREE" && (
              <span
                className={`${roboto.className} mb-[10px] mt-[2px] text-center text-[16px] font-light`}
              >
                {PRICE[type]?.total}
              </span>
            )}
          </div>
          <CheckoutButton
            type="primary"
            productId={TEST_PRODUCTS_ID[type]?.[period]}
            priceId={TEST_PRICES_ID[type]?.[period]}
            session={session}
            hasPlan={setHasPlan()}
          />
        </div>
      )}
    </>
  );
}

export default function PlansCards({
  period,
  session,
  interval,
}: {
  period: "monthly" | "yearly";
  session: Session | null;
  interval: string | undefined;
}) {
  return (
    <section className="mt-[52px] flex w-[1024px] items-center justify-center gap-4">
      <RegularCard
        type="FREE"
        period={period}
        session={session}
        interval={interval}
      />
      <RegularCard
        type="EDUCATION"
        period={period}
        session={session}
        interval={interval}
      />
      <RegularCard
        type="CREATOR"
        period={period}
        session={session}
        interval={interval}
      />
      <RegularCard
        type="BUSINESS"
        period={period}
        session={session}
        interval={interval}
      />
    </section>
  );
}
