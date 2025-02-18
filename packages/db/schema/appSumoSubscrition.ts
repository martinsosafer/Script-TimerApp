import {
  integer,
  jsonb,
  pgEnum,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { pgTable } from "./_table";

export const licenseStatus = pgEnum("license_status", [
  "inactive",
  "active",
  "deactivated",
]);

export const appSumoSubscription = pgTable("app_sumo_subscription", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  userId: text("user_id").unique(),
  plan_id: text("plan_id").notNull().default("initial_plan_id"),
  license_key: text("license_key").notNull(),
  license_status: licenseStatus("license_status").notNull().default("inactive"),
  tier: integer("tier"),
  favorite_voices: jsonb("favorite_voices").default([]),
  custom_voices: jsonb("custom_voices").default([]),
  metadata: jsonb("metadata"),
  created_at: timestamp("created_at").notNull().defaultNow(),
});
