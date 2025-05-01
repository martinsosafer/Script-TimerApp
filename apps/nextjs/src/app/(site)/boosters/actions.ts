"use server";

import { db } from "@voiceai/db";

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

export async function postImgBooster(userId: string) {
  // Check if user already has a booster
  // If user has a booster, return toast

  // Make payment and confirm
  // create booster and show confirmation toast
  
  // if error: show error toast

  // try {
  //   const credits = await db
  //     .update(db.imgCredit)
  //     .set({ credits: 100 })
  //     .where((credits, { eq }) => eq(credits.userId, userId))
  //     .returning()
  //     .execute();
  //   return credits;
  // } catch (error) {
  //   console.error(error);
  //   throw error;
  // }
}
