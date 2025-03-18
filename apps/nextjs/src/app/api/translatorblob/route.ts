import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const config = {
  api: {
    bodyParser: false, // Disable default JSON parsing
  },
};

export async function POST(request) {
  try {
    // Parse FormData from the request
    const formData = await request.formData();
    const file = formData.get("file");
    const filename = formData.get("filename");

    // Validate required fields
    if (!filename || !file) {
      return NextResponse.json(
        { success: false, error: "Filename and file are required" },
        { status: 400 },
      );
    }

    // Upload the file to Vercel Blob
    const blob = await put(filename, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      contentType: file.type,
    });

    // Return the blob URL and metadata
    return NextResponse.json({
      success: true,
      url: blob.url,
      downloadUrl: blob.downloadUrl,
    });
  } catch (error) {
    console.error("Error uploading to Vercel Blob:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
