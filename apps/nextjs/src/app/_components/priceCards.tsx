"use client";

import React from "react";

import { IconXCircle } from "@voiceai/ui/@/components/ui/icons";
import { CheckIcon } from "@voiceai/ui/@/icons/icons";

import CheckoutButton from "../(site)/components/checkoutButton";

interface Product {
  id: string;
  name: string;
  description: string;
  metadata: {
    carddescription: string;
    mostpopular: string;
    price: number;
    notincluded1: string | null;
    notincluded2: string | null;
    notincluded3: string | null;
    notincluded4: string | null;
  };
  marketing_features: MarketingFeature[];
}

interface MarketingFeature {
  name: string;
}

interface PriceCardProps {
  monthlyPlans: Product[];
  yearlyPlans: Product[];
}

const PriceCard: React.FC<PriceCardProps> = ({ monthlyPlans, yearlyPlans }) => {
  const [showMonthly, setShowMonthly] = React.useState(true);
  console.log("monthly plans", monthlyPlans);
  return (
    <>
      <div className="mt-4 flex justify-center space-x-4">
        <div className="rounded-full bg-primary">
          <button
            className={`${
              showMonthly
                ? "rounded-full border-4 border-primary bg-blue-500 text-white"
                : "rounded-full border-4 border-primary bg-gray-200 text-gray-700"
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
                ? "rounded-full border-4 border-primary bg-blue-500 text-white"
                : "rounded-full border-4 border-primary bg-gray-200 text-gray-700"
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
        <div className="absolute  inset-0 flex h-full flex-col">
          <div className="flex-1"></div>
          <div className="flex-1 bg-sky-500"></div>
        </div>
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-3 lg:gap-8 lg:px-8">
          {showMonthly
            ? monthlyPlans.map((product) => (
                // Render monthly plans
                <div
                  key={product.id}
                  className="hover:border-xl relative flex flex-col rounded-2xl border-2 border-black bg-white p-8 shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:transform"
                >
                  <div className="rounded-xl bg-primary  p-8">
                    <h3 className="text-center text-4xl font-semibold leading-8 text-white">
                      {product.name}
                    </h3>
                    {product.metadata.mostpopular === "True" && (
                      <p className="absolute top-0  -translate-y-1/2 rounded-full bg-tertiary px-3 py-0.5 text-sm font-semibold tracking-wide text-white shadow-md">
                        Most Popular
                      </p>
                    )}
                    <p className="mt-4 text-center text-sm font-semibold leading-6 text-white">
                      {product.metadata.carddescription}
                    </p>
                  </div>
                  <div className="-mx-6 mt-4 rounded-lg bg-slate-100 p-6 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-4xl font-semibold text-slate-900">
                        ${product.metadata.price}
                      </span>
                      <span className="text-sm text-slate-500">USD/month</span>
                    </div>
                  </div>
                  <ul className="mt-6 flex-1 space-y-4">
                    {/* Render features */}
                    {product.marketing_features.map((feature, index) => (
                      <li
                        key={index}
                        className={`flex text-sm leading-6 text-slate-700`}
                      >
                        <CheckIcon className="h-5 w-5 shrink-0 text-primary" />
                        <span className="ml-3">{feature.name}</span>
                      </li>
                    ))}
                    {/* Render not included */}
                    {[1, 2, 3, 4].map((index) => (
                      <li
                        key={index}
                        className={`flex text-sm leading-6 ${
                          product.metadata[
                            `notincluded${index}` as keyof typeof product.metadata
                          ]
                            ? "text-red-500"
                            : "hidden"
                        }`}
                      >
                        <IconXCircle className="h-5 w-5 shrink-0 text-red-500" />
                        <span className="ml-3">
                          {
                            product.metadata[
                              `notincluded${index}` as keyof typeof product.metadata
                            ]
                          }
                        </span>
                      </li>
                    ))}
                  </ul>

                  <CheckoutButton productId={product.id} />
                </div>
              ))
            : yearlyPlans.map((product) => (
                // Render yearly plans
                <div
                  key={product.id}
                  className="hover:border-xl relative flex flex-col rounded-2xl border-2 border-black bg-white p-8 shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:transform"
                >
                  <div className="rounded-xl bg-primary  p-8">
                    <h3 className="text-center text-4xl font-semibold leading-8 text-white">
                      {product.name}
                    </h3>
                    {product.metadata.mostpopular === "True" && (
                      <p className="absolute top-0  -translate-y-1/2 rounded-full bg-tertiary px-3 py-0.5 text-sm font-semibold tracking-wide text-white shadow-md">
                        Most Popular
                      </p>
                    )}
                    <p className="mt-4 text-center text-sm font-semibold leading-6 text-white">
                      {product.metadata.carddescription}
                    </p>
                  </div>
                  <div className="-mx-6 mt-4 rounded-lg bg-slate-100 p-6 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-4xl font-semibold text-slate-900">
                        ${product.metadata.price}
                      </span>
                      <span className="text-sm text-slate-500">
                        USD/anually
                      </span>
                    </div>
                  </div>
                  <ul className="mt-6 flex-1 space-y-4">
                    {/* Render features */}
                    {product.marketing_features.map((feature, index) => (
                      <li
                        key={index}
                        className={`flex text-sm leading-6 text-slate-700`}
                      >
                        <CheckIcon className="h-5 w-5 shrink-0 text-primary" />
                        <span className="ml-3">{feature.name}</span>
                      </li>
                    ))}
                    {/* Render not included */}
                    {[1, 2, 3, 4].map((index) => (
                      <li
                        key={index}
                        className={`flex text-sm leading-6 ${
                          product.metadata[
                            `notincluded${index}` as keyof typeof product.metadata
                          ]
                            ? "text-red-500"
                            : "hidden"
                        }`}
                      >
                        <IconXCircle className="h-5 w-5 shrink-0 text-red-500" />
                        <span className="ml-3">
                          {
                            product.metadata[
                              `notincluded${index}` as keyof typeof product.metadata
                            ]
                          }
                        </span>
                      </li>
                    ))}
                  </ul>

                  <CheckoutButton productId={product.id} />
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default PriceCard;
