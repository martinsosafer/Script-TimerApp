import { db, eq, schema } from "@voiceai/db";

import type { WhResponse } from "./types";

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
        })
        .where(
          eq(schema.appSumoSubscription.license_key, data.prev_license_key!),
        )
        .execute();

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
