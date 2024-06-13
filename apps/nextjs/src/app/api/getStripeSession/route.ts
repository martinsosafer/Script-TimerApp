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

    const planData = stripeSubscription.items.data[0]?.plan;

    const result = await stripe.products.retrieve(planData?.product as string);

    return new Response(
      JSON.stringify({ name: result.name, id: subscription }),
    );
  } catch (error) {
    console.error(error);
  }
}
