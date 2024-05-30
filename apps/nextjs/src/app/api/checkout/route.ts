import type { NextRequest } from "next/server";
import { Stripe } from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const hostURL = process.env.HOST_URL;

export async function POST(req: NextRequest) {
  try {
    if (!stripeSecretKey) {
      throw new Error("Stripe secret key is not defined.");
    }

    const stripe = new Stripe(stripeSecretKey);

    const data = (await req.json()) as { productId?: string };

    if (!data.productId) {
      throw new Error("Product ID is not defined.");
    }

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
      allow_promotion_codes: true,
      success_url: `${hostURL}/success?sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${hostURL}/plans`,
    });

    return new Response(JSON.stringify({ session }));
  } catch (error) {
    console.error(error);
  }
}
