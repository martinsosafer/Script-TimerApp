"use server";

import { db, eq, schema } from "@voiceai/db";

export async function addSpecial(formData: FormData) {
  const name = formData.get("name");
  const description = formData.get("description");
  const pages_display = formData.get("pages_display");
  const promo_code = formData.get("promo_code");
  const link = formData.get("link");
  const start_date = formData.get("start_date");
  const end_date = formData.get("end_date");
  const is_active = formData.get("is_active") as "active" | "inactive";

  console.log("raw start date", start_date);
  console.log("IS ACTIVE", is_active);

  const special = await db
    .insert(schema.monthlySpecials)
    .values({
      name,
      description,
      pages_display,
      promo_code,
      link,
      start_date,
      end_date,
      is_active,
    })
    .execute();

  return special;
}

export async function updateSpecial(formData: FormData, id: string) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const pages_display = formData.get("pages_display") as
    | "ALL"
    | "VOICE"
    | "CHAT"
    | "IMAGES"
    | "PLAGIARISM"
    | "UNIVERSITY"
    | "PLANS";
  const promo_code = formData.get("promo_code") as string;
  const link = formData.get("link") as string | undefined;
  const start_date = formData.get("start_date") as string;
  const end_date = formData.get("end_date") as string;
  const is_active = formData.get("is_active") as "active" | "inactive";

  console.log("raw start date", formData.get("start_date"));
  console.log("IS ACTIVE", is_active);

  // console.log("start_date", start_date);
  // console.log("end_date", end_date);

  const special = await db
    .update(schema.monthlySpecials)
    .set({
      name,
      description,
      pages_display,
      promo_code,
      link,
      start_date,
      end_date,
      is_active,
    })
    .where(eq(schema.monthlySpecials.id, id));

  return special;
}

export async function deleteSpecial(id: string) {
  await db
    .delete(schema.monthlySpecials)
    .where(eq(schema.monthlySpecials.id, id));
}
