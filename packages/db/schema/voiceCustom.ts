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

export const voiceType = pgEnum("voice_type", ["11LABS", "OTHER"]);
export const voiceGender = pgEnum("voice_gender", ["MALE", "FEMALE", "OTHER"]);

export const voicesCustom = pgTable("voiceCustom", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  external_id: text("external_id").notNull(),
  active: boolean("active").notNull().default(false),
  type: voiceType("voice_type").notNull().default("OTHER"),
  gender: voiceGender("gender").notNull().default("OTHER"),
  name: text("name").notNull(),
  description: text("description").notNull(),
  picture: text("picture"),
  metadata: jsonb("metadata"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
