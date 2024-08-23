import { NextResponse } from "next/server";

import { auth } from "@voiceai/auth";
import { db, schema } from "@voiceai/db"; // Adjust the import path based on your project structure

function addWatermark(message) {
  const watermark = "created by script timer";
  return `${message} - ${watermark}`;
}

export async function POST(req) {
  const session = await auth();
  const status = session?.user.subscription?.status;
  const userId = session?.user.id;

  try {
    console.log("Received request:", req);
    const body = await req.json();

    // Set maximum message length based on the user's subscription status
    let maxMessageLength = 300; // Default for free users

    if (status === "FREE_TRIAL" || status === "STUDENT") {
      maxMessageLength = 2000;
    } else if (status === "CREATOR") {
      maxMessageLength = 5000;
    } else if (status === "BUSINESS") {
      maxMessageLength = 10000;
    }

    // Check if the message length exceeds the maximum allowed length
    if (body.text.length > maxMessageLength) {
      return new NextResponse(
        JSON.stringify({
          error: `Maximum message length exceeded. Max length: ${maxMessageLength} characters.`,
        }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      );
    }

    // Append the watermark if the user doesn't have a paid subscription
    let message = body.text;
    if (!["BUSINESS", "STUDENT", "CREATOR"].includes(status)) {
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
    const chunks = [];
    let credits = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      credits += value.length;
    }

    const audioBase64 = Buffer.concat(chunks).toString("base64");

    // Save the generated audio and other metadata to the database
    const generationId = await db
      .insert(schema.generations)
      .values({
        userId,
        type: "11LABS",
        prompt: body.text,
        response: audioBase64,
        metadata: data,
      })
      .returning({ generationId: schema.generations.id })
      .then((res) => res?.[0]?.generationId);

    if (!generationId) throw new Error("Error creating voice");

    // Deduct the credits used based on the message length
    await db.insert(schema.credits).values({
      userId,
      generationId,
      type: "11LABS",
      credits: body.text.length,
    });

    const stream = new ReadableStream({
      async start(controller) {
        controller.enqueue(Buffer.from(audioBase64, "base64"));
        controller.close();
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
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
