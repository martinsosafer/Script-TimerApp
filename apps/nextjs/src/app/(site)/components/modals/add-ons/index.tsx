import { useState } from "react";

import type { Session } from "@voiceai/auth";
import { IconCheck, IconClose } from "@voiceai/ui/@/components/ui/icons";

import { roboto } from "~/app/fonts";
import MonthlyYearlyToogle from "./monthly-yearly-toogle";
import PlansCards from "./plans-card";

interface AddOnModalProps {
  onClose: () => void;
  session: Session | null;
  plan: "EDUCATION" | "CREATOR" | "BUSINESS";
}

const plans: Record<string, string> = {
  EDUCATION: "10,000",
  CREATOR: "15,000",
  BUSINESS: "20,000",
};

export default function AddOnModal({
  onClose,
  plan,
  session,
}: AddOnModalProps) {
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur">
      <section className="bg-cp-primary relative w-full overflow-hidden rounded-md md:flex md:h-[545px] md:w-[943px] md:rounded-xl">
        <button className="absolute right-4 top-4" onClick={onClose}>
          <IconClose className="h-5 w-5 text-white" />
        </button>
        <article className="bg-cp-background flex h-full w-[399px] flex-col items-center justify-center">
          <MonthlyYearlyToogle period={period} setPeriod={setPeriod} />
          <PlansCards type={plan} period={period} session={session} />
        </article>
        <article className="mt-[60px] flex w-[544px] flex-col items-center">
          <h2 className="text-center text-[34px] font-bold text-white">
            Plagiarism & AI Detection
          </h2>
          <p
            className={`${roboto.className} mt-[12px] w-[449px] text-center text-[14px] font-light text-white`}
          >
            Optional Add On for professionals focused on SEO, professors,
            students, and anyone that needs original and clean copy
          </p>
          <div className="mt-[44px] flex w-[393px] flex-col">
            <div className="flex h-[48px] w-full items-center justify-between rounded-md bg-[#0552C5] p-[12px]">
              <span
                className={`${roboto.className} w-[205px] text-[16px] font-light text-white`}
              >
                Included words per month
              </span>
              <span
                className={`${roboto.className} w-[122px] text-center text-[16px] font-light text-white`}
              >
                {plans[plan]}
              </span>
            </div>
            <div className="flex h-[48px] w-full items-center justify-between rounded-md p-[12px]">
              <span
                className={`${roboto.className} w-[205px] text-[16px] font-light text-white`}
              >
                Plagiarism & AI detection
              </span>
              <span
                className={`${roboto.className} flex w-[122px] items-center justify-center text-center text-[16px] font-light text-white`}
              >
                <IconCheck className="text-cp-accent h-6 w-6 drop-shadow-md" />
              </span>
            </div>
            <div className="flex h-[48px] w-full items-center justify-between rounded-md bg-[#0552C5] p-[12px]">
              <span
                className={`${roboto.className} w-[205px] text-[16px] font-light text-white`}
              >
                Source links to original
              </span>
              <span
                className={`${roboto.className} flex w-[122px] items-center justify-center text-[16px] font-light text-white`}
              >
                <IconCheck className="text-cp-accent h-6 w-6 drop-shadow-md" />
              </span>
            </div>
            <div className="flex h-[48px] w-full items-center justify-between rounded-md p-[12px]">
              <span
                className={`${roboto.className} w-[205px] text-[16px] font-light text-white`}
              >
                GPT, Claude, Gemini
              </span>
              <span
                className={`${roboto.className} flex w-[122px] items-center justify-center text-[16px] font-light text-white`}
              >
                <IconCheck className="text-cp-accent h-6 w-6 drop-shadow-md" />
              </span>
            </div>
            <div className="flex h-[48px] w-full items-center justify-between rounded-md bg-[#0552C5] p-[12px]">
              <span
                className={`${roboto.className} w-[205px] text-[16px] font-light text-white`}
              >
                Over 100 languages
              </span>
              <span
                className={`${roboto.className} flex w-[122px] items-center justify-center text-[16px] font-light text-white`}
              >
                <IconCheck className="text-cp-accent h-6 w-6 drop-shadow-md" />
              </span>
            </div>
            <div className="flex h-[48px] w-full items-center justify-between rounded-md border-b border-[#0552C5] p-[12px]">
              <span
                className={`${roboto.className} w-[205px] text-[16px] font-light text-white`}
              >
                Paraphrasing detection
              </span>
              <span
                className={`${roboto.className} flex w-[122px] items-center justify-center text-[16px] font-light text-white `}
              >
                <IconCheck className="text-cp-accent h-6 w-6 drop-shadow-md" />
              </span>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
