"use client";

import { useState } from "react";

import type { Session } from "@voiceai/auth";

import MonthlyYearlyToogle from "./monthly-yearly-toogle";
import PlansCards from "./plans-cards";

interface PlansProps {
  session: Session | null | undefined;
}

export default function Plans({ session }: PlansProps) {
  const [period, setPeriod] = useState<"monthly" | "yearly">("yearly");

  return (
    <div className="flex flex-col items-center p-8">
      <MonthlyYearlyToogle period={period} setPeriod={setPeriod} />
      <p className="mt-[24px] text-center text-[16px] font-semibold">
        You opened a secret 55% discount: Enter &apos;Friends025&apos; at
        checkout
      </p>
      <PlansCards period={period} session={session} />
    </div>
  );
}
