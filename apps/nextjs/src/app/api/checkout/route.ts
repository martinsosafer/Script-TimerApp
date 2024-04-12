import { NextResponse } from "next/server";
import { Stripe } from "stripe";

export async function POST(request: { json: () => any }) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    throw new Error("Stripe secret key is not defined.");
  }

  const data = await request.json();
  const stripe = new Stripe(stripeSecretKey);

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: data.priceId,
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/plans",
  });
 

  return NextResponse.json({url:session.url});
}
