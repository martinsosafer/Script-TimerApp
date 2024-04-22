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
  products: Product[];
}

const PriceCard: React.FC<PriceCardProps> = ({ products }) => {
  return (
    <>
      <div className="relative">
        {/* background decoration */}
        <div className="absolute inset-0 flex flex-col">
          <div className="flex-1 "></div>
          <div className="flex-1 bg-sky-500"></div>
        </div>
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-3 lg:gap-8 lg:px-8">
          {products.map((product) => (
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
                <p className="flex items-center justify-center text-sm font-semibold text-slate-500">
                  <span>USD</span>
                  <span className="ml-3 text-4xl text-slate-900">
                    ${product.metadata.price}
                  </span>
                  <span>/month</span>
                </p>
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
                      product.metadata[`notincluded${index}`]
                        ? "text-red-500"
                        : "hidden"
                    }`}
                  >
                    <IconXCircle className="h-5 w-5 shrink-0 text-red-500" />
                    <span className="ml-3">
                      {product.metadata[`notincluded${index}`]}
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
