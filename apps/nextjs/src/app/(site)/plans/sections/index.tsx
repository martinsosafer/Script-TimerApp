"use client";

import { api } from "~/utils/api";
import type { PriceCardsProps } from "../types";
import FAQs from "./faqs";
import PriceCards from "./priceCards";
import PricingTable from "./pricingTable";

export default function PlansSections({
  monthlyPlans,
  yearlyPlans,
  planInterval,
  session,
}: PriceCardsProps) {
  const { data } = api.subscription.mySubscription.useQuery();

  return (
    <>
      <PricingTable />
      <FAQs />
    </>
  );
}
