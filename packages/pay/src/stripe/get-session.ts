import type { Stripe } from "stripe";

import { formatAmountForStripe } from "./helpers";
import { stripe } from "./stripe";

export type { Stripe } from "stripe";

export const CURRENCY = "usd";
const YOUR_DOMAIN = process.env.VERCEL_URL;

export async function createCheckoutSession(
  userID: string,
): Promise<Stripe.Checkout.Session> {
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
      client_reference_id: userID,
      return_url: `${YOUR_DOMAIN}/settings/billing?session_id={CHECKOUT_SESSION_ID}`,
    });

  return checkoutSession;
}
