"use client";

import { api } from "~/utils/api";
import type { PriceCardsProps } from "../types";
import FAQs from "./faqs";
import PriceCards from "./priceCards";

export default function PlansSections({
  monthlyPlans,
  yearlyPlans,
  planInterval,
  session,
}: PriceCardsProps) {
  const { data } = api.subscription.mySubscription.useQuery();

  return (
    <>
      <PriceCards
        monthlyPlans={monthlyPlans}
        yearlyPlans={yearlyPlans}
        currentPlan={data?.status}
        planInterval={planInterval}
        session={session}
      />
      <FAQs />
    </>
  );
}
