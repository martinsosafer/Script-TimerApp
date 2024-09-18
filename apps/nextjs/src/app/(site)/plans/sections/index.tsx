"use client";

import { useRef } from "react";

import { api } from "~/utils/api";
import type { PriceCardsProps } from "../types";
import FAQs from "./faqs";
import LanguagesRows from "./LanguagesRows";
import PlagiarismTable from "./plagiarismTable";
import PricingTestimonials from "./plansTestimonials";
import PriceCards from "./priceCards";
import PricingTable from "./pricingTable";

export default function PlansSections({
  monthlyPlans,
  yearlyPlans,
  planInterval,
  session,
  plagiarismMonthlyPlans,
  plagiarismYearlyPlans,
}: PriceCardsProps) {
  const { data } = api.subscription.mySubscription.useQuery();
  const plagiarismTableRef = useRef<HTMLDivElement>(null);
  const currentPlan = session?.user.subscription?.status;
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
        currentPlan={currentPlan}
        planInterval={planInterval}
        session={session}
        scrollToPlagiarismTable={scrollToPlagiarismTable}
      />

      <div className="mb-12" ref={plagiarismTableRef}></div>
      <PlagiarismTable
        plagiarismMonthlyPlans={plagiarismMonthlyPlans}
        plagiarismYearlyPlans={plagiarismYearlyPlans}
        yearlyPlans={yearlyPlans}
        currentPlan={currentPlan}
        planInterval={planInterval}
        session={session}
      />

      <FAQs />
      <LanguagesRows />
      <PricingTestimonials />
    </>
  );
}
