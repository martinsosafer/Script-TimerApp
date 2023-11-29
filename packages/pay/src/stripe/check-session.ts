import type { Stripe } from "stripe";

import { stripe } from "./stripe";

export type { Stripe } from "stripe";

export async function checkSession(
  sessionId: string,
): Promise<Stripe.Checkout.Session> {
  const sessioncheck = await stripe.checkout.sessions.retrieve(sessionId);

  return sessioncheck;
}
