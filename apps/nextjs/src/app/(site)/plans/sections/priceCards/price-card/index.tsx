import { IconXCircle } from "@voiceai/ui/@/components/ui/icons";
import { CheckIcon } from "@voiceai/ui/@/icons/icons";

import type { PriceCardProps } from "../../../types";
import CheckoutButton from "../check-out-button";

const descriptions: Record<string, string> = {
  "Student Plan":
    "Affordable option with essential features perfect for those starting out.",
  "Creator Plan":
    "Advanced features for creative professionals to enhance their scripts & showcase their creativity.",
  "Business Plan":
    "Tailored approach for growing businesses to improve scripts & voiceovers.",
};

const productNames: Record<string, string> = {
  "Student Plan": "STUDENT",
  "Creator Plan": "CREATOR",
  "Business Plan": "BUSINESS",
};

export default function PriceCard({
  product,
  currentPlan,
  interval,
  session,
  isYearly = false,
}: PriceCardProps) {
  function hasPlan(
    interval: string | undefined,
    currentPlan: string | undefined,
  ) {
    if (interval === "year" && isYearly) {
      return currentPlan === productNames[product.name];
    }
    if (interval === "month" && !isYearly) {
      return currentPlan === productNames[product.name];
    }
    return false;
  }

  return (
    <div
      key={product.id}
      className="hover:border-xl relative flex min-h-[780px] w-[320px] flex-col justify-between rounded-2xl border-2 border-black bg-white px-4 py-6 shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:transform"
    >
      <div>
        <div className="flex flex-col items-center rounded-xl bg-primary p-4">
          <h3 className="text-center text-3xl font-semibold leading-8 text-white">
            {product.name}
          </h3>
          {product.metadata.mostpopular === "True" && (
            <p className="text-md absolute top-0 -translate-y-1/2 rounded-full bg-tertiary px-3 py-0.5 font-semibold tracking-wide text-white shadow-md">
              Most Popular
            </p>
          )}
          <p className="mt-4 text-center text-sm font-semibold leading-4 text-white">
            {product.metadata.carddescription}
          </p>
        </div>
        <div className="-mx-4 mt-4 rounded-lg bg-slate-100 p-6 text-center">
          <div className="flex flex-col items-center justify-center">
            <span className="text-4xl font-semibold text-slate-900">
              $
              {isYearly
                ? (product.metadata.price / 12).toFixed(2)
                : product.metadata.price}
            </span>
            {isYearly && (
              <span className="mt-1 text-lg text-slate-500">
                ${product.metadata.price}/yr
              </span>
            )}
          </div>
        </div>
        <ul className="mt-4 flex flex-col gap-2">
          {/* Render features */}
          {product.marketing_features.map((feature, index) => (
            <li key={index} className={`flex text-sm leading-6 text-slate-700`}>
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
      </div>
      <div className="flex flex-col items-center">
        <CheckoutButton
          productId={product.id}
          hasPlan={hasPlan(interval, currentPlan)}
          session={session}
        />

        <p className="mt-4 p-2 text-center text-xs text-gray-600">
          {descriptions[product.name]}
        </p>
      </div>
    </div>
  );
}
