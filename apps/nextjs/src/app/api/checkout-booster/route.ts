import type { NextRequest } from "next/server";
import { Stripe } from "stripe";

import type { BoosterType, SubData } from "~/app/(site)/boosters/types";
import { BOOSTER_PRICE } from "~/constants/products";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const hostURL = process.env.HOST_URL;

export async function POST(req: NextRequest) {
  try {
    if (!stripeSecretKey) {
      throw new Error("Stripe secret key is not defined.");
    }

    const stripe = new Stripe(stripeSecretKey);

    const data = (await req.json()) as { subData: SubData; type: BoosterType };

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${data.type} Booster`,
              description: `AppSumo user ${data.subData.planId}`,
            },
            unit_amount: BOOSTER_PRICE[data.type] * 100, // Amount in cents
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        metadata: {
          type: `${data.type} Booster`,
          userId: data.subData.userId,
          planId: `AppSumo Tier ${data.subData.status}`,
        },
      },
      allow_promotion_codes: true,
      success_url: `${hostURL}/boosters?sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${hostURL}/boosters`,
    });

    return new Response(JSON.stringify({ session }));
  } catch (error) {
    console.error(error);
  }
}
