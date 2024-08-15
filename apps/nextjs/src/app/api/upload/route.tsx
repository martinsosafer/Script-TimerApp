import { NextResponse } from "next/server";
import { handleUpload } from "@vercel/blob/client";
import type { HandleUploadBody } from "@vercel/blob/client";

import { auth } from "@voiceai/auth";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const user = await auth();
        if (!user) {
          throw new Error("User not authenticated");
        }
        // Set the folder name in the pathname
        const folderName = "CelebrityVoices";
        const filePath = `${folderName}/${pathname}`;
        return {
          allowedContentTypes: [
            "audio/mpeg", // mp3, mpga
            "audio/wav", // wav
            "audio/mp4", // m4a
            "audio/webm", // webm
            "video/mp4", // mp4
            "video/mpeg", // mpeg
          ],
          pathname: filePath,
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log("Upload completed:", blob);
        // Implement any additional logic here, e.g., saving the URL to your database
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
