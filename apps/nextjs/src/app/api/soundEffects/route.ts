import { NextResponse } from "next/server";
import { ElevenLabsClient } from "elevenlabs";

export async function POST(req: Request) {
  try {
    const { text, duration_seconds, prompt_influence } = await req.json();

    const client = new ElevenLabsClient({
      apiKey: process.env.INTEGRATION_11LABS_API_KEY,
    });

    const response = await client.textToSoundEffects.convert({
      text,
      duration_seconds,
      prompt_influence,
    });

    // Assuming the response is a ReadableStream
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
