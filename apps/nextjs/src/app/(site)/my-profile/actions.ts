"use server";

import { db, eq, schema } from "@voiceai/db";
import { elevenLabsBooster } from "@voiceai/db/schema/11LabsBooster";
import { elevenLabsCredit } from "@voiceai/db/schema/11LabsCredits";

export async function getCredits(userId: string) {
  try {
    const result = await db
      .select()
      .from(schema.elevenLabsCredit)
      .leftJoin(
        schema.openAiCredit,
        eq(schema.elevenLabsCredit.userId, schema.openAiCredit.userId),
      )
      .leftJoin(
        schema.imgCredit,
        eq(schema.elevenLabsCredit.userId, schema.imgCredit.userId),
      )
      .leftJoin(
        schema.clCredits,
        eq(schema.elevenLabsCredit.userId, schema.clCredits.userId),
      )
      .where(eq(schema.elevenLabsCredit.userId, userId));
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function get11LabsPlanAndBoosterCredits(userId: string) {
  try {
    // Get plan credits
    const planCredits = await db.query.elevenLabsCredit.findFirst({
      where: eq(elevenLabsCredit.userId, userId),
    });

    // Get booster credits if available
    const boosterCredits = await db.query.elevenLabsBooster.findMany({
      where: eq(elevenLabsBooster.userId, userId),
    });
    console.log("boosterCredits", boosterCredits);
    let totalBoosterCredits = 0;
    if (boosterCredits.length > 0) {
      totalBoosterCredits = boosterCredits.reduce(
        (acc, booster) => acc + booster.credits,
        0,
      );
    }

    // Calculate total credits
    const totalCredits = (planCredits?.credits ?? 0) + totalBoosterCredits;
    console.log("totalCredits", totalCredits);
    console.log("planCredits", planCredits);
    console.log("totalBoosterCredits", totalBoosterCredits);
    return {
      planCredits: planCredits?.credits ?? 0,
      totalCredits,
      boosterCredits: totalBoosterCredits,
    };
  } catch (error) {
    console.error(error);
  }
}
