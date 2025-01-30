"use server";

import { db, eq, schema } from "@voiceai/db";

export async function addCategory(formData: FormData) {
  const name = formData.get("name") as string;

  const prompt = await db
    .insert(schema.promptCategory)
    .values({
      name,
    })
    .execute();

  return prompt;
}

export async function updateCategory(formData: FormData, id: string) {
  const name = formData.get("name") as string;

  const prompt = await db
    .update(schema.promptCategory)
    .set({
      name,
    })
    .where(eq(schema.promptCategory.id, id));

  return prompt;
}

export async function deletePrompt(id: string) {
  await db.delete(schema.prompts).where(eq(schema.prompts.id, id));
}

export async function addSubCategory(formData: FormData, id: string) {
  const name = formData.get("name") as string;

  console.log("data", name, id);

  const prompt = await db
    .insert(schema.promptSubcategory)
    .values({
      name,
      categoryId: id,
    })
    .execute();

  return prompt;
}

export async function updateSubcategory(
  formData: FormData,
  subcategoryId: string,
  categoryId: string,
) {
  const name = formData.get("name") as string;

  const prompt = await db
    .update(schema.promptSubcategory)
    .set({
      name,
      categoryId,
    })
    .where(eq(schema.promptSubcategory.id, subcategoryId));

  return prompt;
}
