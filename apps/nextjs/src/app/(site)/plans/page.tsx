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
    STUDENTCLMO = "Plagiarism + Ai Detection: Edu / Mo",
    CREATORCLMO = "Plagiarism + Ai Detection: Creator / Mo",
    BUSINESSCLMO = "Plagiarism + Ai Detection: Business / Mo",
    STUDENTCLYR = "Plagiarism + Ai Detection: Edu / Yr",
    CREATORCLYR = "Plagiarism + Ai Detection: Creator / Yr",
    BUSINESSCLYR = "Plagiarism + Ai Detection: Business / Yr",
  }
  const plans: Plans[] = [Plans.STUDENT, Plans.CREATOR, Plans.BUSINESS];

  // Sort all products by price
  products.sort((a, b) => a.metadata.price - b.metadata.price);

  const originalPlans = products.filter((product) =>
    plans.includes(product.name as Plans),
  );

  const plagiarismProducts = products.filter((product) =>
    product.name.includes("Plagiarism + Ai Detection"),
  );

  const monthlyPlans = originalPlans.filter((product) =>
    product.name.toLowerCase().includes("/ mo"),
  );
  const yearlyPlans = originalPlans.filter((product) =>
    product.name.toLowerCase().includes("/ yr"),
  );

  const plagiarismMonthlyPlans = plagiarismProducts.filter((product) =>
    product.name.toLowerCase().includes("/ mo"),
  );
  const plagiarismYearlyPlans = plagiarismProducts.filter((product) =>
    product.name.toLowerCase().includes("/ yr"),
  );

  const orderedMonthlyPlans = monthlyPlans.sort(
    (a, b) => a.metadata.price - b.metadata.price,
  );
  const orderedYearlyPlans = yearlyPlans.sort(
    (a, b) => a.metadata.price - b.metadata.price,
  );
  const orderedPlagiarismMonthlyPlans = plagiarismMonthlyPlans.sort(
    (a, b) => a.metadata.price - b.metadata.price,
  );
  const orderedPlagiarismYearlyPlans = plagiarismYearlyPlans.sort(
    (a, b) => a.metadata.price - b.metadata.price,
  );

  return {
    monthlyPlans: orderedMonthlyPlans,
    yearlyPlans: orderedYearlyPlans,
    plagiarismMonthlyPlans: orderedPlagiarismMonthlyPlans,
    plagiarismYearlyPlans: orderedPlagiarismYearlyPlans,
  };
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
  const {
    monthlyPlans,
    yearlyPlans,
    plagiarismMonthlyPlans,
    plagiarismYearlyPlans,
  } = await loadProducts();
  const session = await auth();
  let subscription;
  if (session) {
    subscription = await getSubscription(session?.user.subscription?.planId);
  }

  return (
    <div className="flex w-full flex-col items-center">
      <PlansSections
        monthlyPlans={monthlyPlans}
        yearlyPlans={yearlyPlans}
        planInterval={subscription?.plan?.interval}
        session={session}
        plagiarismMonthlyPlans={plagiarismMonthlyPlans}
        plagiarismYearlyPlans={plagiarismYearlyPlans}
      />
      {/* <PricingTable /> */}
    </div>
  );
}

export default PlansPage;
