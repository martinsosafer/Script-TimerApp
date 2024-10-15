"use client";

import React from "react";
import { useRouter } from "next/navigation";

import type { Session } from "@voiceai/auth";

interface CheckoutButtonProps {
  productId: string; // Changed from priceId to productId to match the product ID
  hasPlan: boolean;
  session: Session | null;
}

function CheckoutButton2({ productId, hasPlan, session }: CheckoutButtonProps) {
  const router = useRouter();
  console.log("session", session);
  return (
    <button
      className={`mt-1 block w-[50%] ${hasPlan ? "bg-gray-400" : "bg-white hover:bg-slate-300"}  px-1 py-2 text-center text-lg font-semibold leading-4 text-primary shadow-md transition duration-300 ease-in-out`}
      style={{ borderRadius: "1rem" }}
      disabled={hasPlan}
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
      {hasPlan ? "Current Plan" : "Get Started"}
    </button>
  );
}

export default CheckoutButton2;
