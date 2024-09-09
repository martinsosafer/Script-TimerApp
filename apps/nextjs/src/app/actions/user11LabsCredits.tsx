import { db, eq } from "@voiceai/db";
import { elevenLabsCredit } from "@voiceai/db/schema/11LabsCredits";


export async function fetchUserCredits(userId: string): Promise<number> {
  try {
    const result = await db
      .select({ credits: elevenLabsCredit.credits })
      .from(elevenLabsCredit)
      .where(eq(elevenLabsCredit.userId, userId))
      .limit(1);

    if (result.length === 0) {
      throw new Error("User credits not found");
    }

    return result[0].credits;
  } catch (error) {
    console.error("Error fetching user credits:", error);
    throw error;
  }
}

export async function updateUserCredits(
  userId: string,
  newCredits: number,
): Promise<void> {
  try {
    await db
      .update(elevenLabsCredit)
      .set({ credits: newCredits, updated_at: new Date() })
      .where(eq(elevenLabsCredit.userId, userId));
  } catch (error) {
    console.error("Error updating user credits:", error);
    throw error;
  }
}
