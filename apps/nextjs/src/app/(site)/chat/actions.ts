"use server";

import { db } from "@voiceai/db";

export async function getOpenAiCredits(userId: string) {
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

export async function getAllPrompts() {
  try {
    const prompts = await db.query.prompts.findMany();
    return prompts;
  } catch (e) {
    console.error(e);
    throw new Error("Error fetching prompts");
  }
}
