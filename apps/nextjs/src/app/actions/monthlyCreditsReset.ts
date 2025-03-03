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

  const appSumoSubscription = await db.query.appSumoSubscription.findFirst({
    where: (appSumoSubscription, { eq }) =>
      eq(appSumoSubscription.userId, userId),
  });

  if (
    !subscription ||
    !appSumoSubscription ||
    subscription.current_period_start === currentPeriod ||
    appSumoSubscription.current_period_start === currentPeriod
  ) {
    return;
  }

  if (
    !subscription.current_period_start ||
    !appSumoSubscription.current_period_start
  ) {
    await db
      .update(
        appSumoSubscription ? schema.appSumoSubscription : schema.subscriptions,
      )
      .set({
        current_period_start: currentPeriod,
      })
      .where(
        eq(
          subscription
            ? schema.subscriptions.userId
            : schema.appSumoSubscription.userId,
          userId,
        ),
      )
      .execute();
  }

  if (
    (subscription.current_period_start &&
      subscription.current_period_start < currentPeriod) ??
    (appSumoSubscription.current_period_start &&
      appSumoSubscription.current_period_start < currentPeriod)
  ) {
    await db
      .update(schema.clCredits)
      .set({
        credits:
          STARTING_CL_CREDITS[
            subscription?.status ?? appSumoSubscription?.tier
          ],
      })
      .where(eq(schema.clCredits.userId, userId))
      .execute();

    await db
      .update(schema.elevenLabsCredit)
      .set({
        credits:
          STARTING_11CL_CREDITS[
            subscription?.status ?? appSumoSubscription.tier
          ],
      })
      .where(eq(schema.elevenLabsCredit.userId, userId))
      .execute();

    await db
      .update(schema.openAiCredit)
      .set({
        credits:
          STARTING_OPENAI_CREDITS[
            subscription?.status ?? appSumoSubscription.tier
          ],
      })
      .where(eq(schema.openAiCredit.userId, userId))
      .execute();

    await db
      .update(schema.imgCredit)
      .set({
        credits:
          STARTING_IMG_CREDITS[
            subscription?.status ?? appSumoSubscription.tier
          ],
      })
      .where(eq(schema.imgCredit.userId, userId))
      .execute();

    await db
      .update(subscription ? schema.subscriptions : schema.appSumoSubscription)
      .set({
        current_period_start: currentPeriod,
      })
      .where(
        eq(
          subscription
            ? schema.subscriptions.userId
            : schema.appSumoSubscription.userId,
          userId,
        ),
      )
      .execute();
  }
}
