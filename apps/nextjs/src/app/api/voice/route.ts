import { NextResponse } from "next/server";

import { db, schema } from "@voiceai/db"; // Adjust the import path according to your project structure

export async function POST(req) {
  try {
    const body = await req.json();

    const data = {
      model_id: "eleven_multilingual_v2",
      text: body.text,
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
      throw new Error(
        `Failed to fetch the text-to-speech stream. Response: ${errorText}`,
      );
    }

    const responseBody = response.body;
    if (!responseBody) {
      throw new Error("Response body is null.");
    }

    const reader = responseBody.getReader();
    const audioChunks = [];
    const stream = new ReadableStream({
      async start(controller) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          audioChunks.push(value); // Accumulate the chunks
          controller.enqueue(value); // Stream the chunk to the client
        }
        controller.close();
      },
      cancel() {
        reader.cancel();
      },
    });

    // Stream the response to the client
    const responseStream = new NextResponse(stream, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });

    // Wait for the stream to finish and save the accumulated audio data to the database
    const audioBuffer = new Uint8Array(audioChunks.flat()).buffer;
    const audioBase64 = Buffer.from(audioBuffer).toString("base64");

    const generationRecord = await db
      .insert(schema.generations)
      .values({
        userId: body.user_id,
        type: "11LABS",
        prompt: body.text,

        created_at: new Date(),
        updated_at: new Date(),
      })
      .execute();

    return responseStream;
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
