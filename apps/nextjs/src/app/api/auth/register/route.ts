import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { CreateCognitoEntry } from "@voiceai/auth/actions";
import { db, schema } from "@voiceai/db";

import {
  STARTING_11CL_CREDITS,
  STARTING_CL_CREDITS,
  STARTING_IMG_CREDITS,
  STARTING_OPENAI_CREDITS,
} from "../../../../constants/credits";

interface User {
  name: string;
  email: string;
  password: string;
  workingOn?: string;
}

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export async function POST(request: Request) {
  try {
    const {
      name,
      email,
      password: userPassword,
      workingOn,
    } = (await request.json()) as User;

    const fistName = name?.toString().split(" ")[0];
    const lastName = name?.toString().split(" ")[1];
    const cognitoPayload = {
      YourName: { First: fistName ?? "", Last: lastName ?? "" },
      EnterYourEmail: email,
      YoureWorkingOn: workingOn ?? "",
    };

    const password = await bcrypt.hash(userPassword, 10);
    const id = uuid();

    const newUser = await db
      .insert(schema.users)
      .values({ id, name, email: email.toLowerCase(), password })
      .execute();

    await db
      .insert(schema.subscriptions)
      .values({
        userId: id,
        plan: "STARTER",
        status: "FREE_TRIAL",
        free_trial_expiration: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      })
      .execute();

    await db
      .insert(schema.clCredits)
      .values({
        userId: id,
        credits: STARTING_CL_CREDITS.FREE_TRIAL,
      })
      .execute();

    await db
      .insert(schema.imgCredit)
      .values({
        userId: id,
        credits: STARTING_IMG_CREDITS.FREE_TRIAL,
      })
      .execute();

    await db
      .insert(schema.openAiCredit)
      .values({
        userId: id,
        credits: STARTING_OPENAI_CREDITS.FREE_TRIAL,
      })
      .execute();

    await db
      .insert(schema.elevenLabsCredit)
      .values({
        userId: id,
        credits: STARTING_11CL_CREDITS.FREE_TRIAL,
      })
      .execute();

    await CreateCognitoEntry(cognitoPayload, id);

    return new Response(JSON.stringify(newUser));
  } catch (error) {
    return NextResponse.json(
      { error: error as string },
      { status: 500, statusText: error as string },
    );
  }
}
