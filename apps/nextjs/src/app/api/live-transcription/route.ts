import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

    console.log("Received audio file:", file.name, file.type, file.size);

    // Convert the File to a Buffer before sending to OpenAI
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const transcription = await openai.audio.transcriptions.create({
      file: new File([buffer], file.name, { type: file.type }),
      model: "whisper-1",
      response_format: "verbose_json",
      prompt:
        "Please transcribe the audio, including all filler words like 'um', 'uh', 'er', 'ah', 'like', 'okay', and 'you know'.",
    });

    console.log("Transcription result:", transcription);

    // Return the transcription as is, focusing on the inclusion of filler words
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
