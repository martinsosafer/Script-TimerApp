"use server";

import { db, eq, schema } from "@voiceai/db";

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
