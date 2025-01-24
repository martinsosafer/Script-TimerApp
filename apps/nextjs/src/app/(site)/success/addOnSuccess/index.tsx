import type { Session } from "next-auth";

import { CheckIcon as Check } from "@voiceai/ui/@/icons/icons";

import { poppins, roboto } from "~/app/fonts";
import {
  ADD_ON_PRICES_ID,
  ADD_ON_PRODUCTS_ID,
  ADD_ON_TEST_PRICES_ID,
  ADD_ON_TEST_PRODUCTS_ID,
} from "~/constants/products";
import Button from "../../components/button/index";
import MotionTransition from "../../components/herosection/MotionTransition/MotionTransition";
import CheckoutButton from "../../plans-OLD/plans/plans-cards/checkout-button";

interface AddOnSuccessProps {
  userPlan: keyof typeof plans;
}

const productIds =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
    ? ADD_ON_PRODUCTS_ID
    : ADD_ON_TEST_PRODUCTS_ID;
const priceIds =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
    ? ADD_ON_PRICES_ID
    : ADD_ON_TEST_PRICES_ID;

export const plans = {
  STUDENT: {
    name: "STUDENT",
    yearlymonthlyPrice: 7.75,
    yearlyPrice: 93, // Discounted for annual payment
    monthlyPrice: 9,
    includedWords: 10000,
  },
  CREATOR: {
    name: "CREATOR",
    yearlymonthlyPrice: 11,
    yearlyPrice: 132, // Discounted for annual payment
    monthlyPrice: 14,
    includedWords: 15000,
  },
  BUSINESS: {
    name: "BUSINESS",
    yearlymonthlyPrice: 16.41,
    yearlyPrice: 197, // Discounted for annual payment
    monthlyPrice: 9,
    includedWords: 20000,
  },
};

const placeholderPlan = {
  yearlymonthlyPrice: "--",
  yearlyPrice: "--",
  monthlyPrice: "--",
  includedWords: "--",
};

export default function AddOnSuccess({
  type,
  period,
  userSession,
  interval,
  userPlan,
}: {
  type: "FREE" | "EDUCATION" | "CREATOR" | "BUSINESS";
  period: "monthly" | "yearly";
  userSession: Session | null;
  interval: string | undefined;
  userPlan: AddOnSuccessProps;
}) {
  const plan = plans[userPlan] || placeholderPlan;

  return (
    <div
      className={`relative h-[600px] w-full ${poppins.className} bg-gradient-to-br from-[#0066FF] to-[#000000] text-white`}
    >
      {/* Triangle Banner */}
      <div className="absolute right-0 top-0 h-[233px] w-[245px]">
        <div
          className="absolute h-full w-full "
          style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
        ></div>

        <div
          className="absolute flex h-[97%] w-[98%] items-center justify-center shadow-lg"
          style={{
            clipPath: "polygon(100% 0, 0 0, 100% 100%)",
            top: "1%",
            right: "1%",
            background: "linear-gradient(to bottom left, #FF9900, #FFFFFF)",
          }}
        >
          <span className="-translate-y-8 translate-x-10 rotate-45 transform text-[28px] font-bold text-white">
            TODAY ONLY
          </span>
        </div>
      </div>

      <div className="relative">
        <MotionTransition>
          <div>
            <div className="flex h-screen justify-center">
              <div className="h-[414px] w-[610px]">
                <div className="mb-[32px] mt-[45px] flex flex-col items-start gap-[12px]">
                  <h1 className="w-full text-start text-[34px] font-bold leading-[41px]">
                    Plagiarism & AI Detection
                  </h1>
                  <p
                    className={`${roboto.className} mt-2 text-start text-[14px] leading-[20px] text-blue-100`}
                  >
                    For professionals focused on SEO, professors, students
                    <br /> and anyone that needs original and clean copy.
                    <br />
                  </p>
                </div>
                <div className="grid gap-8 lg:grid-cols-[1fr,auto]">
                  <div className="overflow-hidden rounded-lg">
                    <div
                      className={`grid h-[288px] w-[393px] text-left text-[16px] font-normal leading-[22px] ${roboto.className}`}
                    >
                      <div className="grid h-[48px] w-[393px] grid-cols-2 items-center rounded-lg bg-[#0552C5] px-[12px]">
                        <span className="whitespace-nowrap">
                          Included words per month
                        </span>
                        <span className="mr-[28px] text-right">
                          {plan.includedWords}
                        </span>
                      </div>
                      <div className="grid h-[48px] w-[393px] grid-cols-2 items-center rounded-lg bg-[#0066FF] px-[12px]">
                        <span className="whitespace-nowrap">
                          Plagiarism & AI detection
                        </span>
                        <div className="mr-[45px]">
                          <Check className="ml-auto h-5 w-5 text-cyan-300" />
                        </div>
                      </div>
                      <div className="grid h-[48px] w-[393px] grid-cols-2 items-center rounded-lg bg-[#0552C5] px-[12px]">
                        <span className="whitespace-nowrap">
                          Source links to original
                        </span>
                        <div className="mr-[45px]">
                          <Check className="ml-auto h-5 w-5 text-cyan-300" />
                        </div>
                      </div>
                      <div className="grid h-[48px] w-[393px] grid-cols-2 items-center rounded-lg bg-[#0066FF] px-[12px]">
                        <span>GPT, Claude, Gemini</span>
                        <div className="mr-[45px]">
                          <Check className="ml-auto h-5 w-5 text-cyan-300" />
                        </div>
                      </div>
                      <div className="grid h-[48px] w-[393px] grid-cols-2 items-center rounded-lg bg-[#0552C5] px-[12px]">
                        <span>Over 100 languages</span>
                        <div className="mr-[45px]">
                          <Check className="ml-auto h-5 w-5 text-cyan-300" />
                        </div>
                      </div>
                      <div className="grid h-[48px] w-[393px] grid-cols-2 items-center rounded-lg bg-[#0066FF] px-[12px]">
                        <span>Paraphrasing detection</span>
                        <div className="mr-[45px]">
                          <Check className="ml-auto h-5 w-5 text-cyan-300" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Plans */}
                  <div className="mt-[2px] flex flex-col justify-center">
                    <div className=" mb-6">
                      <h3 className="mb-2 text-[20px] font-bold leading-[28px] text-emerald-300">
                        Yearly Plan
                      </h3>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-[34px] font-bold leading-[41px]">
                          ${plan.yearlymonthlyPrice}
                        </span>
                        <span className="text-[14px] font-normal leading-[20px] text-gray-300">
                          /month
                        </span>
                      </div>
                      <div className="text-[18px] font-normal leading-[25px] text-gray-300">
                        ${plan.yearlyPrice}/year
                      </div>
                      <CheckoutButton
                        type="accent"
                        productId={productIds[type]?.[period]}
                        priceId={priceIds[type]?.[period]}
                        session={userSession}
                      />
                    </div>

                    <div className="">
                      <h3 className="mb-2 text-[20px] font-bold leading-[28px] text-emerald-300">
                        Monthly Plan
                      </h3>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-[34px] font-bold leading-[41px]">
                          ${plan.monthlyPrice}
                        </span>
                        <span className="text-[14px] font-normal leading-[20px] text-gray-300">
                          /month
                        </span>
                      </div>
                      <CheckoutButton
                        type="accent"
                        productId={productIds[type]?.[period]}
                        priceId={priceIds[type]?.[period]}
                        session={userSession}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MotionTransition>
      </div>
    </div>
  );
}
