import React, { forwardRef, useState } from "react";

import { CheckIcon } from "@voiceai/ui/@/icons/icons";

import CheckoutButton from "../priceCards/check-out-button";

const PlagiarismTable = forwardRef(
  (
    { id, monthlyPlans, yearlyPlans, currentPlan, planInterval, session },
    ref,
  ) => {
    const [showMonthly, setShowMonthly] = useState(true);
    const tiers = [
      {
        name: "EDUCATION",
        description: "Discounted for .edu emails",
        price: 9,
        yearlyMonthlyPrice: 9.97,
        yearlyPrice: 97,

        color: "bg-blue-500",
        rowColor: "bg-white",
        features: {
          "Script Writing": { enabled: true },
          "Script Coaching - Ai Rewriting": { value: "200,000 credits" },
          "Translation - Audio & Text": { value: "200,000 credits" },
          "Grammar / Spell Checker": { value: "200,000 credits" },
          "6 Steps to Amazing Scripts": { enabled: true },

          "Plagiarism and Ai Detective": { enabled: true },
          "Plagiarism & Ai Detection": { enabled: true },
          "Source links to original": { enabled: true },
          "GPT, Claude, Gemini detection": { enabled: true },
          "Over 100 language detection": { enabled: true },
          "Paraphrasing detection": { enabled: true },
          "Text spinner paraphrase detection": { enabled: true },
          "Included words per month": { value: "1,500" },
        },
      },
      {
        name: "CREATOR",
        description: "Discounted for .edu emails",
        price: 9,
        yearlyMonthlyPrice: 14.99,
        yearlyPrice: 149,
        color: "bg-blue-600",
        rowColor: "bg-white",
        label: "Most Popular",
        features: {
          "Script Writing": { enabled: true },
          "Script Coaching - Ai Rewriting": { value: "400,000 credits" },
          "Translation - Audio & Text": { value: "400,000 credits" },
          "Grammar / Spell Checker": { value: "400,000 credits" },
          "6 Steps to Amazing Scripts": { enabled: true },

          "Plagiarism and Ai Detective": { enabled: true },
          "Plagiarism & Ai Detection": { enabled: true },
          "Source links to original": { enabled: true },
          "GPT, Claude, Gemini detection": { enabled: true },
          "Over 100 language detection": { enabled: true },
          "Paraphrasing detection": { enabled: true },
          "Text spinner paraphrase detection": { enabled: true },
          "Included words per month": { value: "1,750" },
        },
      },
      {
        name: "BUSINESS",
        description: "Discounted for .edu emails",
        price: 9,
        yearlyMonthlyPrice: 19.97,
        yearlyPrice: 197,
        color: "bg-blue-700",
        rowColor: "bg-white",

        features: {
          "Script Writing": { enabled: true },
          "Script Coaching - Ai Rewriting": { value: "1,000,000 credits" },
          "Translation - Audio & Text": { value: "1,000,000 credits" },
          "Grammar / Spell Checker": { value: "1,000,000 credits" },
          "6 Steps to Amazing Scripts": { enabled: true },

          "Plagiarism and Ai Detective": { enabled: true },
          "Plagiarism & Ai Detection": { enabled: true },
          "Source links to original": { enabled: true },
          "GPT, Claude, Gemini detection": { enabled: true },
          "Over 100 language detection": { enabled: true },
          "Paraphrasing detection": { enabled: true },
          "Text spinner paraphrase detection": { enabled: true },
          "Included words per month": { value: "2000" },
        },
      },
    ];

    const featureLabels = [
      { label: "Script Writing", isMain: true },
      { label: "Script Coaching - Ai Rewriting", isMain: false },
      { label: "Translation - Audio & Text", isMain: false },
      { label: "Grammar / Spell Checker", isMain: false },
      { label: "6 Steps to Amazing Scripts", isMain: false },

      { label: "Plagiarism and Ai Detective", isMain: true },
      { label: "Plagiarism & Ai Detection", isMain: false },
      { label: "Source links to original", isMain: false },
      { label: "GPT, Claude, Gemini detection", isMain: false },
      { label: "Over 100 language detection", isMain: false },
      { label: "Paraphrasing detection", isMain: false },
      { label: "Text spinner paraphrase detection", isMain: false },
      { label: "Included words per month", isMain: false },
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
        if (feature.isMain) {
          return (
            <span className="inline-block h-6 w-6 text-black opacity-0">-</span>
          );
        } else {
          return featureData.enabled ? (
            <CheckIcon className="inline-block h-6 w-6 font-bold text-black" />
          ) : (
            <span className="inline-block h-6 w-6 text-black opacity-20">
              -
            </span>
          );
        }
      } else if (featureData.value) {
        return <span className="text-black">{featureData.value}</span>;
      }

      return null;
    };

    return (
      <>
        {/* Title for Plagiarism and Add-ons on the left side */}
        <div className="sticky top-0 z-10 bg-white px-4 py-3">
          <h2 className="text-blacks font-poppins text-xl font-bold  md:text-2xl">
            Only need writing and Plagiarism / Ai support? Start here:
          </h2>
        </div>

        <div className="mb-8  mt-8 flex justify-center space-x-4">
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
          <div
            className="flex min-w-[1200px] max-w-[1300px] "
            id="plagiarism-table"
          >
            <div className="grid grid-cols-5 gap-2 px-20 py-4">
              <div className="flex flex-col">
                <div className="h-[132px]"></div>
                {featureLabels.map((feature, index) => (
                  <div
                    key={index}
                    className={`flex h-[41px] items-center border-b py-2 text-left ${
                      feature.isMain ? "text-lg font-bold" : "pl-6 font-normal"
                    } last:border-b-0`}
                  >
                    {feature.label}
                  </div>
                ))}
              </div>

              {tiers.map((tier, tierIndex) => {
                const backgroundColors = getBackgroundColors(tier);
                const price = showMonthly
                  ? tier.price
                  : tier.yearlyMonthlyPrice;
                const priceLabel = showMonthly ? "/month" : "/month";
                return (
                  <div
                    key={tierIndex}
                    className="relative flex flex-col overflow-visible rounded-lg border border-black bg-slate-100 shadow-lg"
                  >
                    {/* Most Popular Badge (Horizontal and Centered at the Top) */}
                    {tier.label && (
                      <div className="absolute left-1/2 top-0 z-50 min-w-[130px] max-w-max -translate-x-1/2 -translate-y-1/2 transform overflow-hidden text-ellipsis whitespace-nowrap rounded-full border border-black bg-orange-500 px-4  text-center text-xs font-bold text-white">
                        {tier.label}
                      </div>
                    )}

                    <div
                      className={`${tier.color} relative p-2 text-center text-white`}
                    >
                      <div className="font-poppins text-xl">{tier.name}</div>
                      <div className="text-sm font-medium text-white">
                        {tier.description}
                      </div>
                      <div className="mt-2 text-3xl font-bold">
                        ${price}
                        <span className="text-sm font-normal">
                          {priceLabel}
                        </span>
                        <div
                          className={`mt-1 text-lg text-gray-200 ${showMonthly ? "invisible" : "visible"}`}
                        >
                          (${tier.yearlyPrice}/year)
                        </div>
                      </div>
                    </div>

                    <div className=" mt-[-25px] flex-grow p-4">
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
                      <div className="flex justify-center p-4">
                        <CheckoutButton session={session} />
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
  },
);

export default PlagiarismTable;
