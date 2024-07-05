import bcrypt from "bcryptjs";

import { db, schema } from "@voiceai/db";

interface User {
  name: string;
  email: string;
  password: string;
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
    } = (await request.json()) as User;
    console.log("PASSWORD:", userPassword);
    const password = await bcrypt.hash(userPassword, 10);
    const id = uuid();

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
    console.log("NEWUSER", newUser);
    return new Response(JSON.stringify(newUser));
  } catch (error) {
    console.log("error", error);
    return new Response(JSON.stringify(error));
  }
}
