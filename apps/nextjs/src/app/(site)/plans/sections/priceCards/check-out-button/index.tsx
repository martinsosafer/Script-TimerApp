"use client";

import React from "react";

interface CheckoutButtonProps {
  productId: string; // Changed from priceId to productId to match the product ID
  hasPlan: boolean;
}

function CheckoutButton({ productId, hasPlan }: CheckoutButtonProps) {
  return (
    <button
      className={`mt-8 block ${hasPlan ? "bg-gray-400" : "bg-orange-400 hover:bg-tertiary"}  px-6 py-4 text-center text-lg font-semibold leading-4 text-black shadow-md transition duration-300 ease-in-out`}
      style={{ borderRadius: "1rem" }}
      disabled={hasPlan}
      onClick={async () => {
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
      }}
    >
      {hasPlan ? "Current Plan" : "Get Started"}
    </button>
  );
}

export default CheckoutButton;
