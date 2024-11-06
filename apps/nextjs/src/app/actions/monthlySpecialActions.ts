"use server";

import { auth } from "@voiceai/auth";
import { db } from "@voiceai/db";

export default async function getSpecials() {
  const session = await auth();

  if (session?.user.id) {
    const special = await db.query.monthlySpecials.findMany();

    return special[0];
  }
}
