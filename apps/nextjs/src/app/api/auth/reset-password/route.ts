import { NextResponse } from "next/server";
import { Resend } from "resend";

import { db, eq, schema } from "@voiceai/db";

const resend = new Resend(process.env.RESEND_API_KEY);

function generateRandomBytes(length: number): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    // Generate a random byte
    const randomByte = Math.floor(Math.random() * 256);
    // Convert to hexadecimal and pad with zero if necessary
    result += randomByte.toString(16).padStart(2, "0");
  }
  return result;
}

export async function POST(request: Request) {
  const { email } = (await request.json()) as { email: string };

  try {
    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });
    if (!existingUser) {
      throw new Error("User with this email does not exist");
    }

    const resetToken = generateRandomBytes(20);
    const resetTokenEpires = new Date(Date.now() + 3600000); // 1 hour

    await db
      .update(schema.users)
      .set({ reset_token: resetToken, reset_token_expires: resetTokenEpires })
      .where(eq(schema.users.email, email));

    const resetUrl = `${process.env.HOST_URL}/create-new-password/${resetToken}`;

    await resend.emails.send({
      from: "login@script-timer.ai",
      to: email,
      subject: "Reset Password",
      text: `Click the link to reset your password: ${resetUrl}`,
    });

    return new Response(JSON.stringify(existingUser));
  } catch (error) {
    return NextResponse.json(
      { error: error as string },
      { status: 500, statusText: error as string }, //status 500 del lado del cliente se puede ver
    );
  }
}
