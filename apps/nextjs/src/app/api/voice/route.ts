import { NextResponse } from "next/server";

import { db, schema } from "@voiceai/db"; // Adjust the import path according to your project structure

export async function POST(req) {
  try {
    console.log("Received request:", req);
    const body = await req.json();
    console.log("Request body:", body);

    const data = {
      model_id: "eleven_multilingual_v2",
      text: body.text,
      voice_actor: body.voice_actor,
      voice_settings: {
        similarity_boost: body.similarity,
        stability: body.stability,
      },
    };

    console.log("Data to be sent to ElevenLabs:", data);

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${body.voice_id}/stream`, // Hardcoded voice_id
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

    console.log("Response from ElevenLabs:", response);
    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

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
    const audioChunks = [];
    const stream = new ReadableStream({
      async start(controller) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          console.log("Streaming chunk:", value);
          audioChunks.push(value); // Accumulate the chunks
          controller.enqueue(value); // Stream the chunk to the client
        }
        controller.close();
      },
      cancel() {
        reader.cancel();
      },
    });

    const responseStream = new NextResponse(stream, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });

    // Wait for the stream to finish and save the accumulated audio data to the database
    const audioArray = await new Response(stream).arrayBuffer();
    const audioBuffer = Buffer.from(audioArray);
    const audioBase64 = audioBuffer.toString("base64");

    const generationRecord = await db
      .insert(schema.generations)
      .values({
        userId: body.user_id,
        type: "11LABS",
        prompt: body.text,
        response: audioBase64,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .execute();

    console.log("Generation record saved:", generationRecord);

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
