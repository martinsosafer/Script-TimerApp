import { createHash, randomUUID } from "crypto";

import { db, schema } from "@voiceai/db";

interface User {
  name: string;
  email: string;
  password: string;
}

const hashPassword = (password: string) => {
  return createHash("sha256").update(password).digest("hex");
};

export async function POST(request: Request) {
  try {
    const {
      name,
      email,
      password: userPassword,
    } = (await request.json()) as User;

    const password = hashPassword(userPassword);
    const id = randomUUID();

    const newUser = await db
      .insert(schema.users)
      .values({ id, name, email, password })
      .execute();

    await db
      .insert(schema.subscriptions)
      .values({
        userId: id,
        plan: "STARTER",
        status: "FREE_TRIAL",
      })
      .execute();

    return new Response(JSON.stringify(newUser));
  } catch (error) {
    console.log("error", error);
    return new Response(JSON.stringify(error));
  }
}
