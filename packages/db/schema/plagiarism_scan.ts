import { integer, jsonb, pgEnum, text, timestamp } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";

export const voiceType = pgEnum("voice_type", ["11LABS", "OTHER"]);
export const voiceGender = pgEnum("voice_gender", ["MALE", "FEMALE", "OTHER"]);

export const voices = pgTable("plagiarism_scan", {
  id: text("id").notNull().primaryKey(),
  total_words: integer("total_words").notNull().default(0),
  identical_words: integer("identical_words").notNull().default(0),
  minor_channged_words: integer("minor_channged_words").notNull().default(0),
  related_meaning_words: integer("relatedMeaningWords").notNull().default(0),
  aggregated_score: integer("aggregated_score").notNull().default(0),
  internet: jsonb("internet").default([]),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
