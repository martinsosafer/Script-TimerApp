import { NextResponse } from "next/server";
import { Stripe } from "stripe";

export async function GET() {
  const stripe = new Stripe(stripeSecretKey);
  const products = await stripe.products.list();

  return NextResponse.json(products.data);
}
