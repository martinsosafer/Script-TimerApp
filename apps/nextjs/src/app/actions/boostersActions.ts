"use server";

import { db, eq } from "@voiceai/db";
import { imgBooster } from "@voiceai/db/schema/imgBooster";

export async function findBooster(userId?: string | null) {
  if (!userId) return;

  try {
    // Fetch all boosters for the user
    const boosters = await db
      .select()
      .from(imgBooster)
      .where(eq(imgBooster.userId, userId));

    // console.log("boosters", boosters);

    // Check if there are any boosters
    if (!boosters.length) {
      return;
    }

    // Find active booster  
    // const activeBooster = boosters.find(
    //   (booster) => booster.status === "active",
    // );

    // If no active booster, activate oldest by date
    // if (!activeBooster) {
    //   const oldestBooster = boosters.reduce((prev, current) => {
    //     return prev.created_at < current.created_at ? prev : current;
    //   });

    //   await db
    //     .update(imgBooster)
    //     .set({ status: "active" })
    //     .where(eq(imgBooster.id, oldestBooster.id));
    // }
  } catch (error) {
    console.error("Error finding and updating booster:", error);
    throw error;
  }
}
