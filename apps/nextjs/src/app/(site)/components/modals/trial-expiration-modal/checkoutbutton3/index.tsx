"use client";

import React from "react";
import { useRouter } from "next/navigation";

import type { Session } from "@voiceai/auth";
import { Button } from "@voiceai/ui";

interface CheckoutButtonProps {
  productId: string; // Changed from priceId to productId to match the product ID

  session: Session | null;
}

function CheckoutButton3({ productId, session }: CheckoutButtonProps) {
  const router = useRouter();
  console.log("session", session);
  return (
    <Button
      variant="secondary"
      className="mt-2 bg-tertiary px-2 text-black hover:bg-orange-600"
      onClick={
        session
          ? async () => {
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
    >
      GET IT
    </Button>
  );
}

export default CheckoutButton3;
