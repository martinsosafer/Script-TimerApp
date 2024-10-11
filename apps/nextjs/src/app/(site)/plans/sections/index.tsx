"use client";

import { useRef } from "react";

import { api } from "~/utils/api";
import type { PriceCardsProps } from "../types";
import ComparativeBoard from "./comparativeboard";
import FAQs from "./faqs";
import LanguagesRows from "./LanguagesRows";
import PlagiarismTable from "./plagiarismTable";
import PricingTestimonials from "./plansTestimonials";
import PricingTable from "./pricingTable";

export default function PlansSections({
  monthlyPlans,
  yearlyPlans,
  planInterval,
  session,
  plagiarismMonthlyPlans,
  plagiarismYearlyPlans,
}: PriceCardsProps) {
  const plagiarismTableRef = useRef<HTMLDivElement>(null);
  const currentPlan = session?.user.subscription?.status;
  const scrollToPlagiarismTable = () => {
    plagiarismTableRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
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

      <div className="mb-12 flex w-full flex-col items-center bg-white px-4 pt-16 text-center xl:w-[1000px]">
        <h1 className="mb-14 text-center font-poppins text-5xl font-bold leading-tight tracking-tight text-primary xl:text-5xl xl:font-extrabold">
          <span>The Most Valuable Software For Creators</span>
        </h1>
        <p className="text-black-700 mb-3 font-poppins text-base lg:text-xl xl:w-[800px]">
          Compare the benefits your Co-Producer gives you <br /> compared to the
          tools it replaces.
        </p>
        <p className="text-black-700  font-poppins text-base lg:text-xl xl:w-[800px]">
          Then start below to choose your plan to save time, <br /> expense, and
          increase your productivity - guaranteed.
        </p>
      </div>
      <ComparativeBoard />

      <LanguagesRows />
      <PricingTestimonials />
      <FAQs />
    </>
  );
}
