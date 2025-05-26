"use server";

import { Stripe } from "stripe";

import { db, schema } from "@voiceai/db";

import { BOOSTER_START_CREDITS } from "~/constants/credits";
import { BOOSTER_PRICE } from "~/constants/products";
import type { BoosterType, SubData } from "./types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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
  try {
    const subscriptionId = subData?.planId;

    // Get stripe subscription Id
    const subscription = await stripe.subscriptions.retrieve(subscriptionId!);
    // Throw error if subscription not found
    if (!subscription.items.data[0]) {
      throw new Error("Subscription not found");
    }

    const stripeCustomerId = subscription?.customer as string;
    const paymentMethodId = subscription?.default_payment_method as string;

    // Booster payment
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

    // Check if payment was not successful and throw error
    if (!paymentIntent || paymentIntent.status !== "succeeded") {
      throw new Error("Payment failed: " + paymentIntent.status);
    }

    // Check if payment was not successful and throw error
    const paymentIntentRetrieve = await stripe.paymentIntents.retrieve(
      paymentIntent.id,
    );
    if (
      !paymentIntentRetrieve ||
      paymentIntentRetrieve.status !== "succeeded"
    ) {
      throw new Error("Payment failed: " + paymentIntentRetrieve.status);
    }

    // Insert booster in dB
    if (type === "IMAGES") {
      await db
        .insert(schema.imgBooster)
        .values({
          userId: subData?.userId,
          credits: BOOSTER_START_CREDITS.IMAGES,
        })
        .execute();
    }
    if (type === "PLAGIARISM") {
      await db
        .insert(schema.clBooster)
        .values({
          userId: subData?.userId,
          credits: BOOSTER_START_CREDITS.PLAGIARISM,
        })
        .execute();
    }
    if (type === "VOICE") {
      await db
        .insert(schema.elevenLabsBooster)
        .values({
          userId: subData?.userId,
          credits: BOOSTER_START_CREDITS.VOICE,
        })
        .execute();
    }
    if (type === "MASTERCLASS") {
      const now = new Date();
      const nextYear = new Date();
      nextYear.setFullYear(now.getFullYear() + 1);

      await db
        .insert(schema.masterclassBooster)
        .values({
          userId: subData?.userId,
          valid_until: nextYear,
        })
        .execute();
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
