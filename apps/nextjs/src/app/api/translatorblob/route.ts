import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const config = {
  api: {
    bodyParser: false,
    responseLimit: "30mb",
  },
};

// Map of file extensions to MIME types
const mimeTypes = {
  m4a: "audio/m4a",
  mp3: "audio/mpeg",
  webm: "audio/webm",
  mp4: "audio/mp4",
  mpga: "audio/mpeg",
  wav: "audio/wav",
  mpeg: "audio/mpeg",
};

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const originalFilename = formData.get("filename") || file.name;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 },
      );
    }

    // Get file extension
    const fileExtension = originalFilename.split(".").pop().toLowerCase();

    // Ensure proper MIME type is set for known audio formats
    const contentType = mimeTypes[fileExtension] || file.type;

    // Create a new file with the correct content type if needed
    let fileToUpload = file;
    if (contentType !== file.type) {
      const fileArrayBuffer = await file.arrayBuffer();
      fileToUpload = new File([fileArrayBuffer], originalFilename, {
        type: contentType,
      });
    }

    // Generate unique filename
    const uniqueFilename = `${Date.now()}-${originalFilename}`;

    // Upload to Vercel Blob with correct content type
    const blob = await put(uniqueFilename, fileToUpload, {
      access: "public",
      contentType: contentType,
    });

    // Return the blob URL
    return NextResponse.json({
      success: true,
      url: blob.url,
      contentType: contentType,
    });
  } catch (error) {
    console.error("Error uploading to Vercel Blob:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to upload file",
      },
      { status: 500 },
    );
  }
}
