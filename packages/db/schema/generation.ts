import {
  integer,
  jsonb,
  pgEnum,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { users } from "./auth";

export const generationType = pgEnum("generation_type", [
  "11LABS",
  "OPENAI",
  "OTHER",
]);

export const generations = pgTable("generation", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: generationType("generation_type").notNull().default("OTHER"),

  prompt: text("prompt").notNull(),

  metadata: jsonb("metadata"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
