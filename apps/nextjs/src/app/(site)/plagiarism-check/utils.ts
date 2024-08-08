"use server";

import { db } from "@voiceai/db";

export async function getScanById(id: string) {
  const scan = await db.query.plagiarism.findFirst({
    where: (plagiarism, { eq }) => eq(plagiarism.id, id),
  });

  return scan;
}
