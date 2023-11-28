import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { users } from "./auth";
import { generations } from "./generation";

export const creditActionType = pgEnum("credit_action", [
  "11LABS",
  "OPENAI",
  "OTHER",
]);

export const credits = pgTable("credit", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  generationId: uuid("generation_id")
    .notNull()
    .references(() => generations.id, { onDelete: "cascade" }),
  type: creditActionType("credit_action").notNull().default("OTHER"),
  credits: integer("credits").notNull().default(0),
  metadata: jsonb("metadata"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
