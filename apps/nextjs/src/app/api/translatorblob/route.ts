import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

// Use the new route segment config instead of export const config
export const dynamic = "force-dynamic"; // Force dynamic route behavior
export const runtime = "nodejs"; // Specify the runtime environment

export async function POST(request: Request) {
  try {
    // Parse FormData from the request
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const filename = formData.get("filename") as string;

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
  } catch (error: any) {
    console.error("Error uploading to Vercel Blob:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
