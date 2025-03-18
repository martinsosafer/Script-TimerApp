import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

// Configure Next.js to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  try {
    // Get the file from the request
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const language = formData.get("language") as string;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "File is required" },
        { status: 400 },
      );
    }

    // Generate a unique blob path
    const timestamp = Date.now();
    const filename = `audio-translations/${timestamp}-${file.name}`;

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: "public",
    });

    return NextResponse.json({
      success: true,
      downloadUrl: blob.url,
    });
  } catch (error: any) {
    console.error("Blob error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
