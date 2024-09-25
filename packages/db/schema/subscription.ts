import { jsonb, pgEnum, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { users } from "./auth";

export const plan = pgEnum("plan", ["STARTER", "CUSTOM"]);
export const status = pgEnum("status", [
  "INACTIVE",
  "ACTIVE",
  "STUDENT",
  "CREATOR",
  "FREE_TRIAL",
  "PAUSED",
  "FREE",
  "BUSINESS",
  "STUDENTCLMO",
  "CREATORCLMO",
  "BUSINESSCLMO",
  "STUDENTCLYR",
  "CREATORCLYR",
  "BUSINESSCLYR",
]);

export const subscriptions = pgTable("subscription", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(),
  plan: plan("plan").notNull(),
  plan_id: text("plan_id").notNull().default("initial_plan_id"),
  status: status("status").notNull().default("INACTIVE"),
  favorite_voices: jsonb("favorite_voices").default([]),
  custom_voices: jsonb("custom_voices").default([]),
  metadata: jsonb("metadata"),
  start_date: timestamp("start_date").notNull().defaultNow(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
  free_trial_expiration: timestamp("free_trial_expiration"),
  current_period_start: timestamp("current_period_start"),
});
