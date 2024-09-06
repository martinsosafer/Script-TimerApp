import { db, eq } from "@voiceai/db";
import { elevenLabsCredit } from "@voiceai/db/schema/11LabsCredits";

async function set11LabsCreditsBasedOnPlan(userId: string, plan: string) {
  let credits = 0;

  switch (plan) {
    case "FREE":
    case "FREE_TRIAL":
      credits = 10000;
      break;
    case "STUDENT":
      credits = 40000;
      break;
    case "CREATOR":
      credits = 80000;
      break;
    case "BUSINESS":
      credits = 125000;
      break;
    default:
      credits = 0; // Default or unknown plan
      break;
  }

  console.log(
    `Initializing credits: User ID: ${userId}, Plan: ${plan}, Credits: ${credits}`,
  );

  try {
    const existingCredit = await db.query.elevenLabsCredit.findFirst({
      where: eq(elevenLabsCredit.userId, userId),
    });

    if (!existingCredit) {
      // Insert initial credits only if they do not exist
      const result = await db.insert(elevenLabsCredit).values({
        userId: userId,
        credits: credits,
        updated_at: new Date(),
      });

      console.log("Database operation result:", result);

      if (!result) {
        throw new Error("Failed to initialize credits.");
      }

      console.log("Credits initialized successfully for user:", userId);
    } else {
      console.log("Credits already initialized for user:", userId);
    }
  } catch (error) {
    console.error("Error initializing 11 Labs credits:", error);
    throw new Error(
      `Error initializing credits based on the plan: ${error.message}`,
    );
  }
}

export { set11LabsCreditsBasedOnPlan };
