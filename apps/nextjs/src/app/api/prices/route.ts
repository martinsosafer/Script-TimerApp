import { NextResponse } from "next/server";
import { Stripe } from "stripe";

export async function GET() {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    return NextResponse.error(new Error("Stripe secret key is not defined."));
  }

  const stripe = new Stripe(stripeSecretKey);
  const products = await stripe.products.list();

  return NextResponse.json(products.data);
}
