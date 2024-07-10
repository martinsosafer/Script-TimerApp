import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { db, eq, schema } from "@voiceai/db";

export async function POST(request: Request) {
  const { password, token } = (await request.json()) as {
    password: string;
    token: string;
  };

  try {
    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.reset_token, token),
    });
    if (!existingUser) {
      throw new Error("Token is invalid");
    }
    if (
      existingUser.reset_token_expires &&
      new Date() > existingUser.reset_token_expires
    ) {
      throw new Error("Token is expired");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await db
      .update(schema.users)
      .set({
        password: hashedPassword,
        reset_token: null,
        reset_token_expires: null,
      })
      .where(eq(schema.users.email, existingUser.email));

    return new Response(JSON.stringify(updatedUser));
  } catch (error) {
    return NextResponse.json(
      { error: error as string },
      { status: 500, statusText: error as string },
    );
  }
}
