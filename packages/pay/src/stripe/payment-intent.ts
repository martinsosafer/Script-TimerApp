import type { Stripe } from "stripe";

import { formatAmountForStripe } from "./helpers";
import { stripe } from "./stripe";

export type { Stripe } from "stripe";

export const CURRENCY = "usd";

/**
 * This is not used, this is if one day we want a custom checkout form
 * @returns
 */
export async function paymentIntent(): Promise<Stripe.PaymentIntent> {
  const paymentIntent: Stripe.PaymentIntent =
    await stripe.paymentIntents.create({
      amount: 1099,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

  return paymentIntent;
}
