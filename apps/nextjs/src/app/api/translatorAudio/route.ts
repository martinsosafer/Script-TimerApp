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

  formData.append("model", "whisper-1");
  formData.append("response_type", "verbose_json");

  try {
    const response = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: formData,
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error.message || "Failed to transcribe audio");
    }

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
