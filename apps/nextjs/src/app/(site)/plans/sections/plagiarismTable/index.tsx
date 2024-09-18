import React, { forwardRef, useState } from "react";

import { CheckIcon } from "@voiceai/ui/@/icons/icons";

import CheckoutButton from "../priceCards/check-out-button";

const PlagiarismTable = forwardRef(
  ({ session, plagiarismMonthlyPlans, plagiarismYearlyPlans, id }) => {
    const [showMonthly, setShowMonthly] = useState(true);
    const tiers = [
      {
        name: "FREE",
        description: "Good for hobbyists",
        price: "0",
        yearlyMonthlyPrice: "",
        yearlyPrice: "",

        color: "bg-blue-400",
        rowColor: "bg-white",
        features: {
          "Script Writing": { enabled: true },
          "Ai Writing": { value: "40,000 creditss" },
          "Translation - Audio & Text": { value: "40,000 credits" },
          "Grammar / Spell Checker": { value: "40,000 credits" },
          "6 Steps to Amazing Scripts": { enabled: true },

          "Plagiarism Detection": { enabled: true },
          "Included words per month": { value: "1,250" },
          "Plagiarism & Ai Detection": { enabled: true },
          "Source links to original": { enabled: true },
          "GPT, Claude, Gemini": { enabled: true },
          "Over 100 languages": { enabled: true },
          "Paraphrasing detection": { enabled: true },
          "Text spinner detection": { enabled: true },
        },
      },
      {
        name: "EDUCATION",
        description: "Discounted for .edu emails",
        price: 9,
        yearlyMonthlyPrice: 7.75,
        yearlyPrice: 93,
        productIdMonth: "prod_QsC2gen4V6MFdx",
        productIdYear: "prod_QsC2uouKNghxvv",
        color: "bg-blue-500",
        rowColor: "bg-white",
        features: {
          "Script Writing": { enabled: true },
          "Ai Writing": { value: "200,000 credits" },
          "Translation - Audio & Text": { value: "200,000 credits" },
          "Grammar / Spell Checker": { value: "200,000 credits" },
          "6 Steps to Amazing Scripts": { enabled: true },

          "Plagiarism Detection": { enabled: true },
          "Included words per month": { value: "10,000" },
          "Plagiarism & Ai Detection": { enabled: true },
          "Source links to original": { enabled: true },
          "GPT, Claude, Gemini": { enabled: true },
          "Over 100 languages": { enabled: true },
          "Paraphrasing detection": { enabled: true },
          "Text spinner detection": { enabled: true },
        },
      },
      {
        name: "CREATOR",
        description: "Discounted for .edu emails",
        price: 14,
        yearlyMonthlyPrice: 11,
        yearlyPrice: 132,
        productIdMonth: "prod_QsC286urBJ7Von",
        productIdYear: "prod_QsC2PGXx7AIB9Q",
        color: "bg-blue-600",
        rowColor: "bg-white",
        label: "Most Popular",
        features: {
          "Script Writing": { enabled: true },
          "Ai Writing": { value: "400,000 credits" },
          "Translation - Audio & Text": { value: "400,000 credits" },
          "Grammar / Spell Checker": { value: "400,000 credits" },
          "6 Steps to Amazing Scripts": { enabled: true },

          "Plagiarism Detection": { enabled: true },
          "Included words per month": { value: "15,000" },
          "Plagiarism & Ai Detection": { enabled: true },
          "Source links to original": { enabled: true },
          "GPT, Claude, Gemini": { enabled: true },
          "Over 100 languages": { enabled: true },
          "Paraphrasing detection": { enabled: true },
          "Text spinner detection": { enabled: true },
        },
      },
      {
        name: "BUSINESS",
        description: "Discounted for .edu emails",
        price: 19,
        yearlyMonthlyPrice: 16.41,
        yearlyPrice: 197,
        productIdMonth: "prod_QsC2n4FMuspdNO",
        productIdYear: "prod_QsC2dmRjqQqtlZ",
        color: "bg-blue-700",
        rowColor: "bg-white",

        features: {
          "Script Writing": { enabled: true },
          "Ai Writing": { value: "1,000,000 credits" },
          "Translation - Audio & Text": { value: "1,000,000 credits" },
          "Grammar / Spell Checker": { value: "1,000,000 credits" },
          "6 Steps to Amazing Scripts": { enabled: true },

          "Plagiarism Detection": { enabled: true },
          "Included words per month": { value: "20,000" },
          "Plagiarism & Ai Detection": { enabled: true },
          "Source links to original": { enabled: true },
          "GPT, Claude, Gemini": { enabled: true },
          "Over 100 languages": { enabled: true },
          "Paraphrasing detection": { enabled: true },
          "Text spinner detection": { enabled: true },
        },
      },
    ];

    const featureLabels = [
      { label: "Script Writing", isMain: true },
      { label: "Ai Writing", isMain: false },
      { label: "Translation - Audio & Text", isMain: false },
      { label: "Grammar / Spell Checker", isMain: false },
      { label: "6 Steps to Amazing Scripts", isMain: false },

      { label: "Plagiarism Detection", isMain: true },
      { label: "Included words per month", isMain: false },
      { label: "Plagiarism & Ai Detection", isMain: false },
      { label: "Source links to original", isMain: false },
      { label: "GPT, Claude, Gemini", isMain: false },
      { label: "Over 100 languages", isMain: false },
      { label: "Paraphrasing detection", isMain: false },
      { label: "Text spinner detection", isMain: false },
    ];
    const handleProductId = (tier) => {
      return showMonthly ? tier.productIdMonth : tier.productIdYear;
    };

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
        <div className="top-0 z-10 mt-10 bg-white px-4 py-6 text-center">
          <h2 className="font-poppins text-xl font-bold text-black md:text-2xl">
            Only need writing and Plagiarism / Ai support?
            <br className="mt-4" />
            Start here:
          </h2>
        </div>

        <div className="mb-14  mt-8 flex justify-center space-x-4">
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
            <div className="grid grid-cols-5 gap-2 px-20 py-8">
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
                      <div className="text-md absolute left-1/2 top-[-30px] z-[9999] min-h-[30px] min-w-[130px] max-w-max -translate-x-1/2 transform overflow-visible text-ellipsis whitespace-nowrap rounded-full border border-black bg-orange-500 px-4 py-1 text-center font-bold text-white">
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
                        {/* Display price with conditional label */}
                        {tier.name === "FREE" ? (
                          "Free"
                        ) : (
                          <>
                            ${price}
                            <span className="text-sm font-normal">
                              {showMonthly ? "/month" : "/month"}
                            </span>
                          </>
                        )}
                        {/* Always render the yearly price with consistent space allocation */}
                        <div
                          className={`text-md mt-1 text-gray-200 ${
                            showMonthly ? "invisible" : "visible"
                          } ${tier.name === "FREE" ? "mt-[5px] text-lg opacity-0" : "mt-[5px] text-lg opacity-100"}`}
                        >
                          ({tier.yearlyPrice}/year)
                        </div>
                        {/* Render button below yearly price */}
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
                        <CheckoutButton
                          session={session}
                          productId={handleProductId(tier)}
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
  },
);

export default PlagiarismTable;
