import { NextResponse } from "next/server";
import { handleUpload } from "@vercel/blob/client";
import type { HandleUploadBody } from "@vercel/blob/client";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // Ensure that only authenticated users can upload files
        return {
          allowedContentTypes: ["audio/mpeg", "audio/wav"],
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
