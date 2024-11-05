import { boolean, pgEnum, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";

export const pages_display = pgEnum("pages_display", [
  "ALL",
  "VOICE",
  "CHAT",
  "IMAGES",
  "PLAGIARISM",
  "UNIVERSITY",
  "PLANS",
]);

export const monthlySpecials = pgTable("monthly_specials", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  pages_display: pages_display("pages_display").notNull().default("ALL"),
  promo_code: text("promo_code").notNull(),
  link: text("link").notNull(),
  start_date: timestamp("start_date").notNull(),
  end_date: timestamp("end_date").notNull(),
  is_active: boolean("is_active").notNull().default(true),
  prompt_display: text("prompt_display").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
