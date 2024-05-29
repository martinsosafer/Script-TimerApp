import type { NextRequest } from "next/server";
import { Stripe } from "stripe";

export async function GET(req: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const sessionId = req.nextUrl.searchParams.get("sessionId");

  if (!stripeSecretKey) {
    throw new Error("Stripe secret key is not defined.");
  }

  try {
    const stripe = new Stripe(stripeSecretKey);

    // Fetch session details based on productId
    const session = await stripe.checkout.sessions.retrieve(sessionId ?? "");

    const { subscription } = session;

    const stripeSubscription = await stripe.subscriptions.retrieve(
      subscription as string,
    );

    const productId = stripeSubscription.items.data[0]?.plan.product;

    const result = await stripe.products.retrieve(productId as string);

    return new Response(JSON.stringify(result));
  } catch (error) {
    console.error(error);
  }
}
