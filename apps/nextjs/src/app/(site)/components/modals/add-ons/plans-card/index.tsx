import type { Session } from "next-auth";

import { roboto } from "~/app/fonts";
import CheckoutButton from "../checkout-button";
import {
  description,
  price,
  testPriceIds as priceIds,
  testPoductIds as productIds,
} from "../data";

export default function PlansCards({
  type,
  period,
  session,
  interval,
  onClose,
}: {
  type: "FREE" | "EDUCATION" | "CREATOR" | "BUSINESS";
  period: "monthly" | "yearly";
  session: Session | null;
  onClose: () => void;
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
        productId={priceIds[type]?.[period]}
        session={session}
        hasPlan={
          session?.user.subscription?.status === type ||
          session?.user.subscription?.status === "FREE_TRIAL"
        }
        onClose={onClose}
      />
    </div>
  );
}
