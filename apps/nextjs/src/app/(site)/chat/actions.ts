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

export async function getAllCategories() {
  try {
    const categories = await db.query.promptCategory.findMany();
    return categories;
  } catch (e) {
    console.error(e);
    throw new Error("Error fetching categories");
  }
}

export async function getAllSubCategories() {
  try {
    const subcategories = await db.query.promptSubcategory.findMany();
    return subcategories;
  } catch (e) {
    console.error(e);
    throw new Error("Error fetching subcategories");
  }
}
