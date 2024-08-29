// api/get11LabsCredits.ts
import { NextResponse } from "next/server";

import { db, eq } from "@voiceai/db";
import { elevenLabsCredit } from "@voiceai/db/schema/11LabsCredits";

export async function GET(req: { url: string }) {
  try {
    // Extract user ID from query parameters
    const url = new URL(req.url, `http://${req.headers.host}`);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "User ID is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Query the database for the user's credit information
    const userCredit = await db.query.elevenLabsCredit.findFirst({
      where: eq(elevenLabsCredit.userId, userId),
    });

    if (!userCredit) {
      return new NextResponse(
        JSON.stringify({ error: "User credits not found." }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    // Return the user's credit information
    return new NextResponse(JSON.stringify({ credits: userCredit.credits }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Error fetching user credits." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
