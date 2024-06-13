"use client";

import { useRouter } from "next/navigation";

import { api } from "~/utils/api";
import type { I_Subscription } from "../../plans/types";

interface SubscriptionDetailsProps {
  subscription: I_Subscription;
}

export default function SubscriptionDetails({
  subscription,
}: SubscriptionDetailsProps) {
  const { data: subscriptionData } = api.subscription.mySubscription.useQuery();
  const router = useRouter();

  function getBillingDate(date: number) {
    return new Date(date * 1000).toLocaleDateString();
  }

  function getBillingAmount(amount: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount / 100);
  }

  return (
    <div className="mt-6 flex w-full flex-col">
      <div className="flex items-center gap-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary font-semibold text-white">
          1
        </span>
        <p className="text-xl font-semibold text-gray-700">
          Subscription Details
        </p>
      </div>
      <div className="flex w-full items-start justify-between">
        <div>
          <div className="mt-3 flex gap-4 px-12 py-2">
            <div className="flex flex-col">
              <span className="px-2 text-xs text-gray-400">Plan</span>
              <div className="flex h-[40px] w-[280px] items-center rounded-lg border border-gray-400 p-4 text-gray-500">
                {subscriptionData?.status}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="px-2 text-xs text-gray-400">Status</span>
              <div className="flex h-[40px] w-[280px] items-center rounded-lg border border-gray-400 p-4 text-gray-500">
                {subscription?.plan?.active ? "Active" : "Inactive"}
              </div>
            </div>
          </div>
          <div className="flex gap-4 px-12 py-2">
            <div className="flex flex-col">
              <span className="px-2 text-xs text-gray-400">
                Next Billing Date
              </span>
              <div className="flex h-[40px] w-[280px] items-center rounded-lg border border-gray-400 p-4 text-gray-500">
                {getBillingDate(subscription?.current_period_end)}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="px-2 text-xs text-gray-400">
                Next Billing Amount
              </span>
              <div className="flex h-[40px] w-[280px] items-center rounded-lg border border-gray-400 p-4 text-gray-500">
                {getBillingAmount(subscription?.plan?.amount ?? 0)}
              </div>
            </div>
          </div>
        </div>
        <button
          className="mt-10 flex h-[40px] w-[200px] items-center justify-center rounded-lg bg-blue-200 p-4 text-primary hover:bg-blue-300 hover:font-semibold"
          onClick={() => router.push("/plans")}
        >
          Manage Subscription
        </button>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary font-semibold text-white">
          2
        </span>
        <p className="text-xl font-semibold text-gray-700">Usage Report</p>
      </div>
      <div className="mt-3 flex gap-4 px-12 py-2">
        <div className="flex flex-col">
          <span className="px-2 text-xs text-gray-400">Characters user</span>
          <div className="flex h-[40px] w-[280px] items-center rounded-lg border border-gray-400 p-4 text-gray-500">
            Characters user
          </div>
        </div>
        <div className="flex flex-col">
          <span className="px-2 text-xs text-gray-400">
            Characters remaining
          </span>
          <div className="flex h-[40px] w-[280px] items-center rounded-lg border border-gray-400 p-4 text-gray-500">
            Characters remaining
          </div>
        </div>
      </div>
      <div className="flex gap-4 px-12 py-2">
        <div className="flex flex-col">
          <span className="px-2 text-xs text-gray-400">Reset In</span>
          <div className="flex h-[40px] w-[280px] items-center rounded-lg border border-gray-400 p-4 text-gray-500">
            Reset In
          </div>
        </div>
      </div>
    </div>
  );
}
