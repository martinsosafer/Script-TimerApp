import { NextResponse } from "next/server";
import { Stripe } from "stripe";

export async function POST(request: { json: () => any }) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    throw new Error("Stripe secret key is not defined.");
  }

  const data = await request.json();
  const stripe = new Stripe(stripeSecretKey);

  // Fetch product details based on productId
  const product = await stripe.products.retrieve(data.productId);

  // Fetch price details based on priceId
  const price = await stripe.prices.retrieve(product.default_price);

  // Assuming subscription mode for checkout
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: price.id,
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/plans",
  });

  return NextResponse.json({ url: session.url });
}
