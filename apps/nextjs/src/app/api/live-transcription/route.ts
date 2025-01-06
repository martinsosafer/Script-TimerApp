import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob;

    if (!file) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 },
      );
    }

    console.log("Received audio file:", file.type, file.size);

    // Convert the Blob to a Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Create a File object from the buffer
    const fileObject = new File([buffer], "audio.webm", { type: file.type });

    const transcription = await openai.audio.transcriptions.create({
      file: fileObject,
      model: "whisper-1",
      response_format: "verbose_json",
      prompt:
        "Please transcribe the audio, including all filler words like 'um', 'uh', 'er', 'ah', 'like', 'okay', and 'you know'.",
    });

    console.log("Transcription result:", transcription);

    return NextResponse.json(
      {
        transcription: transcription.text,
        segments: transcription.segments,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to process audio",
      },
      { status: 500 },
    );
  }
}
