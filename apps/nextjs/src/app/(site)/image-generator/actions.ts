"use server";

import { db } from "@voiceai/db";

export async function getImgCredits(userId: string) {
  try {
    const credits = await db.query.imgCredit.findFirst({
      where: (credits, { eq }) => eq(credits.userId, userId),
    });

    // Get booster credits if available
    const boosterCredits = await db.query.imgBooster.findMany({
      where: (booster, { eq }) => eq(booster.userId, userId),
    });
    let totalBoosterCredits = 0;
    if (boosterCredits.length > 0) {
      totalBoosterCredits = boosterCredits.reduce(
        (acc, booster) => acc + booster.credits,
        0,
      );
    }

    const totalCredits = (credits?.credits ?? 0) + totalBoosterCredits;

    return totalCredits;
  } catch (error) {
    console.error(error);
  }
}
