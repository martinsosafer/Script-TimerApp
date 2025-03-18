import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file");
  const language = formData.get("language");

  if (!file) {
    return NextResponse.json(
      {
        success: false,
        error: "File is required",
      },
      { status: 400 },
    );
  }

  // Create a new FormData instance for the OpenAI API request
  const openAIFormData = new FormData();
  openAIFormData.append("file", file);
  openAIFormData.append("model", "whisper-1");
  openAIFormData.append("response_format", "json"); // Changed from response_type to response_format

  try {
    const response = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: openAIFormData,
      },
    );

    // Check if response is OK before trying to parse JSON
    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error response:", errorText);
      throw new Error(`API returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error from OpenAI API:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to transcribe audio",
      },
      { status: 500 },
    );
  }
}
