"use server";

import { db, eq, schema, sql } from "@voiceai/db";

export async function addPlanId(userId: string, planId: string) {
  console.log(userId, planId);
  await db
    .update(schema.subscriptions)
    .set({ plan_id: planId, updated_at: sql`NOW()` })
    .where(eq(schema.subscriptions.userId, userId))
    .execute();
}
