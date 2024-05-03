import { NextResponse } from "next/server";
import { Stripe } from "stripe";

export async function GET(request: { json: () => any }) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    throw new Error("Stripe secret key is not defined.");
  }

  const stripe = new Stripe(stripeSecretKey);

  // Fetch session details based on productId
  const session = await stripe.checkout.sessions.retrieve(
    "cs_test_a1BJd19UXnQ1xDyVZ65s59lwNkqNKKcdIrs8qmX9FpzXexiLwRYXVuYfF4",
  );

  return NextResponse.json({ session });
}

// Assuming subscription mode for checkout
//   const session = await stripe.checkout.sessions.create({
//     mode: "subscription",
//     payment_method_types: ["card"],
//     line_items: [
//       {
//         price: price.id,
//         quantity: 1,
//       },
//     ],

//     success_url:
//       "http://localhost:3000/success?sessionid={CHECKOUT_SESSION_ID}",
//     cancel_url: "http://localhost:3000/plans",
//   });

//   return NextResponse.json({ session });
// }
