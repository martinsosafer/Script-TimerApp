"use server";

import { db, eq, schema } from "@voiceai/db";

import type { LandingPage } from "./types";

export async function addLanding(payload: LandingPage) {
  const landing = await db
    .insert(schema.landingPage)
    .values({
      title: payload.title,
      description: payload.description,
      sub_description: payload.sub_description,
      lp_type: payload.lp_type,
      segment: payload.segment.trim(),
      video_url: payload.video_url,
      is_active: payload.is_active,
    })
    .execute();

  return landing;
}

export async function updateLanding(payload: LandingPage, id: string) {
  const special = await db
    .update(schema.landingPage)
    .set({
      title: payload.title,
      description: payload.description,
      sub_description: payload.sub_description,
      lp_type: payload.lp_type,
      segment: payload.segment.trim(),
      video_url: payload.video_url,
      is_active: payload.is_active,
    })
    .where(eq(schema.landingPage.id, id));

  return special;
}

export async function deleteLanding(id: string) {
  await db.delete(schema.landingPage).where(eq(schema.landingPage.id, id));
}
