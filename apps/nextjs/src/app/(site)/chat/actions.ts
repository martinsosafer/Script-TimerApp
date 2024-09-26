"use server";

import { db } from "@voiceai/db";

export default async function getOpenAiCredits(userId: string) {
  try {
    const openAiCredits = await db.query.openAiCredit.findFirst({
      where: (openAiCredit, { eq }) => eq(openAiCredit.userId, userId),
    });

    return openAiCredits?.credits ?? 0;
  } catch (e) {
    console.error(e);
    throw new Error("Error fetching OpenAI credits");
  }
}
