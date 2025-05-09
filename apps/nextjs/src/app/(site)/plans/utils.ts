import { Stripe } from "stripe";

import type { Session } from "@voiceai/auth";

export async function getSubscription(planId: string | null | undefined) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  // console.log("stripeSecret", stripeSecretKey);
  // console.log("planId", planId);

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

export function setHasPlan(
  session: Session | null,
  type: "FREE" | "EDUCATION" | "CREATOR" | "BUSINESS",
  interval: string | undefined,
  period: "monthly" | "yearly",
) {
  if (
    type === "FREE" &&
    (session?.user.subscription?.status === "FREE_TRIAL" ||
      session?.user.subscription?.status === "FREE")
  )
    return true;
  if (period === "monthly" && interval === "month") {
    if (session?.user.subscription?.status === type) return true;
    else if (
      session?.user.subscription?.status === "STUDENTCLMO" &&
      type === "EDUCATION"
    )
      return true;
    else if (
      session?.user.subscription?.status === "CREATORCLMO" &&
      type === "CREATOR"
    )
      return true;
    else if (
      session?.user.subscription?.status === "BUSINESSCLMO" &&
      type === "BUSINESS"
    )
      return true;
  }
  if (period === "yearly" && interval === "year") {
    if (session?.user.subscription?.status === type) return true;
    else if (
      session?.user.subscription?.status === "STUDENTCLYR" &&
      type === "EDUCATION"
    )
      return true;
    else if (
      session?.user.subscription?.status === "CREATORCLYR" &&
      type === "CREATOR"
    )
      return true;
    else if (
      session?.user.subscription?.status === "BUSINESSCLYR" &&
      type === "BUSINESS"
    )
      return true;
  }

  return false;
}
