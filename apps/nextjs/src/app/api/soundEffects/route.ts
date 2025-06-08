// import type { Readable } from "stream";
import { NextResponse } from "next/server";
import { ElevenLabsClient } from "elevenlabs";

import { auth } from "@voiceai/auth";
import { and, db, eq, schema, sql } from "@voiceai/db";
import { elevenLabsCredit } from "@voiceai/db/schema/11LabsCredits";

interface ElevenLabsParams {
  text: string;
  duration_seconds: number;
  prompt_influence: number;
}

export async function POST(req: Request) {
  try {
    // Get the authenticated user
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401, statusText: "User not authenticated" },
      );
    }

    // Parse request body
    const elevenlabsRequest = (await req.json()) as ElevenLabsParams;

    // Calculate credits needed based on actual duration (1 second = 40 characters)
    const creditsNeeded = Math.ceil(elevenlabsRequest.duration_seconds * 40);

    // Fetch user credits from elevenLabsCredit table
    const planCredits = await db.query.elevenLabsCredit.findFirst({
      where: eq(elevenLabsCredit.userId, userId),
    });
    // Check boosters credits
    const boosterCredits = await db.query.elevenLabsBooster.findMany({
      where: (booster, { eq }) => eq(booster.userId, userId),
    });
    let totalBoosterCredits = 0;
    if (boosterCredits.length > 0) {
      totalBoosterCredits = boosterCredits.reduce(
        (acc, booster) => acc + booster.credits,
        0,
      );
    }

    const totalCredits = (planCredits?.credits ?? 0) + totalBoosterCredits;

    if (!totalCredits || totalCredits < creditsNeeded) {
      return NextResponse.json(
        { error: "Not enough credits to process the request" },
        {
          status: 403,
          statusText: "Not enough credits to process the request",
        },
      );
    }

    // Initialize ElevenLabs client
    const client = new ElevenLabsClient({
      apiKey: process.env.INTEGRATION_11LABS_API_KEY,
    });

    // Process the sound effect request
    const response = await client.textToSoundEffects.convert(elevenlabsRequest);

    if (!response) {
      return NextResponse.json(
        { error: "Error generating the sound effect" },
        {
          status: 502,
          statusText: "Error generating the sound effect",
        },
      );
    }

    // Subtract credits
    // await db
    //   .update(elevenLabsCredit)
    //   .set({
    //     credits: planCredits.credits - creditsNeeded,
    //     updated_at: new Date(),
    //   })
    //   .where(eq(elevenLabsCredit.userId, userId));

    // Deduct credits
    if (planCredits?.credits! > 0 && planCredits?.credits! < creditsNeeded) {
      // Not enough plan credits, use boosters
      const remainingCredits = creditsNeeded - planCredits?.credits!;
      if (totalBoosterCredits < remainingCredits) {
        return new NextResponse(
          JSON.stringify({
            error: "Not enough credits to process the request.",
          }),
          { status: 403, headers: { "Content-Type": "application/json" } },
        );
      }
      // Substract from plan first
      await db
        .update(elevenLabsCredit)
        .set({
          credits: 0,
          updated_at: new Date(),
        })
        .where(eq(elevenLabsCredit.userId, userId));
      // Substract remaining from boosters
      // Deduct remaining credits from boosters with the least credits first
      let creditsToDeduct = remainingCredits;
      const boosters = await db.query.elevenLabsBooster.findMany({
        where: (booster, { eq, gt }) =>
          and(eq(booster.userId, userId), gt(booster.credits, 0)),
        orderBy: (booster, { asc }) => [asc(booster.credits)],
      });
      for (const booster of boosters) {
        if (creditsToDeduct <= 0) break;
        const deduct = Math.min(booster.credits, creditsToDeduct);
        await db
          .update(schema.elevenLabsBooster)
          .set({
            credits: sql`${schema.elevenLabsBooster.credits} - ${deduct}`,
            updated_at: new Date(),
          })
          .where(eq(schema.elevenLabsBooster.id, booster.id));
        creditsToDeduct -= deduct;
      }
    } else if (planCredits?.credits === 0 && totalBoosterCredits > 0) {
      // Find booster with credits
      // Deduct credits from boosters with the least credits first
      let creditsToDeduct = creditsNeeded;
      const boosters = await db.query.elevenLabsBooster.findMany({
        where: (booster, { eq, gt }) =>
          and(eq(booster.userId, userId), gt(booster.credits, 0)),
        orderBy: (booster, { asc }) => [asc(booster.credits)],
      });
      for (const booster of boosters) {
        if (creditsToDeduct <= 0) break;
        const deduct = Math.min(booster.credits, creditsToDeduct);
        await db
          .update(schema.elevenLabsBooster)
          .set({
            credits: sql`${schema.elevenLabsBooster.credits} - ${deduct}`,
            updated_at: new Date(),
          })
          .where(eq(schema.elevenLabsBooster.id, booster.id));
        creditsToDeduct -= deduct;
      }
    } else {
      // Substract credit from plan
      await db
        .update(elevenLabsCredit)
        .set({
          credits: planCredits?.credits! - creditsNeeded,
          updated_at: new Date(),
        })
        .where(eq(elevenLabsCredit.userId, userId));
    }

    // const base64 = await readableToBase64(response);

    // Create a generation record
    const generationId = await db
      .insert(schema.generations)
      .values({
        userId: userId,
        type: "11LABS",
        prompt: elevenlabsRequest.text,
        response: "", // Convert response to base64 if needed
        metadata: {
          text: elevenlabsRequest.text,
          duration_seconds: elevenlabsRequest.duration_seconds,
          prompt_influence: elevenlabsRequest.prompt_influence,
          type: "textToSoundEffects",
        },
      })
      .returning({ generationId: schema.generations.id })
      .then((res) => res?.[0]?.generationId);

    if (!generationId) {
      throw new Error("Failed to create generation record");
    }

    // Log the credit usage in the credits table with the generation ID
    const usedCredits = await db.insert(schema.credits).values({
      userId: userId,
      generationId: generationId,
      type: "11LABS",
      credits: -creditsNeeded,
      metadata: {
        duration: elevenlabsRequest.duration_seconds,
        rate: 40, // characters per second
        description: "Sound effect generation",
      },
      created_at: new Date(),
      updated_at: new Date(),
    });

    if (!usedCredits) {
      throw new Error("Failed to log credit usage");
    }

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
      { error: error as string },
      { status: 500, statusText: error as string },
    );
  }
}

// export async function readableToBase64(stream: ReadableStream): Promise<string> {
//   const reader = stream.getReader();
//   const chunks: Uint8Array[] = [];

//   while (true) {
//     const { done, value } = await reader.read();
//     if (done) break;
//     chunks.push(value);
//   }

//   const buffer = Buffer.concat(chunks.map((c) => Buffer.from(c)));
//   return buffer.toString("base64");
// }
