"use server";

import { db, eq, schema } from "@voiceai/db";

export default async function getSpecials() {
  const special = await db.query.monthlySpecials.findMany({
    where: eq(schema.monthlySpecials.is_active, "active"),
  });

  return special;
}
