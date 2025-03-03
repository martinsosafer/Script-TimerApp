import { db, eq, schema } from "@voiceai/db";

import {
  STARTING_11CL_CREDITS,
  STARTING_CL_CREDITS,
  STARTING_IMG_CREDITS,
  STARTING_OPENAI_CREDITS,
} from "~/constants/credits";
import type { WhResponse } from "./types";

async function updateCredits(userId: string, tier: 1 | 2) {
  await db
    .update(schema.clCredits)
    .set({
      credits: STARTING_CL_CREDITS[tier],
    })
    .where(eq(schema.clCredits.userId, userId))
    .execute();
  await db
    .update(schema.imgCredit)
    .set({
      credits: STARTING_IMG_CREDITS[tier],
    })
    .where(eq(schema.imgCredit.userId, userId))
    .execute();
  await db
    .update(schema.elevenLabsCredit)
    .set({
      credits: STARTING_11CL_CREDITS[tier],
    })
    .where(eq(schema.elevenLabsCredit.userId, userId))
    .execute();
  await db
    .update(schema.openAiCredit)
    .set({
      credits: STARTING_OPENAI_CREDITS[tier],
    })
    .where(eq(schema.openAiCredit.userId, userId))
    .execute();
}

class AppSumoSubscription {
  async insertSubscription(data: WhResponse) {
    try {
      const subscription = await db
        .insert(schema.appSumoSubscription)
        .values({
          license_key: data.license_key,
          plan_id: data.plan_id,
          //created_at: data.created_at,
        })
        .execute();
      return subscription;
    } catch (error) {
      console.error(error);
    }
  }
  async activateSubscription(data: WhResponse) {
    try {
      const subscription = await db
        .update(schema.appSumoSubscription)
        .set({
          license_status: "active",
          tier: data.tier,
        })
        .where(eq(schema.appSumoSubscription.license_key, data.license_key))
        .execute();

      return subscription;
    } catch (error) {
      console.error(error);
    }
  }
  async upgradeOrDowngradeSubscription(data: WhResponse) {
    try {
      const subscription = await db
        .update(schema.appSumoSubscription)
        .set({
          license_key: data.license_key,
          tier: data.tier,
        })
        .where(
          eq(schema.appSumoSubscription.license_key, data.prev_license_key!),
        )
        .execute();

      const user = await db.query.users.findFirst({
        where: (users, { eq }) =>
          eq(users.app_sumo_license_key, data.license_key),
      });

      if (user) {
        await updateCredits(user.id, data.tier);
      }

      return subscription;
    } catch (error) {
      console.error(error);
    }
  }
  async deactivateSubscription(data: WhResponse) {
    try {
      const subscription = await db
        .update(schema.appSumoSubscription)
        .set({
          license_status: "deactivated",
        })
        .where(eq(schema.appSumoSubscription.license_key, data.license_key))
        .execute();

      return subscription;
    } catch (error) {
      console.error(error);
    }
  }
}

export const appSumoSubscription = new AppSumoSubscription();
