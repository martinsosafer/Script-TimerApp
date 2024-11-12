import { jsonb, pgEnum, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";

export const is_active = pgEnum("is_active", ["active", "inactive"]);
export const type = pgEnum("type", ["promo", "announcement"]);

export const monthlySpecials = pgTable("monthly_specials", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  type: type("type").notNull().default("promo"),
  description: text("description").notNull(),
  pages_display: jsonb("pages_display").notNull().default([]),
  promo_code: text("promo_code"),
  link: text("link"),
  start_date: text("start_date").notNull(),
  end_date: text("end_date").notNull(),
  is_active: is_active("is_active").notNull().default("active"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
