import { NextResponse } from "next/server";
import { del } from "@vercel/blob";

import { auth } from "@voiceai/auth";

export async function DELETE(request: Request): Promise<NextResponse> {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { url } = await request.json();
  let pathname;

  try {
    const parsedUrl = new URL(url);
    pathname = parsedUrl.pathname;
  } catch (error) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  const allowedPrefixes = [
    `/RecordedWebcam/${userId}/`,
    `/RecordedAudio/${userId}/`,
    `/RecordedScreen/${userId}/`,
  ];

  if (!allowedPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await del(url);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blob:", error);
    return NextResponse.json(
      { error: "Failed to delete blob" },
      { status: 500 },
    );
  }
}
