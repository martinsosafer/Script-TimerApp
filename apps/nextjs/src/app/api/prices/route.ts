import { NextResponse } from "next/server";
import { Stripe } from "stripe";

export async function GET() {
  
  const stripe = new Stripe(stripeSecretKey);
  const prices = await stripe.prices.list();
 

  return NextResponse.json(prices.data);
}
