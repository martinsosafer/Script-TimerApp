"use server";

import { db, eq, schema } from "@voiceai/db";

export async function addPrompt(
  formData: FormData,
  categoryId: string,
  subcategoryId: string,
) {
  const name = formData.get("name") as string;
  const description = formData.get("description");
  const prompt_ai = formData.get("prompt_ai");
  const prompt_display = formData.get("prompt_display");
  const ai_model_type = formData.get("ai_model_type");
  const additional = formData.get("additional");
  const fields = typeof additional === "string" ? additional.split(",") : [];
  const mappedFields = fields.map((el) => el.trim());

  const prompt = await db
    .insert(schema.prompts)
    .values({
      name,
      description,
      category_id: categoryId,
      subcategory_id: subcategoryId,
      prompt_ai,
      prompt_display,
      additional_fields: mappedFields,
      ai_model_type,
    })
    .execute();

  return prompt;
}

export async function updatePrompt(
  formData: FormData,
  id: string,
  categoryId: string,
  subcategoryId: string,
) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string | undefined;
  const prompt_ai = formData.get("prompt_ai") as string | undefined;
  const prompt_display = formData.get("prompt_display") as string | undefined;
  const additional = formData.get("additional");
  const fields = typeof additional === "string" ? additional.split(",") : [];
  const mappedFields = fields.map((el) => el.trim());

  const ai_model_type = formData.get("ai_model_type") as
    | "CHAT"
    | "VOICE"
    | "IMAGE"
    | "OTHER";

  const prompt = await db
    .update(schema.prompts)
    .set({
      name,
      description,
      category_id: categoryId,
      subcategory_id: subcategoryId,
      prompt_ai,
      prompt_display,
      additional_fields: mappedFields,
      ai_model_type,
    })
    .where(eq(schema.prompts.id, id));

  return prompt;
}

export async function deletePrompt(id: string) {
  await db.delete(schema.prompts).where(eq(schema.prompts.id, id));
}
