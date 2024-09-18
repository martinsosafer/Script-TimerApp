"use server";

import { db, eq, schema } from "@voiceai/db";

export async function getCredits(userId: string) {
  try {
    const result = await db
      .select()
      .from(schema.clCredits)
      .leftJoin(
        schema.openAiCredit,
        eq(schema.clCredits.userId, schema.openAiCredit.userId),
      )
      .leftJoin(
        schema.elevenLabsCredit,
        eq(schema.clCredits.userId, schema.elevenLabsCredit.userId),
      )
      .leftJoin(
        schema.imgCredit,
        eq(schema.clCredits.userId, schema.imgCredit.userId),
      )
      .where(eq(schema.clCredits.userId, userId));
    return result;
  } catch (error) {
    console.error(error);
  }
}
