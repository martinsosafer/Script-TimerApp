"use client";

import React from "react";

import { useSharedState } from "~/app/context/State";

interface CheckoutButtonProps {
  productId: string; // Changed from priceId to productId to match the product ID
}

function CheckoutButton({ productId }: CheckoutButtonProps) {
  const { setSessionId } = useSharedState();
  return (
    <button
      className="mt-8 block  bg-orange-400 px-6 py-4 text-center text-lg font-semibold leading-4 text-black shadow-md transition duration-300 ease-in-out hover:bg-tertiary"
      style={{ borderRadius: "1rem" }}
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
          session: { id, url },
        } = await res.json();

        // setSessionId(id as string);

        window.location.href = url;
      }}
    >
      Get started
    </button>
  );
}

export default CheckoutButton;
