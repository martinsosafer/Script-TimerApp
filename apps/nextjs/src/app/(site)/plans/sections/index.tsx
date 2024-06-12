"use client";

import { api } from "~/utils/api";
import type { PriceCardProps } from "../types";
import FAQs from "./faqs";
import PriceCards from "./priceCards";

export default function PlansSections({
  monthlyPlans,
  yearlyPlans,
  planData,
}: PriceCardProps) {
  const { data } = api.subscription.mySubscription.useQuery();

  return (
    <>
      <PriceCards
        monthlyPlans={monthlyPlans}
        yearlyPlans={yearlyPlans}
        currentPlan={data?.status}
        planData={planData}
      />
      <FAQs />
    </>
  );
}
