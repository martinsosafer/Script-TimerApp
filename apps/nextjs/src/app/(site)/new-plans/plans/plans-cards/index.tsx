import Image from "next/image";
import type { Session } from "next-auth";

import { roboto } from "~/app/fonts";
import CheckoutButton from "./checkout-button";

const description: Record<string, string> = {
  FREE: "Good for hobbyist",
  EDUCATION: "Discounted for .edu emails",
  CREATOR: "Ideal for creatives professionals",
  BUSINESS: "Best for brand marketers",
};

interface Price {
  monthly: string;
  yearly: string;
  total?: string;
}

const price: Record<string, Price> = {
  FREE: { monthly: "Free", yearly: "Free" },
  EDUCATION: { monthly: "$9", yearly: "$6.58", total: "$79/year" },
  CREATOR: { monthly: "$19", yearly: "$14.75", total: "$177/year" },
  BUSINESS: { monthly: "$39", yearly: "$24.75", total: "$297/year" },
};

interface ProductId {
  monthly: string | null;
  yearly: string | null;
}

const productIds: Record<string, ProductId> = {
  FREE: { monthly: null, yearly: null },
  EDUCATION: { monthly: "prod_Q6wRBImx4i9jIV", yearly: "prod_Q6wRaa010Ja2QI" },
  CREATOR: { monthly: "prod_Q6wRA3CPKOd872", yearly: "prod_Q6wR4wC3Y5Yili" },
  BUSINESS: { monthly: "prod_Q6wRdg67cs52NR", yearly: "prod_Q6wAIfC2x07sMV" },
};

const testProductIds: Record<string, ProductId> = {
  FREE: { monthly: null, yearly: null },
  EDUCATION: { monthly: "prod_PwYfAY9nKwQ9iV", yearly: "prod_PwaJpA8vUeG6Wv" },
  CREATOR: { monthly: "prod_PwYzKaNnHflnUj", yearly: "prod_PwaNjdYvuqa5Io" },
  BUSINESS: { monthly: "prod_PwZAZujl0DVkgR", yearly: "prod_PwaRtUe2crIFlW" },
};

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
    if (period === "monthly" && interval === "month")
      return (
        session?.user.subscription?.status === type ||
        session?.user.subscription?.status === "FREE_TRIAL"
      );
    if (period === "yearly" && interval === "year")
      return (
        session?.user.subscription?.status === type ||
        session?.user.subscription?.status === "FREE_TRIAL"
      );
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
                  {description[type]}
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
                  {price[type]?.[period]}
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
                    {price[type]?.total}
                  </span>
                )}
              </div>
              <CheckoutButton
                type="accent"
                productId={
                  process.env.NODE_ENV === "production"
                    ? productIds[type]?.[period]
                    : testProductIds[type]?.[period]
                }
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
              {description[type]}
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
              {price[type]?.[period]}
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
                {price[type]?.total}
              </span>
            )}
          </div>
          <CheckoutButton
            type="primary"
            productId={
              process.env.NODE_ENV === "production"
                ? productIds[type]?.[period]
                : testProductIds[type]?.[period]
            }
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
