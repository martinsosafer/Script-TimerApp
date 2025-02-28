import { NextResponse } from "next/server";
import { ElevenLabsClient } from "elevenlabs";

import { auth } from "@voiceai/auth";
import { db, eq, schema } from "@voiceai/db";
import { elevenLabsCredit } from "@voiceai/db/schema/11LabsCredits";

export async function POST(req: Request) {
  try {
    // Get the authenticated user
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "User not authenticated." }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      );
    }

    // Parse request body
    const { text, duration_seconds, prompt_influence } = await req.json();

    // Initialize ElevenLabs client
    const client = new ElevenLabsClient({
      apiKey: process.env.INTEGRATION_11LABS_API_KEY,
    });

    // Prepare the request for ElevenLabs API
    const elevenlabsRequest: {
      text: string;
      duration_seconds?: number;
      prompt_influence: number;
    } = {
      text,
      prompt_influence,
    };

    // Only include duration_seconds if it's provided
    if (duration_seconds !== undefined) {
      elevenlabsRequest.duration_seconds = duration_seconds;
    }

    // Process the sound effect request
    const response = await client.textToSoundEffects.convert(elevenlabsRequest);

    // Get the actual duration from the response (assuming ElevenLabs provides this)
    const actualDuration = response.duration || duration_seconds || 1; // Fallback to 1 second if no duration is available

    // Calculate credits needed based on actual duration (1 second = 40 characters)
    const creditsNeeded = Math.ceil(actualDuration * 40);

    // Fetch user credits from elevenLabsCredit table
    const userCredits = await db.query.elevenLabsCredit.findFirst({
      where: eq(elevenLabsCredit.userId, userId),
    });

    if (!userCredits || userCredits.credits < creditsNeeded) {
      return new NextResponse(
        JSON.stringify({
          error: "Not enough credits to process the request.",
        }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      );
    }

    // Subtract credits
    await db
      .update(elevenLabsCredit)
      .set({
        credits: userCredits.credits - creditsNeeded,
        updated_at: new Date(),
      })
      .where(eq(elevenLabsCredit.userId, userId));

    // Create a generation record
    const generationId = await db
      .insert(schema.generations)
      .values({
        userId: userId,
        type: "11LABS",
        prompt: text,
        response: "", // We'll update this later if needed
        metadata: {
          duration_seconds: actualDuration,
          prompt_influence,
        },
      })
      .returning({ generationId: schema.generations.id })
      .then((res) => res?.[0]?.generationId);

    if (!generationId) {
      throw new Error("Failed to create generation record");
    }

    // Log the credit usage in the credits table with the generation ID
    await db.insert(schema.credits).values({
      userId: userId,
      generationId: generationId,
      type: "11LABS",
      credits: -creditsNeeded,
      metadata: {
        duration: actualDuration,
        rate: 40, // characters per second
        description: "Sound effect generation credit usage",
      },
      created_at: new Date(),
      updated_at: new Date(),
    });

    // Return the response as is, maintaining the original behavior
    return new NextResponse(response, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (error) {
    console.error("Error generating sound effect:", error);
    return NextResponse.json(
      { error: "Failed to generate sound effect" },
      { status: 500 },
    );
  }
}
