import React from "react";
import type { Metadata } from "next";
import { Stripe } from "stripe";

import { auth } from "@voiceai/auth";

import PlansSections from "./sections";
import type { Product } from "./types";

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
  }) as Product[];

  enum Plans {
    STUDENT = "Student Plan",
    CREATOR = "Creator Plan",
    BUSINESS = "Business Plan",
  }
  const plans: Plans[] = [Plans.STUDENT, Plans.CREATOR, Plans.BUSINESS];

  products.sort((a, b) => a.metadata.price - b.metadata.price);

  // Filter products into monthly and yearly plans
  const monthlyPlans = products.filter(
    (product) =>
      product.metadata.price <= 39 && plans.includes(product.name as Plans),
  );
  const yearlyPlans = products.filter(
    (product) =>
      product.metadata.price > 39 && plans.includes(product.name as Plans),
  );

  const orderedMonthlyPlans = monthlyPlans.sort(
    (a, b) => a.metadata.price - b.metadata.price,
  );

  const orderedYearlyPlans = yearlyPlans.sort(
    (a, b) => a.metadata.price - b.metadata.price,
  );

  return { monthlyPlans: orderedMonthlyPlans, yearlyPlans: orderedYearlyPlans };
}

async function getSubscription(planId: string | null | undefined) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    throw new Error("Stripe secret key is not defined.");
  }

  if (!planId || planId === "initial_plan_id") {
    return undefined;
  }

  const stripe = new Stripe(stripeSecretKey);

  try {
    const subscription = await stripe.subscriptions.retrieve(planId);

    const subscriptionData = {
      billing_cycle_anchor: subscription.billing_cycle_anchor,
      current_period_end: subscription.current_period_end,
      current_period_start: subscription.current_period_start,
      days_until_due: subscription.days_until_due,
      plan: subscription.items.data[0]?.plan,
    };

    return subscriptionData;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

async function PlansPage() {
  const { monthlyPlans, yearlyPlans } = await loadProducts();
  const session = await auth();
  let subscription;
  if (session) {
    subscription = await getSubscription(session?.user.subscription?.planId);
  }

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full flex-col items-center bg-white px-4 pt-10 text-center xl:w-[1024px]">
        <h2 className="flex flex-col items-center text-3xl font-bold leading-tight tracking-tight text-primary xl:text-4xl xl:font-extrabold">
          <span>START NOW WITH</span>
          <span>SCRIPT WRITING, VOICEOVERS & MASTERCLASSES</span>
        </h2>
        <p className="mt-4 w-full text-lg font-medium  text-gray-500 xl:w-[600px]">
          Choose an affordable plan that&apos;s packed with the best features
          for engaging your audience, creating scripts, and more.
        </p>
        <span className="mt-2 font-bold text-black">
          Save up to 35% on yearly plans!
        </span>
      </div>
      <PlansSections
        monthlyPlans={monthlyPlans}
        yearlyPlans={yearlyPlans}
        planInterval={subscription?.plan?.interval}
      />
    </div>
  );
}

export default PlansPage;
