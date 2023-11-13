"use client";

import { useState } from "react";

import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

export default function Stripe() {
  const { data, isLoading } = api.subscription.session.useQuery();
  console.log("in stripe", data);

  return (
    <div className="flex w-full flex-col gap-4">
      {/* @ts-expect-error will type stripe later */}
      Loading Stripe {!isLoading && data && <>{data?.id}</>}
    </div>
  );
}
