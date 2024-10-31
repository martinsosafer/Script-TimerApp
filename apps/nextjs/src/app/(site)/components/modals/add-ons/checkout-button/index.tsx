"use client";

import React from "react";
import { useRouter } from "next/navigation";

import type { Session } from "@voiceai/auth";

import Button from "~/app/(site)/components/button";

interface CheckoutButtonProps {
  productId: string | null | undefined; // Changed from priceId to productId to match the product ID
  hasPlan: boolean;
  session: Session | null;
  type: "primary" | "secondary" | "accent";
  onClose: () => void;
}

function CheckoutButton({
  productId,
  hasPlan,
  session,
  type,
  onClose,
}: CheckoutButtonProps) {
  const router = useRouter();

  return (
    <Button
      label={hasPlan ? "Current Plan" : "Get Started"}
      type={type}
      fit
      hight="h-[42px]"
      disabled={hasPlan}
      onClick={
        session
          ? session.user.subscription?.status === "FREE_TRIAL" ||
            session.user.subscription?.status === "FREE"
            ? () => {
                router.push("/new-plans#plans");
                onClose();
              }
            : async () => {
                const res = await fetch("/api/checkout", {
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

                window.location.href = url as string;
              }
          : () => router.push("/register")
      }
    />
  );
}

export default CheckoutButton;
