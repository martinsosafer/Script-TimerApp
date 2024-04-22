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

  // Transform Stripe products into the structure expected by PriceCard
  const products = stripeProducts.data.map((stripeProduct) => {
    // Log metadata for each product

    return {
      id: stripeProduct.id,
      name: stripeProduct.name,
      description: stripeProduct.description || "",
      metadata: {
        carddescription: stripeProduct.metadata.carddescription || "",
        mostpopular: stripeProduct.metadata.mostpopular || "",
        price: stripeProduct.metadata.price
          ? parseFloat(stripeProduct.metadata.price)
          : 0,
        notincluded1: stripeProduct.metadata.notincluded1 || "",
        notincluded2: stripeProduct.metadata.notincluded2 || "",
        notincluded3: stripeProduct.metadata.notincluded3 || "",
        notincluded4: stripeProduct.metadata.notincluded4 || "",
      },
      marketing_features: stripeProduct.features.map((feature) => ({
        name: feature.name,
      })),
    };
  });

  return products;
}

async function PlansPage() {
  const products = await loadProducts();

  return (
    <>
      <div className="mx-auto max-w-7xl bg-white px-4 pt-10 text-center sm:px-6 lg:px-8">
        <h2 className="  text-8xl font-extrabold text-primary sm:text-5xl sm:leading-tight sm:tracking-tight">
          <span className="block">START NOW WITH</span>
          <span className="block">SCRIPT COACHING & VOICEOVERS</span>
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-lg font-bold text-secondary-foreground ">
          Choose an affordable plan that's packed with the best features for
          engaging your audience, creating scripts, and more.
        </p>
      </div>
      <PriceCard products={products} />
    </>
  );
}

export default PlansPage;
