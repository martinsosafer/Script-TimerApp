import { NextResponse } from "next/server";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";

export async function GET() {
  try {
    // Create a client with credentials from environment variables
    const client = new TextToSpeechClient({
      credentials: {
        client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(
          /\\n/g,
          "\n",
        ),
      },
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    });

    // List all available voices
    const [response] = await client.listVoices({});

    return NextResponse.json({ voices: response.voices || [] });
  } catch (error) {
    console.error("Error fetching voices:", error);
    return NextResponse.json(
      { error: "Failed to fetch voices" },
      { status: 500 },
    );
  }
}
