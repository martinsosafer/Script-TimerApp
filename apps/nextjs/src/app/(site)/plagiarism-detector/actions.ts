"use server";

import { db, eq, schema } from "@voiceai/db";

export async function getScanById(id: string) {
  const scan = await db.query.plagiarism.findFirst({
    where: (plagiarism, { eq }) => eq(plagiarism.id, id),
  });

  return scan;
}

export async function getScans(userId: string) {
  const scans = await db.query.plagiarism.findMany({
    where: (plagiarism, { eq }) => eq(plagiarism.userId, userId),
  });

  return scans;
}

export async function addContentToScan(id: string, text: string) {
  await db
    .update(schema.plagiarism)
    .set({ content: text })
    .where(eq(schema.plagiarism.id, id))
    .returning({ id: schema.plagiarism.id });

  const scan = await db.query.plagiarism.findFirst({
    where: (plagiarism, { eq }) => eq(plagiarism.id, id),
  });

  return scan;
}

export async function editScanTitle(id: string, title: string) {
  await db
    .update(schema.plagiarism)
    .set({ title })
    .where(eq(schema.plagiarism.id, id))
    .returning({ id: schema.plagiarism.id });
}

export async function deleteScan(id: string) {
  try {
    await db
      .delete(schema.plagiarism)
      .where(eq(schema.plagiarism.id, id))
      .returning({ id: schema.plagiarism.id });
  } catch (error) {
    console.error(error);
  }
}
