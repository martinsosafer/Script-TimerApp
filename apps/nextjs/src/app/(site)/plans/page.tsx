import React from "react";
import type { Metadata } from "next";
import { Stripe } from "stripe";

import PriceCard from "~/app/_components/priceCards";

export const metadata: Metadata = {
  title: "Plans",
  description: "List of all our current pay plans",
};

async function loadProducts() {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    throw new Error("Stripe secret key is not defined.");
  }

  const stripe = new Stripe(stripeSecretKey);
  const stripeProducts = await stripe.products.list();

  const products = stripeProducts.data.map((stripeProduct) => {
    return {
      id: stripeProduct.id,
      name: stripeProduct.name,
      description: stripeProduct.description ?? "",
      metadata: {
        carddescription: stripeProduct.metadata.carddescription ?? "",
        mostpopular: stripeProduct.metadata.mostpopular ?? "",
        price: stripeProduct.metadata.price
          ? parseFloat(stripeProduct.metadata.price)
          : 0,
        notincluded1: stripeProduct.metadata.notincluded1 ?? "",
        notincluded2: stripeProduct.metadata.notincluded2 ?? "",
        notincluded3: stripeProduct.metadata.notincluded3 ?? "",
        notincluded4: stripeProduct.metadata.notincluded4 ?? "",
      },
      marketing_features: stripeProduct.features.map((feature) => ({
        name: feature.name,
      })),
    };
  });

  products.sort((a, b) => a.metadata.price - b.metadata.price);

  // Filter products into monthly and yearly plans
  const monthlyPlans = products.filter(
    (product) => product.metadata.price <= 39,
  );
  const yearlyPlans = products.filter((product) => product.metadata.price > 39);

  const orderedMonthlyPlans = monthlyPlans.sort(
    (a, b) => a.metadata.price - b.metadata.price,
  );

  const orderedYearlyPlans = yearlyPlans.sort(
    (a, b) => a.metadata.price - b.metadata.price,
  );

  return { monthlyPlans: orderedMonthlyPlans, yearlyPlans: orderedYearlyPlans };
}

async function PlansPage() {
  const { monthlyPlans, yearlyPlans } = await loadProducts();

  return (
    <>
      <div className="mx-auto max-w-7xl bg-white px-4 pt-10 text-center sm:px-6 lg:px-8">
        <h2 className="  text-8xl font-extrabold text-primary sm:text-5xl sm:leading-tight sm:tracking-tight">
          <span className="block">START NOW WITH</span>
          <span className="block">
            SCRIPT WRITING, VOICEOVERS & MASTERCLASSES
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-lg  font-medium  text-gray-500 ">
          Choose an affordable plan that`&apos;`s packed with the best features
          for engaging your audience, creating scripts, and more.
        </p>
        <span className="font-bold text-black">
          Save up to 35% on yearly plans!
        </span>
      </div>
      <PriceCard monthlyPlans={monthlyPlans} yearlyPlans={yearlyPlans} />
    </>
  );
}

export default PlansPage;
