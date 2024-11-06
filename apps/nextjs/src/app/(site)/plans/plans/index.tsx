"use client";

import { useState } from "react";

import type { Session } from "@voiceai/auth";

import Explore from "../explore";
import MonthlyYearlyToogle from "./monthly-yearly-toogle";
import PlansCards from "./plans-cards";

interface Plan {
  id: string;
  interval: string;
  active: boolean;
  amount: number;
}

interface PlansProps {
  session: Session | null;
  subscription: Plan | null;
}

export default function Plans({ session, subscription }: PlansProps) {
  const [period, setPeriod] = useState<"monthly" | "yearly">("yearly");

  return (
    <>
      <MonthlyYearlyToogle period={period} setPeriod={setPeriod} />
      <p className="mt-[24px] text-center text-[16px] font-semibold">
        Get up to 4 months free on Yearly plans!
      </p>
      <PlansCards
        period={period}
        session={session}
        interval={subscription?.interval}
      />
      <Explore
        session={session}
        period={period}
        interval={subscription?.interval}
      />
    </>
  );
}
