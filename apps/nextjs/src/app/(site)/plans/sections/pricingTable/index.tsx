import React, { useState } from "react";
import Link from "next/link";

import { CheckIcon } from "@voiceai/ui/@/icons/icons";

import CheckoutButton from "../priceCards/check-out-button";
import CheckoutButton2 from "../priceCards/check.out-button2";

const PricingTable = ({
  monthlyPlans,
  yearlyPlans,
  currentPlan,
  planInterval,
  session,
  scrollToPlagiarismTable,
}) => {
  const [showMonthly, setShowMonthly] = useState(true);

  const tiers = [
    {
      name: "FREE",
      description: "Good for hobbyists",
      price: "Free",
      yearlyPrice: "Free",
      yearlyMonthlyPrice: "",
      color: "bg-blue-400",
      // rowColor: "bg-blue-100",
      rowColor: "bg-white",
      features: {
        "Voice Ai": { enabled: true },
        "Text To Voice": { enabled: true },
        "Ultra High Quality": { value: "10 minutes" },
        "Characters Per Script": { value: "500" },
        "Total monthly characters": { value: "10,000" },
        "Highest Quality Voices": { enabled: false },
        "Download Voiceovers": { value: "Watermarked" },
        "Commercial License": { enabled: false },
        "Saved Voice History": { enabled: true },
        "Celebrity Voices": { enabled: false },
        "Voice Cloning": { enabled: false },
        "Speech to Speech Cloning": { enabled: false },
        "Transcribe Voice to Text": { enabled: true },
        "Multilingual Translation": { enabled: true },
        "Audio Translator": { enabled: true },
        "PDF, DOCX, SRT": { enabled: true },
        "Voice Actor Library": { enabled: true },
        "No watermark": { enabled: false },

        "Script Writing": { enabled: true },
        "Ai Writing": {
          value: "40,000 credits",
        },
        "Translation - Audio & Text": { value: "40,000 credits" },
        "Grammar / Spell Checker": { value: "40,000 credits" },
        "6 Steps to Amazing Scripts": { enabled: false },
        "Images (Experimental)": { enabled: true },
        "Image Creation": { value: "10" },
        "Storyboard creation": { enabled: true },
        "Blog Images": { enabled: true },
        "Social Media Images": { enabled: true },
        "Plagiarism Detection": { enabled: true },
        "Included words per month": { value: "1,250" },
        "Plagiarism & Ai Detection": { enabled: true },
        "Source links to original": { enabled: true },
        "GPT, Claude, Gemini": { enabled: true },
        "Over 100 languages": { enabled: true },
        "Paraphrasing detection": { enabled: true },
        "Text spinner detection": { enabled: true },

        "Easy Add-on": { value: "See Below" },

        Masterclasses: { enabled: false },
        "Stunning Videos": { value: "First 3 Lessons" },
        "Stories for marketing": { value: "First 3 Lessons" },
        " Presentations": { value: "First 3 Lessons" },
        "Hollywood Storylines": { value: "First 3 Lessons" },
        "Building Rapport": { value: "First 3 Lessons" },
        "Ai to build marketing stack": { value: "First 3 Lessons" },
      },
    },
    {
      name: "EDUCATION",
      description: "Discounted for .edu emails",
      price: 9,
      yearlyMonthlyPrice: 6.58,
      yearlyPrice: 79,
      monthlyId: "prod_Q6wRBImx4i9jIV",
      yearlyId: "prod_Q6wRBImx4i9jIV",
      color: "bg-blue-500",
      // rowColor: "bg-blue-200",
      rowColor: "bg-white",
      features: {
        "Voice Ai": { enabled: true },
        "Text To Voice": { enabled: true },
        "Ultra High Quality": { value: "40 minutes" },
        "Characters Per Script": { value: "2,000" },
        "Total monthly characters": { value: "40,000" },
        "Highest Quality Voices": { enabled: true },
        "Download Voiceovers": { enabled: true },
        "Commercial License": { enabled: false },
        "Saved Voice History": { enabled: true },
        "Celebrity Voices": { value: "YES" },
        "Voice Cloning": { enabled: false },
        "Speech to Speech Cloning": { enabled: false },
        "Transcribe Voice to Text": { enabled: true },
        "Multilingual Translation": { enabled: true },
        "Audio Translator": { enabled: true },
        "PDF, DOCX, SRT": { enabled: true },
        "Voice Actor Library": { enabled: true },
        "No watermark": { enabled: true },

        "Script Writing": { enabled: true },
        "Ai Writing": {
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
        "Plagiarism Detection": { enabled: true },
        "Included words per month": { value: "1,500" },
        "Plagiarism & Ai Detection": { enabled: true },
        "Source links to original": { enabled: true },
        "GPT, Claude, Gemini": { enabled: true },
        "Over 100 languages": { enabled: true },
        "Paraphrasing detection": { enabled: true },
        "Text spinner detection": { enabled: true },

        "Easy Add-on": { value: "See Below" },
        Masterclasses: { enabled: false },
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
      monthlyId: "prod_Q6wRA3CPKOd872",
      yearlyId: "prod_Q6wR4wC3Y5Yili",
      color: "bg-blue-600",
      // rowColor: "bg-blue-300",
      rowColor: "bg-white",
      label: "Most Popular",
      features: {
        "Voice Ai": { enabled: true },
        "Text To Voice": { enabled: true },
        "Ultra High Quality": { value: "80 minutes" },
        "Characters Per Script": { value: "5,000" },
        "Total monthly characters": { value: "80,000" },
        "Highest Quality Voices": { enabled: true },
        "Download Voiceovers": { enabled: true },
        "Commercial License": { enabled: true },
        "Saved Voice History": { enabled: true },
        "Celebrity Voices": { value: "YES" },
        "Voice Cloning": { enabled: false },
        "Speech to Speech Cloning": { enabled: true },
        "Transcribe Voice to Text": { enabled: true },
        "Multilingual Translation": { enabled: true },
        "Audio Translator": { enabled: true },
        "PDF, DOCX, SRT": { enabled: true },
        "Voice Actor Library": { enabled: true },
        "No watermark": { enabled: true },

        "Script Writing": { enabled: true },
        "Ai Writing": {
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
        "Plagiarism Detection": { enabled: true },
        "Included words per month": { value: "1,750" },
        "Plagiarism & Ai Detection": { enabled: true },
        "Source links to original": { enabled: true },
        "GPT, Claude, Gemini": { enabled: true },
        "Over 100 languages": { enabled: true },
        "Paraphrasing detection": { enabled: true },
        "Text spinner detection": { enabled: true },

        "Easy Add-on": { value: "See Below" },
        Masterclasses: { enabled: true },
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
      monthlyId: "prod_Q6wRdg67cs52NR",
      yearlyId: "prod_Q6wAIfC2x07sMV",
      color: "bg-blue-700",
      // rowColor: "bg-blue-400",
      rowColor: "bg-white",
      features: {
        "Voice Ai": { enabled: true },
        "Text To Voice": { enabled: true },
        "Ultra High Quality": { value: "125 minutes" },
        "Characters Per Script": { value: "10,000" },
        "Total monthly characters": { value: "125,000" },
        "Highest Quality Voices": { enabled: true },
        "Download Voiceovers": { enabled: true },
        "Commercial License": { enabled: true },
        "Saved Voice History": { enabled: true },
        "Celebrity Voices": { value: "YES" },
        "Voice Cloning": { enabled: false },
        "Speech to Speech Cloning": { enabled: true },
        "Transcribe Voice to Text": { enabled: true },
        "Multilingual Translation": { enabled: true },
        "Audio Translator": { enabled: true },
        "PDF, DOCX, SRT": { enabled: true },
        "Voice Actor Library": { enabled: true },
        "No watermark": { enabled: true },

        "Script Writing": { enabled: true },
        "Ai Writing": {
          value: "1,000,000 credits",
        },
        "Translation - Audio & Text": { value: "1,000,000 credits" },
        "Grammar / Spell Checker": { value: "1,000,000 credits" },
        "6 Steps to Amazing Scripts": { enabled: true },
        "Images (Experimental)": { enabled: true },
        "Image Creation": { value: "100" },
        "Storyboard creation": { enabled: true },
        "Blog Images": { enabled: true },
        "Social Media Images": { enabled: true },
        "Plagiarism Detection": { enabled: true },
        "Included words per month": { value: "2,000" },
        "Plagiarism & Ai Detection": { enabled: true },
        "Source links to original": { enabled: true },
        "GPT, Claude, Gemini": { enabled: true },
        "Over 100 languages": { enabled: true },
        "Paraphrasing detection": { enabled: true },
        "Text spinner detection": { enabled: true },

        "Easy Add-on": { value: "See Below" },

        Masterclasses: { enabled: true },
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
    { label: "Ultra High Quality", isMain: false },
    { label: "Characters Per Script", isMain: false },
    { label: "Total monthly characters", isMain: false },
    { label: "Highest Quality Voices", isMain: false },
    { label: "Download Voiceovers", isMain: false },
    { label: "Commercial License", isMain: false },
    { label: "Saved Voice History", isMain: false },
    { label: "Celebrity Voices", isMain: false },
    { label: "Voice Cloning", isMain: false },
    { label: "Speech to Speech Cloning", isMain: false },
    { label: "Transcribe Voice to Text", isMain: false },
    { label: "Multilingual Translation", isMain: false },
    { label: "Audio Translator", isMain: false },
    { label: "PDF, DOCX, SRT", isMain: false },
    { label: "Voice Actor Library", isMain: false },
    { label: "No watermark", isMain: false },
    { label: "Script Writing", isMain: true },
    { label: "Ai Writing", isMain: false },
    { label: "Translation - Audio & Text", isMain: false },
    { label: "Grammar / Spell Checker", isMain: false },
    { label: "6 Steps to Amazing Scripts", isMain: false },
    { label: "Images (Experimental)", isMain: true },
    { label: "Image Creation", isMain: false },
    { label: "Storyboard creation", isMain: false },
    { label: "Blog Images", isMain: false },
    { label: "Plagiarism Detection", isMain: true },
    { label: "Included words per month", isMain: false },
    { label: "Plagiarism & Ai Detection", isMain: false },
    { label: "Source links to original", isMain: false },
    { label: "GPT, Claude, Gemini", isMain: false },
    { label: "Over 100 languages", isMain: false },
    { label: "Paraphrasing detection", isMain: false },
    { label: "Text spinner detection", isMain: false },

    { label: "Easy Add-on", isMain: false },

    { label: "Masterclasses", isMain: true },
    { label: "Stunning Videos", isMain: false },
    { label: "Stories for marketing", isMain: false },
    { label: " Presentations", isMain: false },
    { label: "Hollywood Storylines", isMain: false },
    { label: "Building Rapport", isMain: false },
    { label: "Ai to build marketing stack", isMain: false },
  ];
  const hasPlan = (tierName) => {
    // Check if the current plan matches the tier name or if it's the special case
    if (tierName === "EDUCATION" && currentPlan === "STUDENT") {
      return true;
    }
    return tierName === currentPlan;
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

    // Check if feature data exists
    if (!featureData) {
      console.warn(`Feature ${feature.label} not found for tier ${tier.name}`);
      return null;
    }

    if (featureData.enabled !== undefined) {
      if (feature.isMain) {
        return (
          <span className="inline-block h-6 w-6 text-black opacity-0">-</span>
        );
      } else {
        return featureData.enabled ? (
          <CheckIcon className="inline-block h-6 w-6 font-bold text-black" />
        ) : (
          <span className="inline-block h-6 w-6 text-black">-</span>
        );
      }
    }

    if (
      typeof featureData.value === "string" &&
      feature.label === "Easy Add-on"
    ) {
      // Ensure scrollToPlagiarismTable is defined
      if (typeof scrollToPlagiarismTable === "function") {
        return (
          <button
            onClick={scrollToPlagiarismTable}
            className="cursor-pointer text-blue-500 "
          >
            {featureData.value}
          </button>
        );
      } else {
        console.warn("scrollToPlagiarismTable function is not defined");
        return null;
      }
    }

    if (React.isValidElement(featureData.value)) {
      return featureData.value;
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
      <div className="flex w-full flex-col items-center bg-white px-4  py-12 text-center xl:w-[800px]">
        <h1 className="mb-4 text-4xl font-bold text-primary lg:text-4xl">
          Co-Producer Plans
        </h1>
        <p className="text-black-700 text-base lg:text-xl">
          Transform your ideas into
          <br /> perfect scripts, voice overs, and images
          <br /> in every language. ﻿
        </p>
        <span className="mt-10 font-poppins font-bold text-black ">
          Get up to 4 months free on yearly plans!
        </span>
      </div>
      {/* SWITCHER */}
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
        <div className="flex min-w-[1300px] max-w-[1400px]">
          <div className="ml-7 grid grid-cols-5  gap-2 px-16  py-8">
            <div className="flex flex-col">
              <div className="h-[177px]"></div>
              {featureLabels.map((feature, index) => (
                <div
                  key={index}
                  className={`flex h-[41px] items-center border-b py-2 text-left ${
                    feature.isMain ? "text-lg font-bold" : " pl-6 font-normal"
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
                    <div className="text-md absolute left-1/2 top-[-30px] z-[9999] min-h-[30px] min-w-[130px] max-w-max -translate-x-1/2 transform overflow-visible text-ellipsis whitespace-nowrap rounded-full border border-black bg-orange-500 px-4 py-1 text-center font-bold text-white">
                      {tier.label}
                    </div>
                  )}

                  <div
                    className={`${tier.color} relative rounded-lg p-1 py-6 text-center text-white`}
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
                        } ${tier.name === "FREE" ? "opacity-0" : "mt-[11px] text-lg opacity-100"}`}
                      >
                        ({tier.yearlyPrice}/year)
                      </div>
                      {/* Render button below yearly price */}
                      <div className="flex justify-center">
                        {tier.name === "FREE" ? (
                          // Render 'Start Free Trial' button if the plan is free
                          <button
                            className={`mt-[7px] block w-[85%] ${
                              hasPlan(tier.name)
                                ? "bg-gray-400"
                                : "bg-white hover:bg-slate-300"
                            } whitespace-nowrap rounded-2xl px-2 text-center text-lg font-semibold text-primary shadow-md transition duration-300 ease-in-out`}
                          >
                            {/* Render "Current Plan" if the user has a FREE or FREE_TRIAL plan, otherwise "Start Free Trial" */}
                            <Link href="/signin">
                              {currentPlan === "FREE" ||
                              currentPlan === "FREE_TRIAL"
                                ? "Current Plan"
                                : "Free Trial"}
                            </Link>
                          </button>
                        ) : (
                          // Render CheckoutButton if the plan is not free
                          <CheckoutButton2
                            productId={getProductId(tier)}
                            session={session}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className=" mt-[-54px] flex-grow py-4">
                    {featureLabels.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className={`${backgroundColors[featureIndex]} flex items-center justify-center border-b py-2 text-center last:border-b-0`}
                      >
                        {renderFeature(feature, tier)}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center p-4">
                    {tier.name === "FREE" ? (
                      // Render 'Start Free Trial' button if the plan is free
                      <button
                        className={`mt-8 block w-[85%] ${
                          hasPlan(tier.name)
                            ? "bg-gray-400"
                            : "bg-orange-400 hover:bg-tertiary"
                        }  whitespace-nowrap rounded-2xl px-8 py-4 text-center text-lg font-semibold leading-4 text-black shadow-md transition duration-300 ease-in-out`}
                      >
                        {/* Render "Current Plan" if the user has a FREE or FREE_TRIAL plan, otherwise "Start Free Trial" */}
                        <Link href="/signin">
                          {currentPlan === "FREE" ||
                          currentPlan === "FREE_TRIAL"
                            ? "Current Plan"
                            : " Free Trial"}
                        </Link>
                      </button>
                    ) : (
                      // Render CheckoutButton if the plan is not free
                      <CheckoutButton
                        productId={getProductId(tier)}
                        session={session}
                      />
                    )}
                  </div>
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
