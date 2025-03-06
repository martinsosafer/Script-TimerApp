import { NextResponse } from "next/server";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";

export async function GET() {
  try {
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

    // Fetch all voices
    const [response] = await client.listVoices({});

    // Filter voices to include only English variants
    const englishVoices =
      response.voices?.filter((voice) =>
        voice.languageCodes?.some((code) => code.startsWith("en-")),
      ) || [];

    // Return the voices with their full names and details
    return NextResponse.json({ voices: englishVoices });
  } catch (error) {
    console.error("Error fetching voices:", error);
    return NextResponse.json(
      { error: "Failed to fetch voices" },
      { status: 500 },
    );
  }
}
