"use server";

import { Stripe } from "stripe";

import { db, schema } from "@voiceai/db";

import { BOOSTER_START_CREDITS } from "~/constants/credits";
import { BOOSTER_PRICE_ID, TEST_BOOSTER_PRICE_ID } from "~/constants/products";
import type { SubData } from "./types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const priceId =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
    ? BOOSTER_PRICE_ID
    : TEST_BOOSTER_PRICE_ID;

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

// Create Images booster
export async function addBooster({
  subData,
  type,
}: {
  subData: SubData;
  type: "IMAGES" | "PLAGIARISM" | "VOICE";
}) {
  // console.log("subData", subData);
  try {
    const subscriptionId = subData?.planId;
    const priceIdByType = priceId[type as keyof typeof priceId];

    // console.log("priceIdByType", priceIdByType);

    const subscription = await stripe.subscriptions.retrieve(subscriptionId!);

    if (!subscription.items.data[0]) {
      throw new Error("Subscription not found");
    }
    // console.log("subscription", subscription.items);

    // Check if user already has a booster, and if it has credits
    // If user has a booster, return toast with credits left (ask Maury)

    // Make payment and confirm
    // const boosterPayment = await stripe.checkout.sessions.create({
    //   mode: "payment", // One-time payment
    //   customer: subscriptionId!,
    //   line_items: [
    //     {
    //       price: priceIdByType,
    //       quantity: 1,
    //     },
    //   ],
    // });
    // console.log("boosterPayment", boosterPayment);

    // Check if payment was not successful and throw error

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
  } catch (error) {
    console.error(error);
    throw error;
  }
}
