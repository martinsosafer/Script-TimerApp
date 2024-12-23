"use server";

import { db, eq, schema } from "@voiceai/db";

import type { MonthlySpecial } from "./types";

export async function addSpecial(payload: MonthlySpecial) {
  const special = await db
    .insert(schema.monthlySpecials)
    .values({
      name: payload.name,
      description: payload.description,
      type: payload.type,
      pages_display: payload.pages_display,
      promo_code: payload.promo_code,
      link: payload.link,
      start_date: payload.start_date,
      end_date: payload.end_date,
      is_active: payload.is_active,
    })
    .execute();

  return special;
}

export async function updateSpecial(payload: MonthlySpecial, id: string) {
  const special = await db
    .update(schema.monthlySpecials)
    .set({
      name: payload.name,
      description: payload.description,
      type: payload.type,
      pages_display: payload.pages_display,
      promo_code: payload.promo_code,
      link: payload.link,
      start_date: payload.start_date,
      end_date: payload.end_date,
      is_active: payload.is_active,
    })
    .where(eq(schema.monthlySpecials.id, id));

  return special;
}

export async function deleteSpecial(id: string) {
  await db
    .delete(schema.monthlySpecials)
    .where(eq(schema.monthlySpecials.id, id));
}
