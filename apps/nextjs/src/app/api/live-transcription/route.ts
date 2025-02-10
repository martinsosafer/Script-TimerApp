import { Readable } from "stream";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 },
      );
    }

    // Validate file size
    if (file.size > 4.5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size exceeds 4.5MB limit" },
        { status: 413 },
      );
    }

    // Convert to Buffer instead of Readable stream
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Create File object for OpenAI API
    const openAIFile = new File([buffer], file.name, {
      type: file.type,
      lastModified: Date.now(),
    });

    const transcription = await openai.audio.transcriptions.create({
      file: openAIFile,
      model: "whisper-1",
      response_format: "verbose_json",
      prompt: "Include all filler words like 'um', 'uh', etc.",
    });

    return NextResponse.json({
      transcription: transcription.text,
      segments: transcription.segments,
    });
  } catch (error) {
    console.error("Transcription error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 },
    );
  }
}
