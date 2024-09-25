"use server";

import { db, eq, schema } from "@voiceai/db";

import {
  STARTING_11CL_CREDITS,
  STARTING_CL_CREDITS,
  STARTING_IMG_CREDITS,
  STARTING_OPENAI_CREDITS,
} from "../../constants/credits";

export async function monthlyCreditsReset(userId: string) {
  const now = new Date();
  const currentPeriod = new Date(now.getFullYear(), now.getMonth(), 1);

  const subscription = await db.query.subscriptions.findFirst({
    where: (subscriptions, { eq }) => eq(subscriptions.userId, userId),
  });

  if (!subscription || subscription.current_period_start === currentPeriod) {
    return;
  }

  if (!subscription.current_period_start) {
    await db
      .update(schema.subscriptions)
      .set({
        current_period_start: currentPeriod,
      })
      .where(eq(schema.subscriptions.userId, userId))
      .execute();
  }

  if (
    subscription.current_period_start &&
    subscription.current_period_start < currentPeriod
  ) {
    await db
      .update(schema.clCredits)
      .set({ credits: STARTING_CL_CREDITS[subscription.status] })
      .where(eq(schema.clCredits.userId, userId))
      .execute();

    await db
      .update(schema.elevenLabsCredit)
      .set({ credits: STARTING_11CL_CREDITS[subscription.status] })
      .where(eq(schema.elevenLabsCredit.userId, userId))
      .execute();

    await db
      .update(schema.openAiCredit)
      .set({ credits: STARTING_OPENAI_CREDITS[subscription.status] })
      .where(eq(schema.openAiCredit.userId, userId))
      .execute();

    await db
      .update(schema.imgCredit)
      .set({ credits: STARTING_IMG_CREDITS[subscription.status] })
      .where(eq(schema.imgCredit.userId, userId))
      .execute();

    await db
      .update(schema.subscriptions)
      .set({
        current_period_start: currentPeriod,
      })
      .where(eq(schema.subscriptions.userId, userId))
      .execute();
  }
}
