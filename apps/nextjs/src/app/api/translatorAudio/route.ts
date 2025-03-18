import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { blobUrl, language, contentType } = await request.json();

    if (!blobUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "No file URL provided",
        },
        { status: 400 },
      );
    }

    // Download the file from Vercel Blob
    const fileResponse = await fetch(blobUrl);
    if (!fileResponse.ok) {
      throw new Error(
        `Failed to download file from Blob storage: ${fileResponse.statusText}`,
      );
    }

    // Get the file as a blob
    const fileBlob = await fileResponse.blob();

    // Extract filename from URL to preserve extension
    const urlParts = blobUrl.split("/");
    const filenameWithParams = urlParts[urlParts.length - 1];
    const filename = filenameWithParams.split("?")[0];

    // Use provided content type or derive from filename
    const fileType = contentType || getContentTypeFromFilename(filename);

    // Convert to a File object that OpenAI API can accept
    const file = new File([fileBlob], filename, { type: fileType });

    // Create FormData for OpenAI API
    const formData = new FormData();
    formData.append("file", file);
    formData.append("model", "whisper-1");
    formData.append("response_format", "json");

    console.log(`Processing file: ${filename}, Content-Type: ${fileType}`);

    // Call OpenAI API
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

    // Check if response is OK
    if (!response.ok) {
      let errorMessage;
      try {
        const errorText = await response.text();
        console.error("OpenAI API error:", errorText);

        try {
          const errorJson = JSON.parse(errorText);
          errorMessage =
            errorJson.error?.message || `API error: ${response.status}`;
        } catch (e) {
          errorMessage = `API error ${response.status}: ${errorText.substring(0, 100)}`;
        }
      } catch (e) {
        errorMessage = `API error ${response.status}`;
      }

      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
        },
        { status: response.status || 500 },
      );
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
    console.error("Error processing audio:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to process audio",
      },
      { status: 500 },
    );
  }
}

// Helper function to determine content type from filename
function getContentTypeFromFilename(filename) {
  const ext = filename.split(".").pop().toLowerCase();
  const mimeTypes = {
    m4a: "audio/mp4", // m4a is actually a container format for MP4 audio
    mp3: "audio/mpeg",
    webm: "audio/webm",
    mp4: "audio/mp4",
    mpga: "audio/mpeg",
    wav: "audio/wav",
    mpeg: "audio/mpeg",
  };

  return mimeTypes[ext] || "audio/mpeg"; // Default to audio/mpeg if not found
}
