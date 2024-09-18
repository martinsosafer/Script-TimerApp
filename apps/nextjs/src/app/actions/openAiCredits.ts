"use server";

import { auth } from "@voiceai/auth";
import { db, eq, schema } from "@voiceai/db";

export default async function deductOpenAiCredits(credits: number) {
  const session = await auth();

  if (session?.user.id) {
    const fetchedCredits = (await db.query.openAiCredit.findFirst({
      where: (openAiCredit, { eq }) =>
        eq(openAiCredit.userId, session?.user.id),
    })) as { credits: number } | null;

    if (fetchedCredits?.credits) {
      await db
        .update(schema.openAiCredit)
        .set({
          credits: fetchedCredits.credits - credits,
        })
        .where(eq(schema.openAiCredit.userId, session?.user.id));
    }
  }
}
