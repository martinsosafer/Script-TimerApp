import type { PriceCardProps } from "../types";
import FAQs from "./faqs";
import PriceCards from "./priceCards";

export default function PlansSections({
  monthlyPlans,
  yearlyPlans,
  currentPlan,
}: PriceCardProps) {
  console.log("subscription data", currentPlan);

  return (
    <>
      <PriceCards
        monthlyPlans={monthlyPlans}
        yearlyPlans={yearlyPlans}
        currentPlan={currentPlan}
      />
      <FAQs />
    </>
  );
}
