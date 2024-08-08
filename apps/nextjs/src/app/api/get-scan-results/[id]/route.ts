import type { NextApiRequest } from "next";
import { NextResponse } from "next/server";

import { db } from "@voiceai/db";

export async function GET(
  request: NextApiRequest,
  { params }: { params: { id: string } },
) {
  console.log(params.id);
  try {
    const scan = await db.query.plagiarism.findFirst({
      where: (plagiarism, { eq }) => eq(plagiarism.id, params.id),
    });

    return Response.json(scan);
  } catch (error) {
    return NextResponse.json(
      { error: error as string },
      { status: 500, statusText: error as string },
    );
  }
}
