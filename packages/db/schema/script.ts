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

export const scriptGenerationType = pgEnum("script_generation_type", [
  "11LABS",
  "OTHER",
]);

export const scripts = pgTable("script", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "set null" }),
  type: scriptGenerationType("script_generation_type")
    .notNull()
    .default("OTHER"),
  name: text("name").notNull().default(""),
  script: text("script").notNull().default(""),
  richText: text("rich_text").notNull().default(""),
  metadata: jsonb("metadata"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
