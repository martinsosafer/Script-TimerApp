"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { set } from "zod";

import type { Session } from "@voiceai/auth";
import { is } from "@voiceai/db";

import Button from "~/app/(site)/components/button";
import { upgrade } from "~/app/actions/checkoutActions";

interface CheckoutButtonProps {
  productId: string | null | undefined; // Changed from priceId to productId to match the product ID
  hasPlan: boolean;
  session: Session | null;
  type: "primary" | "secondary" | "accent";
  onClose: () => void;
  currentPlan: string | null | undefined;
}

const clPlans = [
  "STUDENTCLMO",
  "CREATORCLMO",
  "BUSINESSCLMO",
  "STUDENTCLYR",
  "CREATORCLYR",
  "BUSINESSCLYR",
];

function CheckoutButton({
  productId,
  hasPlan,
  session,
  type,
  onClose,
  currentPlan,
}: CheckoutButtonProps) {
  const router = useRouter();
  const userId = session?.user.id ?? "";

  const [isLoading, setIsLoading] = useState(false);

  function getLabel() {
    if (isLoading) return "Upgrading...";
    if (clPlans.includes(currentPlan!)) {
      return "Upgraded";
    }
    return "Get Started";
  }

  return (
    <Button
      label={getLabel()}
      type={type}
      fit
      hight="h-[42px]"
      disabled={!hasPlan || clPlans.includes(currentPlan!)}
      onClick={
        session
          ? session.user.subscription?.status === "FREE_TRIAL" ||
            session.user.subscription?.status === "FREE"
            ? () => {
                router.push("/new-plans#plans");
                onClose();
              }
            : async () => {
                setIsLoading(true);
                await upgrade(
                  productId!,
                  session.user.subscription!.planId!,
                  userId,
                );
                setIsLoading(false);
                onClose();
              }
          : () => router.push("/register")
      }
    />
  );
}

export default CheckoutButton;
