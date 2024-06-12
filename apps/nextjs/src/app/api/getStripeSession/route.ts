import type { NextRequest } from "next/server";
import { Stripe } from "stripe";

import type { Plan } from "../../(site)/plans/types";

export async function GET(req: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const sessionId = req.nextUrl.searchParams.get("sessionId");
  const planId = req.nextUrl.searchParams.get("planId");

  if (!stripeSecretKey) {
    throw new Error("Stripe secret key is not defined.");
  }

  if (planId) {
    try {
      const stripe = new Stripe(stripeSecretKey);

      const plan = (await stripe.prices.retrieve(planId)) as Plan;

      return new Response(JSON.stringify(plan));
    } catch (error) {
      console.error(error);
    }
  }

  try {
    const stripe = new Stripe(stripeSecretKey);

    // Fetch session details based on productId
    const session = await stripe.checkout.sessions.retrieve(sessionId ?? "");

    const { subscription } = session;

    const stripeSubscription = await stripe.subscriptions.retrieve(
      subscription as string,
    );

    const planData = stripeSubscription.items.data[0]?.plan;

    const result = await stripe.products.retrieve(planData?.product as string);

    return new Response(
      JSON.stringify({ name: result.name, id: planData?.id }),
    );
  } catch (error) {
    console.error(error);
  }
}
