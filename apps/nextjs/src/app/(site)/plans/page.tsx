import React from "react";
import type { Metadata } from "next";
import { Stripe } from "stripe";

import CheckoutButton from "../components/checkoutButton";

export const metadata: Metadata = {
  title: "Plans",
  description: "List of all our current pay plans",
};

async function loadPrices() {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    throw new Error("Stripe secret key is not defined.");
  }

  const stripe = new Stripe(stripeSecretKey);
  const prices = await stripe.prices.list();
  const sortedPrices = prices.data.sort(
    (a, b) => a.unit_amount - b.unit_amount,
  );
  return sortedPrices;
}

async function PlansPage() {
  const prices = await loadPrices();

  return (
    <div className="flex h-screen items-center justify-center">
      <div>
        <header>
          <h1 className="my-5 text-center">PLANS</h1>
        </header>
        <div className="flex gap-x-2">
          {prices.map((price) => (
            <div key={price.id} className="mb-2 bg-slate-300 p-7">
              <h3>{price.nickname}</h3>
              {price.unit_amount != null && (
                <h2 className="text-3xl font-bold">
                  {price.unit_amount / 100}$
                </h2>
              )}
              <CheckoutButton priceId={price.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlansPage;
