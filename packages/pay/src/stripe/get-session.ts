import type { Stripe } from "stripe";

import { formatAmountForStripe } from "./helpers";
import { stripe } from "./stripe";

export type { Stripe } from "stripe";

export const CURRENCY = "usd";
const YOUR_DOMAIN = process.env.AUTH_URL;

export async function createCheckoutSession(): Promise<Stripe.Checkout.Session> {
  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: "price_1OBnrmHO0Hm3SdwBz90rXUIe",
          quantity: 1,
        },
      ],
      mode: "subscription",
      ui_mode: "embedded",
      return_url: `${YOUR_DOMAIN}/return`,
    });

  return checkoutSession;
}
