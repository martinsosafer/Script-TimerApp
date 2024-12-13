import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Fetch to OpenAI endpoint for text-to-speech
export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // Fetch request to OpenAI text-to-speech endpoint
    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Make sure your API key is set
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "tts-1", // Ensure that this model is available
        voice: "alloy",
        input: text,
      }),
    });

    // Check if the request failed
    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Failed to fetch from OpenAI: ${errorText}` },
        { status: response.status },
      );
    }

    // Convert response to ReadableStream
    const audioStream = response.body;

    if (!audioStream) {
      return NextResponse.json(
        { error: "No audio stream returned" },
        { status: 500 },
      );
    }

    // Return the audio stream
    return new NextResponse(audioStream, {
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (error) {
    console.error("Text-to-speech error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
