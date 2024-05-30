import type { PriceCardProps } from "../types";
import FAQs from "./faqs";
import PriceCards from "./priceCards";

export default function PlansSections({
  monthlyPlans,
  yearlyPlans,
}: PriceCardProps) {
  return (
    <>
      <PriceCards monthlyPlans={monthlyPlans} yearlyPlans={yearlyPlans} />
      <FAQs />
    </>
  );
}
