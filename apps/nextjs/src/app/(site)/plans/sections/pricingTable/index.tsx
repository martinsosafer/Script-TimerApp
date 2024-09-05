import React, { useState } from "react";

import { Button } from "@voiceai/ui";
import { IconXCircle } from "@voiceai/ui/@/components/ui/icons";
import { CheckIcon } from "@voiceai/ui/@/icons/icons";

import CheckoutButton from "../priceCards/check-out-button";

const PricingTable = ({
  monthlyPlans,
  yearlyPlans,
  currentPlan,
  planInterval,
  session,
}) => {
  const [showMonthly, setShowMonthly] = useState(true);
  console.log("monthlyPlans", monthlyPlans);
  console.log("YearlyPlans", yearlyPlans);
  const tiers = [
    {
      name: "FREE",
      price: 0,
      yearlyPrice: 0,

      color: "bg-blue-400",
      rowColor: "bg-blue-100",
      features: {
        "Voice Ai": { enabled: true },
        "Text To Voice": { enabled: true },
        "Characters per Script": { value: "500-Watermarked" },
        "Characters per Month": { value: "10,000" },
        "Number of Voices": { value: "10" },
        "Celebrity Voices": { value: "no" },
        "Clone Voices": { enabled: false },
        " Download": { value: "Yes-watermarked" },
        "Audio Translator": { value: "10" },
        "Script Writting": { enabled: true },
        "Script Coach": { value: "40,000 credits" },
        "Text Translator": { value: "40,000" },
        "Grammar Spell Check": { value: "40,000" },
        " Courses": { enabled: false },
        "Stunning Videos": { value: "First 3 Lessons" },
        "Stories for marketing": { value: "First 3 Lessons" },
        " Presentations": { value: "First 3 Lessons" },
        "Hollywood Storylines": { value: "First 3 Lessons" },
        "Building Rapport": { value: "First 3 Lessons" },
        "Ai to build marketing stack": { value: "First 3 Lessons" },
        "Images (Experimental)": { enabled: true },
        "Image Creation": { value: "5" },
      },
    },
    {
      name: "STUDENT",
      price: 9,
      yearlyPrice: 79,
      monthlyId: "prod_PwYfAY9nKwQ9iV",
      yearlyId: "prod_PwaJpA8vUeG6Wv",
      color: "bg-blue-500",
      rowColor: "bg-blue-200",
      features: {
        "Voice Ai": { enabled: true },
        "Text To Voice": { enabled: true },
        "Characters per Script": { value: "2,000" },
        "Characters per Month": { value: "40,000" },
        "Number of Voices": { value: "100" },
        "Celebrity Voices": { value: "YES" },
        "Clone Voices": { enabled: false },
        " Download": { value: "Yes" },
        "Audio Translator": { enabled: true },
        "Script Writting": { enabled: true },
        "Script Coach": { value: "200,000 credits" },
        "Text Translator": { value: "200,000 credits" },
        "Grammar Spell Check": { value: "200,000 credits" },
        " Courses": { enabled: false },
        "Stunning Videos": { value: "First 3 Lessons" },
        "Stories for marketing": { value: "First 3 Lessons" },
        " Presentations": { value: "First 3 Lessons" },
        "Hollywood Storylines": { value: "First 3 Lessons" },
        "Building Rapport": { value: "First 3 Lessons" },
        "Ai to build marketing stack": { value: "First 3 Lessons" },
        "Images (Experimental)": { enabled: true },
        "Image Creation": { value: "25" },
      },
    },
    {
      name: "CREATOR",
      price: 19,
      yearlyPrice: 177,
      monthlyId: "prod_PwYzKaNnHflnUj",
      yearlyId: "prod_PwaNjdYvuqa5Io",
      color: "bg-blue-600",
      rowColor: "bg-blue-300",
      label: "Most Popular",
      features: {
        "Voice Ai": { enabled: true },
        "Text To Voice": { enabled: true },
        "Characters per Script": { value: "5,000" },
        "Characters per Month": { value: "80,000" },
        "Number of Voices": { value: "100" },
        "Celebrity Voices": { value: "YES" },
        "Clone Voices": { enabled: true },
        " Download": { value: "Yes" },
        "Audio Translator": { enabled: true },
        "Script Writting": { enabled: true },
        "Script Coach": { value: "400,000 credits" },
        "Text Translator": { value: "400,000 credits" },
        "Grammar Spell Check": { value: "400,000 credits" },
        " Courses": { enabled: true },
        "Stunning Videos": { enabled: true },
        "Stories for marketing": { enabled: true },
        " Presentations": { enabled: true },
        "Hollywood Storylines": { enabled: true },
        "Building Rapport": { enabled: true },
        "Ai to build marketing stack": { enabled: true },
        "Images (Experimental)": { enabled: true },
        "Image Creation": { value: "50" },
      },
    },
    {
      name: "BUSINESS",
      price: 39,
      yearlyPrice: 297,
      monthlyId: "prod_PwZAZujl0DVkgR",
      yearlyId: "prod_PwaRtUe2crIFlW",
      color: "bg-blue-700",
      rowColor: "bg-blue-400",
      features: {
        "Voice Ai": { enabled: true },
        "Text To Voice": { enabled: true },
        "Characters per Script": { value: "10,000" },
        "Characters per Month": { value: "125,000" },
        "Number of Voices": { value: "100" },
        "Celebrity Voices": { value: "YES" },
        "Clone Voices": { enabled: true },
        " Download": { value: "Yes" },
        "Audio Translator": { enabled: true },
        "Script Writting": { enabled: true },
        "Script Coach": { value: "1,000,000 credits" },
        "Text Translator": { value: "1,000,000 credits" },
        "Grammar Spell Check": { value: "1,000,000 credits" },
        " Courses": { enabled: true },
        "Stunning Videos": { enabled: true },
        "Stories for marketing": { enabled: true },
        " Presentations": { enabled: true },
        "Hollywood Storylines": { enabled: true },
        "Building Rapport": { enabled: true },
        "Ai to build marketing stack": { enabled: true },
        "Images (Experimental)": { enabled: true },
        "Image Creation": { value: "100" },
      },
    },
  ];
  const featureLabels = [
    { label: "Voice Ai", isMain: true },
    { label: "Text To Voice", isMain: false },
    { label: "Characters per Script", isMain: false },
    { label: "Characters per Month", isMain: false },
    { label: "Number of Voices", isMain: false },
    { label: "Celebrity Voices", isMain: false },
    { label: "Clone Voices", isMain: false },
    { label: " Download", isMain: false },
    { label: "Audio Translator", isMain: false },
    { label: "Script Writting", isMain: false },
    { label: "Script Coach", isMain: false },
    { label: "Text Translator", isMain: false },
    { label: "Grammar Spell Check", isMain: false },
    { label: " Courses", isMain: true },
    { label: "Stunning Videos", isMain: false },
    { label: "Stories for marketing", isMain: false },
    { label: " Presentations", isMain: false },
    { label: "Hollywood Storylines", isMain: false },
    { label: "Building Rapport", isMain: false },
    { label: "Ai to build marketing stack", isMain: false },
    { label: "Images (Experimental)", isMain: true },
    { label: "Image Creation", isMain: false },
  ];

  const getBackgroundColors = (tier) => {
    let currentGroup = -1;
    return featureLabels.map((feature) => {
      if (feature.isMain) {
        currentGroup++;
      }
      return currentGroup % 2 === 0 ? tier.rowColor : "bg-white";
    });
  };

  const renderFeature = (feature, tier) => {
    const featureData = tier.features[feature.label];
    if (!featureData) return null;

    if (featureData.enabled !== undefined) {
      return featureData.enabled ? (
        <CheckIcon className="inline-block h-6 w-6  font-bold  text-orange-500 shadow-md shadow-orange-500" />
      ) : (
        <IconXCircle className="inline-block h-6 w-6 text-red-500 shadow-md shadow-red-300" />
      );
    }

    if (featureData.value) {
      return <span>{featureData.value}</span>;
    }

    return null;
  };
  const getProductId = (tier) => {
    return showMonthly ? tier.monthlyId : tier.yearlyId;
  };

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

      <div className="w-full overflow-x-auto">
        <div className="min-w-[1000px]">
          <div className="grid grid-cols-5 gap-4 p-4">
            <div className="flex flex-col">
              <div className="h-[132px]"></div>
              {featureLabels.map((feature, index) => (
                <div
                  key={index}
                  className={`flex h-[41px] items-center border-b py-2 text-left ${
                    feature.isMain ? "text-lg font-bold" : "pl-4 font-normal"
                  } last:border-b-0`}
                >
                  {feature.label}
                </div>
              ))}
            </div>

            {tiers.map((tier, tierIndex) => {
              const backgroundColors = getBackgroundColors(tier);
              const price = showMonthly ? tier.price : tier.yearlyPrice;
              const priceLabel = showMonthly ? "/month" : "/year";

              return (
                <div
                  key={tierIndex}
                  className="flex flex-col overflow-hidden rounded-lg bg-white shadow-lg"
                >
                  <div
                    className={`${tier.color} relative p-4 text-center text-white`}
                  >
                    <div className="text-xl font-bold">{tier.name}</div>
                    <div className="mt-2 text-3xl font-bold">
                      ${price}
                      <span className="text-sm font-normal">{priceLabel}</span>
                    </div>
                    {tier.label && (
                      <div className="absolute right-0 top-0 translate-x-6 translate-y-3 rotate-45 bg-yellow-400 px-2 py-1 text-xs text-black">
                        {tier.label}
                      </div>
                    )}
                  </div>
                  <div className="flex-grow p-4">
                    {featureLabels.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className={`${backgroundColors[featureIndex]} flex items-center justify-center border-b py-2 text-center last:border-b-0`}
                      >
                        {renderFeature(feature, tier)}
                      </div>
                    ))}
                  </div>
                  {tier.name !== "FREE" && (
                    <div className="p-4">
                      <CheckoutButton
                        productId={getProductId(tier)} // Use getProductId here
                        session={session}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingTable;
