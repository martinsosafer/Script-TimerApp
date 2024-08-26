import { NextResponse } from "next/server";

import { auth } from "@voiceai/auth";
import { db, eq, schema } from "@voiceai/db";

function addWatermark(message: string) {
  const watermark = "created by script timer";
  return `${message} - ${watermark}`;
}

export async function POST(req: { json: () => any }) {
  try {
    console.log("Received request:", req);

    // Get the authenticated user
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "User not authenticated." }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      );
    }

    const body = await req.json();

    // Retrieve user subscription
    const subscription = await db.query.subscriptions.findFirst({
      where: eq(schema.subscriptions.userId, userId),
    });

    // Determine max message length based on subscription
    let maxMessageLength = 300; // Default maximum message length for free users
    if (
      subscription?.status === "FREE_TRIAL" ||
      subscription?.status === "STUDENT"
    ) {
      maxMessageLength = 2000;
    } else if (subscription?.status === "CREATOR") {
      maxMessageLength = 5000;
    } else if (subscription?.status === "BUSINESS") {
      maxMessageLength = 10000;
    }

    // Check message length
    if (body.text.length > maxMessageLength) {
      return new NextResponse(
        JSON.stringify({
          error: `Maximum message length exceeded. Max length: ${maxMessageLength} characters.`,
        }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      );
    }

    let message = body.text;
    if (!["BUSINESS", "STUDENT", "CREATOR"].includes(subscription?.status)) {
      message = addWatermark(message);
    }

    const data = {
      model_id: "eleven_multilingual_v2",
      text: message,
      voice_actor: body.voice_actor,
      voice_settings: {
        similarity_boost: body.similarity,
        stability: body.stability,
      },
    };

    // Fetch audio stream from ElevenLabs
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${body.voice_id}/stream`,
      {
        method: "POST",
        headers: {
          accept: "audio/mpeg",
          "xi-api-key": process.env.INTEGRATION_11LABS_API_KEY ?? "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response from ElevenLabs:", errorText);
      throw new Error("Failed to fetch the text-to-speech stream.");
    }

    const responseBody = response.body;
    if (!responseBody) {
      throw new Error("Response body is null.");
    }

    const reader = responseBody.getReader();
    const audioChunks: Uint8Array[] = [];
    const stream = new ReadableStream({
      async start(controller) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          // Stream the audio data to the client
          controller.enqueue(value);

          // Collect the audio chunks to save later
          audioChunks.push(value);
        }
        controller.close();

        // Convert collected audio chunks to base64
        const audioBase64 = Buffer.concat(audioChunks).toString("base64");

        // Save generation to the database after the stream completes
        const generationId = await db
          .insert(schema.generations)
          .values({
            userId: userId,
            type: "11LABS",
            prompt: body.text,
            response: audioBase64,
            metadata: data,
          })
          .returning({ generationId: schema.generations.id })
          .then((res) => res?.[0]?.generationId);

        if (!generationId) throw new Error("Error creating voice");

        await db.insert(schema.credits).values({
          userId: userId,
          generationId: generationId,
          type: "11LABS",
          credits: body.text.length,
        });
      },
      cancel() {
        reader.cancel();
      },
    });

    return new NextResponse(stream, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (e) {
    console.error("ERROR STREAMING", e);
    return new NextResponse(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
