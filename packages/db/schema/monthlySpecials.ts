import { pgEnum, text, timestamp, uuid } from "drizzle-orm/pg-core";

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

export const is_active = pgEnum("is_active", ["active", "inactive"]);

export const monthlySpecials = pgTable("monthly_specials", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  pages_display: pages_display("pages_display").notNull().default("ALL"),
  promo_code: text("promo_code").notNull(),
  link: text("link"),
  start_date: text("start_date").notNull(),
  end_date: text("end_date").notNull(),
  is_active: is_active("is_active").notNull().default("active"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
