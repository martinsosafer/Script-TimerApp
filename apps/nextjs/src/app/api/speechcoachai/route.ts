import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  getAIContent,
  getAllAIContent,
  saveAIContent,
} from "~/app/actions/speechcoach";

export async function POST(request: NextRequest) {
  try {
    const { userId, contentType, content, uploadUrl } = await request.json();

    if (!userId || !contentType) {
      return NextResponse.json(
        { error: "userId and contentType are required" },
        { status: 400 },
      );
    }

    await saveAIContent(userId, contentType, content, uploadUrl);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const contentType = searchParams.get("contentType");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 },
      );
    }

    if (contentType) {
      const content = await getAIContent(userId, contentType as any);
      return NextResponse.json(content || { error: "Content not found" });
    } else {
      const allContent = await getAllAIContent(userId);
      return NextResponse.json(allContent);
    }
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
