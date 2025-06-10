"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@voiceai/ui";
import { toast } from "@voiceai/ui/@/components/ui/toast";

import type {
  I_AppSumoSubscription,
  I_Subscription,
} from "~/constants/types/subscriptions";
import type { BoosterType, SubData } from "../../boosters/types";
import BoostersModal from "../../components/modals/boosters-modal";
import CreditRow from "../credits-row";

type CreditsKey =
  | "cl_credit"
  | "11labs_credit"
  | "img_credit"
  | "openai_credit";

type Credits = Record<
  CreditsKey,
  {
    credits: number;
    id: string;
    created_at: Date;
    updated_at: Date;
    userId: string;
  } | null
> &
  Record<
    string,
    {
      credits: number;
      id: string;
      created_at: Date;
      updated_at: Date;
      userId: string;
    } | null
  >;

interface SubscriptionDetailsProps {
  subscription: I_AppSumoSubscription | I_Subscription | undefined;
  credits?: Credits | null | undefined;
  isAppSumo: boolean;
  plan?: string;
  subData: SubData;
  imgCredits:
    | {
        totalCredits: number;
        planCredits: number;
        boosterCredits: number;
      }
    | undefined;
  elevenLabsCredits:
    | {
        totalCredits: number;
        planCredits: number;
        boosterCredits: number;
      }
    | undefined;
  masterclassStatus: boolean;
}

export default function SubscriptionDetails({
  subscription,
  credits,
  isAppSumo,
  plan,
  subData,
  imgCredits,
  elevenLabsCredits,
  masterclassStatus,
}: SubscriptionDetailsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isBoostersModalOpen, setIsBoostersModalOpen] = useState(false);
  const [boosterType, setBoosterType] = useState<BoosterType | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const btParam = searchParams.get("bt");

  function getBillingDate(date: number) {
    return new Date(date * 1000).toLocaleDateString();
  }

  function getBillingAmount(amount: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount / 100);
  }

  function getDaysLeftInMonth() {
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const differenceInMilliseconds = endOfMonth.getTime() - now.getTime();
    const daysLeft = Math.ceil(
      differenceInMilliseconds / (1000 * 60 * 60 * 24),
    );
    return daysLeft;
  }

  const handleAllCredits = (key: CreditsKey) => {
    if (key === "11labs_credit") return elevenLabsCredits;
    if (key === "img_credit") return imgCredits;
    return;
  };

  // Show Booster toast for AppSumo users
  if (btParam) {
    toast({
      title: "Booster added!",
      description: `You have successfully added ${btParam} booster`,
    });
    // Remove param after showing toast
    return router.push("/my-profile");
  }

  const renderAppSumoDetails = () => (
    <>
      <div className="flex w-full flex-col gap-5 px-5 py-2 pt-4 md:flex-row md:px-12">
        <div className="flex w-full flex-col md:w-[50%]">
          <span className="px-2 text-xs text-gray-400">Plan Tier</span>
          <div className="flex h-[40px] items-center rounded-lg border border-gray-400 p-4 text-gray-500">
            Tier {(subscription as I_AppSumoSubscription)?.tier} -{" "}
            {(subscription as I_AppSumoSubscription)?.tier === 1
              ? "1 year of access"
              : "2 years of access"}
          </div>
        </div>
        <div className="flex w-full flex-col md:w-[50%]">
          <span className="px-2 text-xs text-gray-400">License Key</span>
          <div className="flex h-[40px] items-center rounded-lg border border-gray-400 p-4 text-gray-500">
            {(subscription as I_AppSumoSubscription)?.license_key || "N/A"}
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-5 px-5 py-2 pt-4 md:flex-row md:px-12">
        <div className="flex w-full flex-col md:w-[50%]">
          <span className="px-2 text-xs text-gray-400">Status</span>
          <div className="flex h-[40px] items-center rounded-lg border border-gray-400 p-4 text-gray-500">
            Active
          </div>
        </div>
        <div className="flex w-full flex-col md:w-[50%]">
          <span className="px-2 text-xs text-gray-400">Purchase Date</span>
          <div className="flex h-[40px] items-center rounded-lg border border-gray-400 p-4 text-gray-500">
            {(
              subscription as I_AppSumoSubscription
            )?.created_at?.toLocaleDateString() ?? "N/A"}
          </div>
        </div>
      </div>
    </>
  );

  const renderStripeDetails = () => (
    <>
      <div className="flex w-full flex-col gap-5 px-5 py-2 pt-4 md:flex-row md:px-12">
        <div className="flex w-full flex-col md:w-[50%]">
          <span className="px-2 text-xs text-gray-400">Plan</span>
          <div className="flex h-[40px] items-center rounded-lg border border-gray-400 p-4 text-gray-500">
            {plan}
          </div>
        </div>
        <div className="flex w-full flex-col md:w-[50%]">
          <span className="px-2 text-xs text-gray-400">Status</span>
          <div className="flex h-[40px] items-center rounded-lg border border-gray-400 p-4 text-gray-500">
            {plan === "FREE"
              ? "No Subscription"
              : plan === "FREE_TRIAL"
                ? "No Subscription"
                : (subscription as I_Subscription)?.status
                  ? "Active"
                  : "Inactive"}
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-5 px-5 py-2 pt-4 md:flex-row md:px-12">
        <div className="flex w-full flex-col md:w-[50%]">
          <span className="px-2 text-xs text-gray-400">Next Billing Date</span>
          <div className="flex h-[40px] items-center rounded-lg border border-gray-400 p-4 text-gray-500">
            {(subscription as I_Subscription)?.current_period_end
              ? getBillingDate(
                  (subscription as I_Subscription)?.current_period_end,
                )
              : "No Billing Date"}
          </div>
        </div>
        <div className="flex w-full flex-col md:w-[50%]">
          <span className="px-2 text-xs text-gray-400">
            Next Billing Amount
          </span>
          <div className="flex h-[40px] items-center rounded-lg border border-gray-400 p-4 text-gray-500">
            {getBillingAmount(
              (subscription as I_Subscription)?.plan?.amount ?? 0,
            )}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="mt-6 flex w-full flex-col pb-6">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary font-semibold text-white">
            1
          </span>
          <p className="text-xl font-semibold text-gray-700">
            Subscription Details
          </p>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="w-full">
            {isAppSumo ? renderAppSumoDetails() : renderStripeDetails()}
          </div>
        </div>

        {/* Usage */}
        <div className="mt-6 flex items-center gap-3">
          <span className="text-cp-white flex h-7 w-7 items-center justify-center rounded-full bg-primary font-semibold">
            2
          </span>
          <p className="text-xl font-semibold text-gray-700">Usage</p>
        </div>
        <div className="flex flex-col pb-2 pt-3 md:gap-3">
          {Object.keys(credits ?? {})?.map((key) => {
            if (!credits) return null;
            const credit = credits[key]?.credits ?? 0;
            return (
              <CreditRow
                key={key}
                creditsLeft={credit}
                type={key as CreditsKey}
                subscription={
                  (isAppSumo
                    ? ((
                        subscription as I_AppSumoSubscription
                      )?.tier?.toString() as "1" | "2")
                    : (subscription as I_Subscription)?.status.toUpperCase()) ??
                  plan
                }
                subData={subData}
                allCredits={handleAllCredits(key as CreditsKey)}
                isLoading={isLoading}
                setBoosterType={setBoosterType}
                setIsBoostersModalOpen={setIsBoostersModalOpen}
              />
            );
          })}
        </div>

        {/* Masterclasses */}
        <div className="sd:pt-0 flex w-full flex-col items-center justify-between gap-3 px-5 py-2 md:flex-row md:items-end md:gap-5 md:px-12">
          <div className="flex w-full flex-col md:w-[50%]">
            <span className="px-2 text-xs text-gray-400">
              Masterclasses status
            </span>
            <div className="flex h-[40px] items-center rounded-lg border border-gray-400 p-4 text-gray-500">
              {masterclassStatus ? "Activated" : "Not Activated"}
            </div>
          </div>
          <Button
            className="bg-cp-secondary-light hover:bg-cp-secondary h-10 w-full text-base md:w-[50%]"
            disabled={false}
            onClick={() => {
              setBoosterType("MASTERCLASS");
              setIsBoostersModalOpen(true);
            }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span className="ml-2">Adding...</span>
              </div>
            ) : (
              "Add Masterclasses"
            )}
          </Button>
        </div>

        {/* Reset In */}
        <div className="flex w-full px-5 py-4 md:gap-5 md:px-12">
          {!isAppSumo && (
            <div className="flex w-full flex-col md:w-[50%]">
              <span className="px-2 text-xs text-gray-400">Reset In</span>
              <div className="flex h-[40px] items-center rounded-lg border border-gray-400 p-4 text-gray-500">
                {`Reset In ${getDaysLeftInMonth()} ${getDaysLeftInMonth() === 1 ? "day" : "days"}`}
              </div>
            </div>
          )}
          <div className="w-0 md:w-[50%]" />
        </div>

        {/* Manage Subscription */}
        <div className="flex w-full px-5 pt-9 md:gap-5 md:px-12">
          <button
            className="flex w-full items-center justify-center rounded-lg bg-blue-200 px-4 py-2 text-primary hover:bg-blue-300 md:w-[50%]"
            onClick={() =>
              router.push(isAppSumo ? "https://appsumo.com" : "/plans")
            }
          >
            {isAppSumo ? "Manage AppSumo License" : "Manage Subscription"}
          </button>
          <div className="w-0 md:w-[50%]" />
        </div>
      </div>

      {isBoostersModalOpen && (
        <BoostersModal
          type={boosterType!}
          subData={subData}
          setIsBoostersModalOpen={setIsBoostersModalOpen}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setBoosterType={setBoosterType}
        />
      )}
    </>
  );
}
