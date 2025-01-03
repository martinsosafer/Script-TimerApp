import { pgEnum, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";

export const aiModelType = pgEnum("credit_action", [
  "CHAT",
  "IMAGE",
  "VOICE",
  "OTHER",
]);

export const prompts = pgTable("prompts", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  category_id: text("category_id").notNull(),
  subcategory_id: text("subcategory_id").notNull(),
  prompt_ai: text("prompt_ai").notNull(),
  prompt_display: text("prompt_display").notNull(),
  ai_model_type: aiModelType("ai_model_type").default("OTHER"),
  additional_fields: text("additional_fields").array(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
