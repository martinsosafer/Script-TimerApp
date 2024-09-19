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

export async function extendFreeTrial(userId: string) {
  await db
    .update(schema.subscriptions)
    .set({
      free_trial_expiration: sql`NOW() + ${14} * INTERVAL '1 day'`,
      updated_at: sql`NOW()`,
    })
    .where(eq(schema.subscriptions.userId, userId))
    .execute();
}
