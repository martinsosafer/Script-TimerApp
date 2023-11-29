import type { Stripe } from "stripe";

import { formatAmountForStripe } from "./helpers";
import { stripe } from "./stripe";

export type { Stripe } from "stripe";

export const CURRENCY = "usd";
const YOUR_DOMAIN = process.env.AUTH_URL;

export async function checkSession(
  sessionId: string,
): Promise<Stripe.Checkout.Session> {
  const sessioncheck = await stripe.checkout.sessions.retrieve(sessionId);
  console.log("sessioncheck here", sessioncheck);
  //   const checkoutSession: Stripe.Checkout.Session =
  //     await stripe.checkout.sessions.create({
  //       line_items: [
  //         {
  //           // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
  //           price: "price_1OBnrmHO0Hm3SdwBz90rXUIe",
  //           quantity: 1,
  //         },
  //       ],
  //       mode: "subscription",
  //       ui_mode: "embedded",
  //       return_url: `${YOUR_DOMAIN}/settings/billing?session_id={CHECKOUT_SESSION_ID}`,
  //     });

  return sessioncheck;
}
