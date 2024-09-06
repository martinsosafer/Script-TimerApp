import { useState } from "react";

import type { PriceCardsProps } from "../../types";
import PriceCard from "./price-card";

const PriceCards: React.FC<PriceCardsProps> = ({
  monthlyPlans,
  yearlyPlans,
  currentPlan,
  planInterval,
  session,
}) => {
  const [showMonthly, setShowMonthly] = useState(true);

  return (
    <>
      <div className="mt-8 flex justify-center space-x-4">
        <div className="flex gap-2 rounded-full border-2 border-gray-500 p-2">
          <button
            className={`${
              showMonthly
                ? "rounded-full bg-primary font-bold text-white"
                : "rounded-full bg-gray-200 text-gray-400"
            } relative overflow-hidden px-4 py-2 transition-colors duration-300`}
            onClick={() => setShowMonthly(true)}
          >
            <span
              className={`${
                showMonthly ? "translate-x-0" : "-translate-x-full"
              } absolute left-0 top-0 h-full w-full rounded-full transition-transform duration-300 ease-in-out`}
            ></span>
            <span className="relative z-10">Monthly</span>
          </button>
          <button
            className={`${
              !showMonthly
                ? "rounded-full bg-primary font-semibold text-white"
                : "rounded-full bg-gray-200 text-gray-400"
            } relative overflow-hidden px-4 py-2 transition-colors duration-300`}
            onClick={() => setShowMonthly(false)}
          >
            <span
              className={`${
                !showMonthly ? "translate-x-0" : "translate-x-full"
              } absolute left-0 top-0 h-full w-full rounded-full transition-transform duration-300 ease-in-out`}
            ></span>
            <span className="relative z-10">Yearly</span>
          </button>
        </div>
      </div>

      <div className="flex max-w-6xl flex-col items-start justify-between gap-12 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:flex-row lg:gap-8 lg:px-8">
        {showMonthly
          ? monthlyPlans.map((product) => (
              // Render monthly plans
              <PriceCard
                product={product}
                key={product.id}
                currentPlan={currentPlan}
                interval={planInterval ?? "no-interval"}
                session={session}
              />
            ))
          : yearlyPlans.map((product) => (
              // Render yearly plans

              <PriceCard
                product={product}
                key={product.id}
                currentPlan={currentPlan}
                interval={planInterval ?? "no-interval"}
                session={session}
                isYearly
              />
            ))}
      </div>
    </>
  );
};

export default PriceCards;
