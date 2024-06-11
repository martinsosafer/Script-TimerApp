import { useState } from "react";

import type { PriceCardProps } from "../../types";
import PriceCard from "./price-card";

const PriceCards: React.FC<PriceCardProps> = ({
  monthlyPlans,
  yearlyPlans,
  currentPlan,
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
      <div className="relative">
        <div className="absolute inset-0 flex h-full flex-col">
          <div className="flex-1" />
          <div className="mb-2 flex-1" />
        </div>
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-3 lg:gap-8 lg:px-8">
          {showMonthly
            ? monthlyPlans.map((product) => (
                // Render monthly plans
                <PriceCard
                  product={product}
                  key={product.id}
                  currentPlan={currentPlan as string}
                />
              ))
            : yearlyPlans.map((product) => (
                // Render yearly plans

                <PriceCard
                  product={product}
                  key={product.id}
                  currentPlan={currentPlan as string}
                  isYearly
                />
              ))}
        </div>
      </div>
    </>
  );
};

export default PriceCards;
