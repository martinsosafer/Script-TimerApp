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
      description: "Services for our free users",
      price: 0,
      yearlyPrice: 0,
      yearlyMonthlyPrice: 0,
      color: "bg-blue-400",
      rowColor: "bg-blue-100",
      features: {
        "Voice Ai": { enabled: true },
        "Text To Voice": { enabled: true },
        "Ultra-high quality text to voice per month": { value: "44 minutes" },
        "Text to Voice characters per script": { value: "2,000" },
        "Total monthly characters": { value: "40,000" },
        "Highest quality Models": { enabled: true },
        "Download Voiceovers": { enabled: true },
        "Commercial License": { enabled: false },
        "Saved Voice History": { enabled: true },
        "Celebrity Voices": { value: "YES" },
        "Clone your voice ": { enabled: false },
        "Speech to Speech Cloning": { enabled: false },
        "Transcription: Speech to Text": { enabled: true },
        "Translation into 27 languages": { enabled: false },
        "Audio Translator": { enabled: true },
        "PDF, DOCX, SRT Downloads": { enabled: true },
        "Voice Actor Library": { enabled: true },
        "No watermark": { enabled: true },

        "Script Writting": { enabled: true },
        "Script Coaching - Ai Rewriting": {
          value: "200,000 credits",
        },
        "Translation - Audio & Text": { value: "200,000 credits" },
        "Grammar / Spell Checker": { value: "200,000 credits" },
        "6 Steps to Amazing Scripts": { enabled: true },
        "Images (Experimental)": { enabled: true },
        "Image Creation": { value: "25" },
        "Storyboard creation": { enabled: true },
        "Blog Images": { enabled: true },
        "Social Media Images": { enabled: true },
        " Courses": { enabled: false },
        "Stunning Videos": { value: "First 3 Lessons" },
        "Stories for marketing": { value: "First 3 Lessons" },
        " Presentations": { value: "First 3 Lessons" },
        "Hollywood Storylines": { value: "First 3 Lessons" },
        "Building Rapport": { value: "First 3 Lessons" },
        "Ai to build marketing stack": { value: "First 3 Lessons" },
      },
    },
    {
      name: "STUDENT",
      description: "Discounted for .edu emails",
      price: 9,
      yearlyMonthlyPrice: 6.58,
      yearlyPrice: 79,
      monthlyId: "prod_PwYfAY9nKwQ9iV",
      yearlyId: "prod_PwaJpA8vUeG6Wv",
      color: "bg-blue-500",
      rowColor: "bg-blue-200",
      features: {
        "Voice Ai": { enabled: true },
        "Text To Voice": { enabled: true },
        "Ultra-high quality text to voice per month": { value: "44 minutes" },
        "Text to Voice characters per script": { value: "2,000" },
        "Total monthly characters": { value: "40,000" },
        "Highest quality Models": { enabled: true },
        "Download Voiceovers": { enabled: true },
        "Commercial License": { enabled: false },
        "Saved Voice History": { enabled: true },
        "Celebrity Voices": { value: "YES" },
        "Clone your voice ": { enabled: false },
        "Speech to Speech Cloning": { enabled: false },
        "Transcription: Speech to Text": { enabled: true },
        "Translation into 27 languages": { enabled: true },
        "Audio Translator": { enabled: true },
        "PDF, DOCX, SRT Downloads": { enabled: true },
        "Voice Actor Library": { enabled: true },
        "No watermark": { enabled: true },

        "Script Writting": { enabled: true },
        "Script Coaching - Ai Rewriting": {
          value: "200,000 credits",
        },
        "Translation - Audio & Text": { value: "200,000 credits" },
        "Grammar / Spell Checker": { value: "200,000 credits" },
        "6 Steps to Amazing Scripts": { enabled: true },
        "Images (Experimental)": { enabled: true },
        "Image Creation": { value: "25" },
        "Storyboard creation": { enabled: true },
        "Blog Images": { enabled: true },
        "Social Media Images": { enabled: true },
        " Courses": { enabled: false },
        "Stunning Videos": { value: "First 3 Lessons" },
        "Stories for marketing": { value: "First 3 Lessons" },
        " Presentations": { value: "First 3 Lessons" },
        "Hollywood Storylines": { value: "First 3 Lessons" },
        "Building Rapport": { value: "First 3 Lessons" },
        "Ai to build marketing stack": { value: "First 3 Lessons" },
      },
    },
    {
      name: "CREATOR",
      description: "Ideal for creative professionals",
      price: 19,
      yearlyMonthlyPrice: 14.75,
      yearlyPrice: 177,
      monthlyId: "prod_PwYzKaNnHflnUj",
      yearlyId: "prod_PwaNjdYvuqa5Io",
      color: "bg-blue-600",
      rowColor: "bg-blue-300",
      label: "Most Popular",
      features: {
        "Voice Ai": { enabled: true },
        "Text To Voice": { enabled: true },
        "Ultra-high quality text to voice per month": { value: "80 minutes" },
        "Text to Voice characters per script": { value: "5,000" },
        "Total monthly characters": { value: "80,000" },
        "Highest quality Models": { enabled: true },
        "Download Voiceovers": { enabled: true },
        "Commercial License": { enabled: true },
        "Saved Voice History": { enabled: true },
        "Celebrity Voices": { value: "YES" },
        "Clone your voice ": { enabled: true },
        "Speech to Speech Cloning": { enabled: true },
        "Transcription: Speech to Text": { enabled: true },
        "Translation into 27 languages": { enabled: true },
        "Audio Translator": { enabled: true },
        "PDF, DOCX, SRT Downloads": { enabled: true },
        "Voice Actor Library": { enabled: true },
        "No watermark": { enabled: true },

        "Script Writting": { enabled: true },
        "Script Coaching - Ai Rewriting": {
          value: "400,000 credits",
        },
        "Translation - Audio & Text": { value: "400,000 credits" },
        "Grammar / Spell Checker": { value: "400,000 credits" },
        "6 Steps to Amazing Scripts": { enabled: true },
        "Images (Experimental)": { enabled: true },
        "Image Creation": { value: "50" },
        "Storyboard creation": { enabled: true },
        "Blog Images": { enabled: true },
        "Social Media Images": { enabled: true },
        " Courses": { enabled: true },
        "Stunning Videos": { enabled: true },
        "Stories for marketing": { enabled: true },
        " Presentations": { enabled: true },
        "Hollywood Storylines": { enabled: true },
        "Building Rapport": { enabled: true },
        "Ai to build marketing stack": { enabled: true },
      },
    },
    {
      name: "BUSINESS",
      description: "Best for brand marketers",
      price: 39,
      yearlyMonthlyPrice: 24.75,
      yearlyPrice: 297,
      monthlyId: "prod_PwZAZujl0DVkgR",
      yearlyId: "prod_PwaRtUe2crIFlW",
      color: "bg-blue-700",
      rowColor: "bg-blue-400",
      features: {
        "Voice Ai": { enabled: true },
        "Text To Voice": { enabled: true },
        "Ultra-high quality text to voice per month": { value: "125 minutes" },
        "Text to Voice characters per script": { value: "10000" },
        "Total monthly characters": { value: "125000" },
        "Highest quality Models": { enabled: true },
        "Download Voiceovers": { enabled: true },
        "Commercial License": { enabled: true },
        "Saved Voice History": { enabled: true },
        "Celebrity Voices": { value: "YES" },
        "Clone your voice ": { enabled: true },
        "Speech to Speech Cloning": { enabled: true },
        "Transcription: Speech to Text": { enabled: true },
        "Translation into 27 languages": { enabled: true },
        "Audio Translator": { enabled: true },
        "PDF, DOCX, SRT Downloads": { enabled: true },
        "Voice Actor Library": { enabled: true },
        "No watermark": { enabled: true },

        "Script Writting": { enabled: true },
        "Script Coaching - Ai Rewriting": {
          value: "400,000 credits",
        },
        "Translation - Audio & Text": { value: "1,000,000 credits" },
        "Grammar / Spell Checker": { value: "1,000,000 credits" },
        "6 Steps to Amazing Scripts": { enabled: true },
        "Images (Experimental)": { enabled: true },
        "Image Creation": { value: "100" },
        "Storyboard creation": { enabled: true },
        "Blog Images": { enabled: true },
        "Social Media Images": { enabled: true },
        " Courses": { enabled: true },
        "Stunning Videos": { enabled: true },
        "Stories for marketing": { enabled: true },
        " Presentations": { enabled: true },
        "Hollywood Storylines": { enabled: true },
        "Building Rapport": { enabled: true },
        "Ai to build marketing stack": { enabled: true },
      },
    },
  ];
  const featureLabels = [
    { label: "Voice Ai", isMain: true },
    { label: "Text To Voice", isMain: false },
    { label: "Ultra-high quality text to voice per month", isMain: false },
    { label: "Text to Voice characters per script", isMain: false },
    { label: "Total monthly characters", isMain: false },
    { label: "Highest quality Models", isMain: false },
    { label: "Download Voiceovers", isMain: false },
    { label: "Commercial License", isMain: false },
    { label: "Saved Voice History", isMain: false },
    { label: "Celebrity Voices", isMain: false },
    { label: "Clone your voice ", isMain: false },
    { label: "Speech to Speech Cloning", isMain: false },
    { label: "Transcription: Speech to Text", isMain: false },
    { label: "Translation into 27 languages", isMain: false },
    { label: "Audio Translator", isMain: false },
    { label: "PDF, DOCX, SRT Downloads", isMain: false },
    { label: "Voice Actor Library", isMain: false },
    { label: "No watermark", isMain: false },
    { label: "Script Writting", isMain: true },
    { label: "Script Coaching - Ai Rewriting", isMain: false },
    { label: "Translation - Audio & Text", isMain: false },
    { label: "Grammar / Spell Checker", isMain: false },
    { label: "6 Steps to Amazing Scripts", isMain: false },
    { label: "Images (Experimental)", isMain: true },
    { label: "Image Creation", isMain: false },
    { label: "Storyboard creation", isMain: false },
    { label: "Blog Images", isMain: false },
    { label: "Social Media Images", isMain: false },
    { label: " Courses", isMain: true },
    { label: "Stunning Videos", isMain: false },
    { label: "Stories for marketing", isMain: false },
    { label: " Presentations", isMain: false },
    { label: "Hollywood Storylines", isMain: false },
    { label: "Building Rapport", isMain: false },
    { label: "Ai to build marketing stack", isMain: false },
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
        <CheckIcon className="inline-block h-6 w-6  font-bold  text-black " />
      ) : (
        <IconXCircle className="inline-block h-6 w-6 text-black" />
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
        <div className="min-w-[800px]">
          <div className="grid grid-cols-5 gap-2  px-20  py-4">
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
              const price = showMonthly ? tier.price : tier.yearlyMonthlyPrice;
              const priceLabel = showMonthly ? "/month" : "/month";

              return (
                <div
                  key={tierIndex}
                  className="relative flex flex-col overflow-visible rounded-lg border border-black bg-slate-100 shadow-lg"
                >
                  {/* Most Popular Badge (Horizontal and Centered at the Top) */}
                  {tier.label && (
                    <div className="absolute left-1/2 top-0 z-50 min-w-[80px] max-w-max -translate-x-1/2 -translate-y-1/2 transform overflow-hidden text-ellipsis whitespace-nowrap rounded-full border border-black bg-orange-500 px-4 py-1 text-xs font-bold text-black">
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
                      <span className="text-sm font-normal">{priceLabel}</span>
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
                    <div className="p-4">
                      <CheckoutButton
                        productId={getProductId(tier)}
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
