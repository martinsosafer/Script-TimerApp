import {
  integer,
  jsonb,
  pgEnum,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

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
]);

export const subscriptions = pgTable("subscription", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(),
  plan: plan("plan").notNull(),
  status: status("status").notNull().default("INACTIVE"),
  metadata: jsonb("metadata"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
