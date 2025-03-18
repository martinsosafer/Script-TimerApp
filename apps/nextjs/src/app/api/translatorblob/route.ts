import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

// Increase serverless function limits
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 300; // Increase to 5 minutes for larger files

// Map of file extensions to MIME types
const mimeTypes = {
  m4a: "audio/mp4", // Changed to audio/mp4 to match translator API
  mp3: "audio/mpeg",
  webm: "audio/webm",
  mp4: "audio/mp4",
  mpga: "audio/mpeg",
  wav: "audio/wav",
  mpeg: "audio/mpeg",
};

export async function POST(request) {
  try {
    console.log("Starting blob upload process");
    const formData = await request.formData();
    const file = formData.get("file");
    const originalFilename = formData.get("filename") || file.name;

    console.log(
      `Received file: ${originalFilename}, size: ${file.size} bytes, type: ${file.type}`,
    );

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 },
      );
    }

    // Get file extension
    const fileExtension = originalFilename.split(".").pop().toLowerCase();
    console.log(`File extension: ${fileExtension}`);

    // Ensure proper MIME type is set for known audio formats
    const contentType = mimeTypes[fileExtension] || file.type;
    console.log(`Using content type: ${contentType}`);

    // Create a new file with the correct content type if needed
    let fileToUpload = file;
    if (contentType !== file.type) {
      console.log(`Reformatting file with new content type: ${contentType}`);
      const fileArrayBuffer = await file.arrayBuffer();
      fileToUpload = new File([fileArrayBuffer], originalFilename, {
        type: contentType,
      });
    }

    // Generate unique filename
    const uniqueFilename = `audio-${Date.now()}-${originalFilename}`;
    console.log(`Generated unique filename: ${uniqueFilename}`);

    // Upload to Vercel Blob with correct content type
    console.log("Uploading to Vercel Blob...");
    const blob = await put(uniqueFilename, fileToUpload, {
      access: "public",
      contentType: contentType,
      // Use cacheControl for longer availability
      cacheControl: "max-age=31536000",
    });

    console.log(`Blob upload successful: ${blob.url}`);

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
