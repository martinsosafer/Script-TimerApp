"use server";

import { auth } from "@voiceai/auth";
import { db, eq, schema } from "@voiceai/db";

export default async function getSpecials() {
  const session = await auth();

  if (session?.user.id) {
    const special = await db.query.monthlySpecials.findMany({
      where: eq(schema.monthlySpecials.is_active, "active"),
    });

    return special;
  }
}
