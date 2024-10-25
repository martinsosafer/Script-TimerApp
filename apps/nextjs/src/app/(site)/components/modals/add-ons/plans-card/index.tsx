import type { Session } from "next-auth";

import { roboto } from "~/app/fonts";
import CheckoutButton from "../checkout-button";

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
  EDUCATION: { monthly: "prod_Q6wRBImx4i9jIV", yearly: "$prod_Q6wRBImx4i9jIV" },
  CREATOR: { monthly: "prod_Q6wRA3CPKOd872", yearly: "prod_Q6wR4wC3Y5Yili" },
  BUSINESS: { monthly: "prod_Q6wRdg67cs52NR", yearly: "prod_Q6wAIfC2x07sMV" },
};

export default function PlansCards({
  type,
  period,
  session,
  interval,
}: {
  type: "FREE" | "EDUCATION" | "CREATOR" | "BUSINESS";
  period: "monthly" | "yearly";
  session: Session | null;
}) {
  return (
    <div className="bg-cp-primary mt-[24px] flex h-[281px] w-[195px] flex-col items-center justify-between rounded-md p-4 shadow-md">
      <div className="items-cente flex flex-col text-white">
        <h3 className="text-center text-[24px] font-semibold ">{type}</h3>
        <p
          className={`${roboto.className} mt-[4px] h-[40px] px-6 text-center text-[14px]`}
        >
          {description[type]}
        </p>

        <span className="mt-[21px] text-center text-[34px] font-bold">
          {price[type]?.[period]}
          <span className={`${roboto.className} text-[14px] font-light`}>
            {type !== "FREE" && "/month"}
          </span>
        </span>

        {period === "yearly" && type !== "FREE" && (
          <span
            className={`${roboto.className} mb-[10px] mt-[2px] text-center text-[16px] font-light`}
          >
            {price[type]?.total}
          </span>
        )}
      </div>
      <CheckoutButton
        type="accent"
        productId={productIds[type]?.[period]}
        session={session}
        hasPlan={
          session?.user.subscription?.status === type ||
          session?.user.subscription?.status === "FREE_TRIAL"
        }
      />
    </div>
  );
}
