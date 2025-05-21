"use server";

import { Stripe } from "stripe";

import { db, schema } from "@voiceai/db";

import { BOOSTER_START_CREDITS } from "~/constants/credits";
import {
  BOOSTER_PRICE,
  // BOOSTER_PRICE_ID,
  // TEST_BOOSTER_PRICE_ID,
} from "~/constants/products";
import type { BoosterType, SubData } from "./types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// const priceId =
//   process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
//     ? BOOSTER_PRICE_ID
//     : TEST_BOOSTER_PRICE_ID;

export async function getImageCredits(userId: string) {
  try {
    const credits = await db.query.imgCredit.findFirst({
      where: (credits, { eq }) => eq(credits.userId, userId),
    });

    return credits;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getPlagiarismCredits(userId: string) {
  try {
    const credits = await db.query.clCredits.findFirst({
      where: (credits, { eq }) => eq(credits.userId, userId),
    });

    return credits;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getVoiceCredits(userId: string) {
  try {
    const credits = await db.query.elevenLabsCredit.findFirst({
      where: (credits, { eq }) => eq(credits.userId, userId),
    });

    return credits;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Add booster by type
export async function addBooster({
  subData,
  type,
}: {
  subData: SubData;
  type: BoosterType;
}) {
  // console.log("subData", subData);
  try {
    const subscriptionId = subData?.planId;
    // const priceIdByType = priceId[type as keyof typeof priceId];

    // console.log("subscriptionId", subscriptionId);
    // console.log("priceIdByType", priceIdByType);

    // Get stripe subscription Id
    const subscription = await stripe.subscriptions.retrieve(subscriptionId!);
    // Throw error if subscription not found
    if (!subscription.items.data[0]) {
      throw new Error("Subscription not found");
    }
    // console.log("subscription", subscription);

    // const paymentMethodId =
    //   (subscription?.default_payment_method as string) ||
    //   (await stripe.customers.retrieve(subscription?.customer as string))
    //     .invoice_settings?.default_payment_method;
    const stripeCustomerId = subscription?.customer as string;
    const paymentMethodId = subscription?.default_payment_method as string;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: BOOSTER_PRICE[type] * 100, // Amount in cents
      currency: "usd",
      customer: stripeCustomerId,
      payment_method: paymentMethodId,
      off_session: true,
      confirm: true,
      description: `${type} Booster`,
      metadata: {
        userId: subData?.userId,
        boosterType: type,
      },
    });

    console.log("paymentIntent", paymentIntent);

    // Check if payment was not successful and throw error
    if (!paymentIntent || paymentIntent.status !== "succeeded") {
      throw new Error("Payment failed: " + paymentIntent.status);
    }

    // Make payment and confirm
    // const boosterPayment = await stripe.checkout.sessions.create({
    //   mode: "payment", // One-time payment
    //   customer: stripeCustomerId, // Customer ID from subscription
    //   line_items: [
    //     {
    //       price: priceIdByType,
    //       quantity: 1,
    //     },
    //   ],
    //   success_url: `${process.env.HOST_URL}/boosters`,
    //   cancel_url: `${process.env.HOST_URL}/plans`,
    // });
    // console.log("boosterPayment", boosterPayment);

    // Check if payment was not successful and throw error

    // Insert booster in dB
    // if (type === "IMAGES") {
    //   await db
    //     .insert(schema.imgBooster)
    //     .values({
    //       userId: subData?.userId,
    //       credits: BOOSTER_START_CREDITS.IMAGES,
    //     })
    //     .execute();
    // }
    // if (type === "PLAGIARISM") {
    //   await db
    //     .insert(schema.clBooster)
    //     .values({
    //       userId: subData?.userId,
    //       credits: BOOSTER_START_CREDITS.PLAGIARISM,
    //     })
    //     .execute();
    // }
    // if (type === "VOICE") {
    //   await db
    //     .insert(schema.elevenLabsBooster)
    //     .values({
    //       userId: subData?.userId,
    //       credits: BOOSTER_START_CREDITS.VOICE,
    //     })
    //     .execute();
    // }
    // if (type === "MASTERCLASS") {
    //   await db
    //     .insert(schema.masterclassBooster)
    //     .values({
    //       userId: subData?.userId,
    //       valid_until: new Date(),
    //     })
    //     .execute();
    // }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
