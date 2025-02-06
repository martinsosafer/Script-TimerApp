"use client";

import React from "react";

import Button from "~/app/(site)/components/button";

interface CheckoutButtonProps {
  productId: string | null | undefined; // Changed from priceId to productId to match the product ID

  type: "primary" | "secondary" | "accent";
}

function CheckoutButton({
  productId,

  type,
}: CheckoutButtonProps) {
  async function checkOutOrUpgrade(productId: string) {
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

  return (
    <Button
      label={"Get Started"}
      type={type}
      fit
      height="h-[42px]"
      className="p-0"
      onClick={async () => await checkOutOrUpgrade(productId!)}
    />
  );
}

export default CheckoutButton;
