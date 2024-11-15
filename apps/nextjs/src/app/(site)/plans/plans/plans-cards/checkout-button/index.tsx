"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import type { Session } from "@voiceai/auth";

import Button from "~/app/(site)/components/button";
import { upgrade } from "~/app/actions/checkoutActions";

interface CheckoutButtonProps {
  productId: string | null | undefined; // Changed from priceId to productId to match the product ID
  priceId: string | null | undefined;
  hasPlan: boolean;
  session: Session | null;
  type: "primary" | "secondary" | "accent";
  upgradeAction?: () => void;
}

function CheckoutButton({
  productId,
  priceId,
  hasPlan,
  session,
  type,
  upgradeAction,
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function checkOutOrUpgrade(
    plan: string,
    productId: string,
    priceId: string,
  ) {
    if (plan === "FREE_TRIAL" || plan === "FREE") {
      const res = await fetch("api/checkout", {
        method: "POST",
        body: JSON.stringify({
          productId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const {
        session: { url },
      } = await res.json();

      return (window.location.href = url as string);
    }

    if (upgradeAction) {
      return upgradeAction();
    }

    setIsLoading(true);
    await upgrade(
      priceId,
      session!.user.subscription!.planId!,
      session!.user.id,
    );
    setIsLoading(false);
    window.location.reload();
  }

  const router = useRouter();
  return (
    <Button
      label={
        isLoading ? "Upgrading..." : hasPlan ? "Current Plan" : "Get Started"
      }
      type={type}
      fit
      hight="h-[42px]"
      disabled={hasPlan}
      onClick={
        session
          ? async () =>
              await checkOutOrUpgrade(
                session.user.subscription!.status,
                productId!,
                priceId!,
              )
          : () => router.push("/register")
      }
    />
  );
}

export default CheckoutButton;
