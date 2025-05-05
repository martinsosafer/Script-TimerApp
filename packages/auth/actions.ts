import { db, eq, schema } from "@voiceai/db";

import {
  STARTING_11CL_CREDITS,
  STARTING_CL_CREDITS,
  STARTING_IMG_CREDITS,
  STARTING_OPENAI_CREDITS,
} from "../../apps/nextjs/src/constants/credits";

interface SubscriptionStatus {
  created_at: Date;
  free_trial_expiration: Date | null;
  id: string;
  updated_at: Date;
  userId: string;
  metadata: unknown;
  plan: "STARTER" | "CUSTOM";
  status:
    | "INACTIVE"
    | "ACTIVE"
    | "STUDENT"
    | "CREATOR"
    | "FREE_TRIAL"
    | "PAUSED"
    | "FREE"
    | "BUSINESS"
    | "STUDENTCLMO"
    | "CREATORCLMO"
    | "BUSINESSCLMO"
    | "STUDENTCLYR"
    | "CREATORCLYR"
    | "BUSINESSCLYR";
  plan_id: string;
  favorite_voices: unknown;
  custom_voices: unknown;
  start_date: Date;
}

export async function moveToFreeOrAddExpiration(
  subscriptionStatus: SubscriptionStatus,
  userId: string,
) {
  const createdAt = new Date(subscriptionStatus.created_at);
  const currentDate = new Date();
  const differenceInMilliseconds = currentDate.getTime() - createdAt.getTime();
  const daysWithFreeTrial = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24),
  );

  if (!subscriptionStatus?.free_trial_expiration) {
    if (daysWithFreeTrial >= 5) {
      await db
        .update(schema.subscriptions)
        .set({
          plan: "STARTER",
          status: "FREE",
          free_trial_expiration: null,
        })
        .where(eq(schema.subscriptions.userId, userId))
        .execute();
    } else {
      await db
        .update(schema.subscriptions)
        .set({
          free_trial_expiration: new Date(
            5 * 24 * 60 * 60 * 1000 - createdAt.getTime(),
          ),
        })
        .where(eq(schema.subscriptions.userId, userId))
        .execute();
    }
  }

  if (
    subscriptionStatus?.free_trial_expiration &&
    new Date(subscriptionStatus.free_trial_expiration) < currentDate
  ) {
    await db
      .update(schema.subscriptions)
      .set({
        plan: "STARTER",
        status: "FREE",
        free_trial_expiration: null,
      })
      .where(eq(schema.subscriptions.userId, userId))
      .execute();
  }
}

export async function insertSubscription(userId: string) {
  await db
    .insert(schema.subscriptions)
    .values({
      userId,
      plan: "STARTER",
      status: "FREE_TRIAL",
      free_trial_expiration: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    })
    .execute();

  await db
    .insert(schema.clCredits)
    .values({
      userId,
      credits: STARTING_CL_CREDITS.FREE_TRIAL,
    })
    .execute();

  await db
    .insert(schema.imgCredit)
    .values({
      userId,
      credits: STARTING_IMG_CREDITS.FREE_TRIAL,
    })
    .execute();

  await db
    .insert(schema.openAiCredit)
    .values({
      userId,
      credits: STARTING_OPENAI_CREDITS.FREE_TRIAL,
    })
    .execute();

  await db
    .insert(schema.elevenLabsCredit)
    .values({
      userId,
      credits: STARTING_11CL_CREDITS.FREE_TRIAL,
    })
    .execute();
}

export async function checkAndInsertCredits(userId: string) {
  const subscriptionStatus = await db.query.subscriptions.findFirst({
    where: (subscriptions, { eq }) => eq(subscriptions.userId, userId),
  });

  const clCreditStatus = await db.query.clCredits.findFirst({
    where: (clCredits, { eq }) => eq(clCredits.userId, userId),
  });
  if (!clCreditStatus) {
    await db
      .insert(schema.clCredits)
      .values({
        userId,
        credits: STARTING_CL_CREDITS[subscriptionStatus?.status ?? "FREE"],
      })
      .execute();
  }

  const imgCreditStatus = await db.query.imgCredit.findFirst({
    where: (imgCredit, { eq }) => eq(imgCredit.userId, userId),
  });
  if (!imgCreditStatus) {
    await db
      .insert(schema.imgCredit)
      .values({
        userId,
        credits: STARTING_IMG_CREDITS[subscriptionStatus?.status ?? "FREE"],
      })
      .execute();
  }

  const openAiCreditStatus = await db.query.openAiCredit.findFirst({
    where: (openAiCredit, { eq }) => eq(openAiCredit.userId, userId),
  });
  if (!openAiCreditStatus) {
    await db
      .insert(schema.openAiCredit)
      .values({
        userId,
        credits: STARTING_OPENAI_CREDITS[subscriptionStatus?.status ?? "FREE"],
      })
      .execute();
  }

  const elevenLabsCreditStatus = await db.query.elevenLabsCredit.findFirst({
    where: (elevenLabsCredit, { eq }) => eq(elevenLabsCredit.userId, userId),
  });
  if (!elevenLabsCreditStatus) {
    await db
      .insert(schema.elevenLabsCredit)
      .values({
        userId,
        credits: STARTING_11CL_CREDITS[subscriptionStatus?.status ?? "FREE"],
      })
      .execute();
  }
}

export async function inserAppSumoUserCredits(userId: string, tier: "1" | "2") {
  const clCreditStatus = await db.query.clCredits.findFirst({
    where: (clCredits, { eq }) => eq(clCredits.userId, userId),
  });
  if (!clCreditStatus) {
    await db
      .insert(schema.clCredits)
      .values({
        userId,
        credits: STARTING_CL_CREDITS[tier],
      })
      .execute();
  }
  const imgCreditStatus = await db.query.imgCredit.findFirst({
    where: (imgCredit, { eq }) => eq(imgCredit.userId, userId),
  });

  if (!imgCreditStatus) {
    await db
      .insert(schema.imgCredit)
      .values({
        userId,
        credits: STARTING_IMG_CREDITS[tier],
      })
      .execute();
  }

  const openAiCreditStatus = await db.query.openAiCredit.findFirst({
    where: (openAiCredit, { eq }) => eq(openAiCredit.userId, userId),
  });

  if (!openAiCreditStatus) {
    await db
      .insert(schema.openAiCredit)
      .values({
        userId,
        credits: STARTING_OPENAI_CREDITS[tier],
      })
      .execute();
  }

  const elevenLabsCreditStatus = await db.query.elevenLabsCredit.findFirst({
    where: (elevenLabsCredit, { eq }) => eq(elevenLabsCredit.userId, userId),
  });

  if (!elevenLabsCreditStatus) {
    await db
      .insert(schema.elevenLabsCredit)
      .values({
        userId,
        credits: STARTING_11CL_CREDITS[tier],
      })
      .execute();
  }
}

interface EntryPayload {
  YourName: {
    First: string;
    Last: string;
  };
  EnterYourEmail: string;
  YoureWorkingOn: string;
}

export async function CreateCognitoEntry(
  payload: EntryPayload,
  userId: string,
) {
  await db
    .update(schema.users)
    .set({ cognito_entry: true })
    .where(eq(schema.users.id, userId))
    .execute();

  await fetch("https://www.cognitoforms.com/api/forms/37/entries", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.COGNITO_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  console.log("Creating cognito entry for user", userId);

  return;
}
