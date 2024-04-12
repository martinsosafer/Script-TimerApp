"use client";

import React from "react";

interface CheckoutButtonProps {
  priceId: string;
}

function CheckoutButton({ priceId }: CheckoutButtonProps) {
  return (
    <button
      className="rounded bg-sky-500 px-4 py-2 text-white"
      onClick={async () => {
        const res = await fetch("/api/checkout", {
          method: "POST",
          body: JSON.stringify({
            priceId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        window.location.href = data.url;
      }}
    >
      buy
    </button>
  );
}

export default CheckoutButton;
