"use client";

import { useRef } from "react";

import { api } from "~/utils/api";
import type { PriceCardsProps } from "../types";
import FAQs from "./faqs";
import PlagiarismTable from "./plagiarismTable";
import PriceCards from "./priceCards";
import PricingTable from "./pricingTable";

export default function PlansSections({
  monthlyPlans,
  yearlyPlans,
  planInterval,
  session,
}: PriceCardsProps) {
  const { data } = api.subscription.mySubscription.useQuery();
  const plagiarismTableRef = useRef<HTMLDivElement>(null);

  const scrollToPlagiarismTable = () => {
    plagiarismTableRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      {/* <PriceCards
        monthlyPlans={monthlyPlans}
        yearlyPlans={yearlyPlans}
        currentPlan={data?.status}
        planInterval={planInterval}
        session={session}
      /> */}
      <PricingTable
        monthlyPlans={monthlyPlans}
        yearlyPlans={yearlyPlans}
        currentPlan={data?.status}
        planInterval={planInterval}
        session={session}
        scrollToPlagiarismTable={scrollToPlagiarismTable}
      />
      <div ref={plagiarismTableRef}>
        <PlagiarismTable
          id="plagiarism-table"
          monthlyPlans={monthlyPlans}
          yearlyPlans={yearlyPlans}
          currentPlan={data?.status}
          planInterval={planInterval}
          session={session}
        />
      </div>
      <FAQs />
    </>
  );
}
