import React from "react";

import { Button } from "@voiceai/ui";
import { IconCheck } from "@voiceai/ui/@/components/ui/icons";

const tiers = [
  {
    name: "FREE",
    price: 0,
    color: "bg-blue-400",
    rowColor: "bg-blue-100",
    features: [
      "waived",
      "2.0%",
      "100",
      "100 MB",
      "unlimited",
      true,
      true,
      true,
      false,
      false,
    ],
  },
  {
    name: "STUDENT",
    price: 59,
    color: "bg-blue-500",
    rowColor: "bg-blue-200",
    features: [
      "waived",
      "1.0%",
      "2,500",
      "500 MB",
      "unlimited",
      true,
      true,
      true,
      true,
      false,
    ],
  },
  {
    name: "CREATOR",
    price: 99,
    color: "bg-blue-600",
    rowColor: "bg-blue-300",
    label: "Most Popular",
    features: [
      "waived",
      "1.0%",
      "10,000",
      "1000 MB",
      "unlimited",
      true,
      true,
      true,
      true,
      true,
    ],
  },
  {
    name: "BUSINESS",
    price: 249,
    color: "bg-blue-700",
    rowColor: "bg-blue-400",
    features: [
      "waived",
      "0.5%",
      "25,000",
      "2.5 GB",
      "unlimited",
      true,
      true,
      true,
      true,
      true,
    ],
  },
];

const featureLabels = [
  "Feature 1",
  "Feature 1",
  "Feature 1",
  "Feature 1",
  "Feature 2 ",
  "Feature 1",
  "Feature 2",
  "Feature 3",
  "Feature 4",
  "Feature 5",
];

export default function PricingTable() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[1000px]">
        <div className="grid grid-cols-5 gap-4 p-4">
          {/* Feature names column */}
          <div className="flex flex-col">
            <div className="h-[132px]"></div>{" "}
            {/* Spacer to align with pricing headers */}
            {featureLabels.map((label, index) => (
              <div
                key={index}
                className="flex h-[41px] items-center border-b py-2 text-left font-semibold last:border-b-0"
              >
                {label}
              </div>
            ))}
          </div>

          {/* Pricing tiers */}
          {tiers.map((tier, index) => (
            <div
              key={index}
              className="flex flex-col overflow-hidden rounded-lg bg-white shadow-lg"
            >
              <div
                className={`${tier.color} relative p-4 text-center text-white`}
              >
                <div className="text-xl font-bold">{tier.name}</div>
                <div className="mt-2 text-3xl font-bold">
                  ${tier.price}
                  <span className="text-sm font-normal">/month</span>
                </div>
                {tier.label && (
                  <div className="absolute right-0 top-0 translate-x-6 translate-y-3 rotate-45 bg-yellow-400 px-2 py-1 text-xs text-black">
                    {tier.label}
                  </div>
                )}
              </div>
              <div className="flex-grow p-4">
                {tier.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className={`${
                      featureIndex % 2 === 0 ? tier.rowColor : "bg-gray-100" // Alternate color
                    } border-b py-2 text-center last:border-b-0`}
                  >
                    {typeof feature === "boolean" ? (
                      feature ? (
                        <IconCheck className="inline-block text-lg font-bold text-green-500" />
                      ) : (
                        "-"
                      )
                    ) : (
                      feature
                    )}
                  </div>
                ))}
              </div>
              {/* Conditionally render the button */}
              {tier.name !== "FREE" && (
                <div className="p-4">
                  <Button className="w-full bg-tertiary font-poppins text-lg font-bold hover:bg-orange-400 hover:text-primary">
                    Buy Membership
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
