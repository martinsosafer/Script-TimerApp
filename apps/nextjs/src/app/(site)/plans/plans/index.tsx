"use client";

import { useState } from "react";

import type { Session } from "@voiceai/auth";

import UpgradeModal from "../../components/modals/upgrade-modal";
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
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [priceId, setPriceId] = useState("");

  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

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
        isUpgrading={isUpgrading}
        setIsUpgrading={setIsUpgrading}
        priceId={priceId}
        setPriceId={setPriceId}
        setSelectedPlan={setSelectedPlan}
      />
      <Explore
        session={session}
        period={period}
        interval={subscription?.interval}
        isUpgrading={isUpgrading}
        setIsUpgrading={setIsUpgrading}
        priceId={priceId}
        setPriceId={setPriceId}
        setSelectedPlan={setSelectedPlan}
      />
      {isUpgrading && (
        <UpgradeModal
          onClose={() => setIsUpgrading(false)}
          session={session}
          priceId={priceId}
          period={period}
          selectedPlan={selectedPlan}
        />
      )}
    </>
  );
}
