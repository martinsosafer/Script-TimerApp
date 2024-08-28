import { NextResponse } from "next/server";

import { auth } from "@voiceai/auth";
import { db, eq, schema } from "@voiceai/db";

import type { CheckResult } from "~/app/(site)/ai-detector/checker";
import { nanoid } from "~/utils/helpers";

export async function POST(request: Request) {
  const { text } = (await request.json()) as {
    text: string;
  };

  const session = await auth();

  try {
    const response = await fetch(
      "https://id.copyleaks.com/v3/account/login/api",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: process.env.COPYLEAKS_API_KEY,
          email: "MROGOW@ripmediagroup.COM",
        }),
      },
    );

    const token = (await response.json()) as { access_token: string };

    const aiCheckResponse = await fetch(
      `https://api.copyleaks.com/v2/writer-detector/${nanoid()}/check`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
        },
        body: JSON.stringify({
          text,
        }),
      },
    );

    const aiCheckResult = (await aiCheckResponse.json()) as CheckResult;

    if (session?.user.id) {
      const fetchedCredits = await db.query.clCredits.findFirst({
        where: (clCredits, { eq }) => eq(clCredits.userId, session?.user.id),
      });

      if (
        fetchedCredits?.credits &&
        fetchedCredits.credits >= aiCheckResult.scannedDocument.actualCredits
      ) {
        await db
          .update(schema.clCredits)
          .set({
            credits:
              fetchedCredits.credits -
              aiCheckResult.scannedDocument.actualCredits,
          })
          .where(eq(schema.clCredits.userId, session?.user.id));
      }
    }

    return new Response(JSON.stringify(aiCheckResult));
  } catch (error) {
    return NextResponse.json(
      { error: error as string },
      { status: 500, statusText: error as string },
    );
  }
}

export async function PUT(request: Request) {
  const { text } = (await request.json()) as {
    text: string;
  };

  const session = await auth();

  const base64 = toBase64(text);

  try {
    const response = await fetch(
      "https://id.copyleaks.com/v3/account/login/api",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: process.env.COPYLEAKS_API_KEY,
          email: "MROGOW@ripmediagroup.COM",
        }),
      },
    );

    const token = (await response.json()) as { access_token: string };

    const id = nanoid().toLocaleLowerCase();

    await fetch(`https://api.copyleaks.com/v3/scans/submit/file/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify({
        base64: base64,
        filename: "text.txt",
        properties: {
          //sandbox: true,
          webhooks: {
            //newResult: `https://calm-queens-obey.loca.lt/webhook/plagiarism-result`,
            status: `${process.env.HOST_URL}/api/webhook/plagiarism-result/{STATUS}/${id}`,
          },
          includeHtml: true,
          developerPayload: session?.user.id,
        },
      }),
    });
    return NextResponse.json({
      message: `success for ${process.env.HOST_URL}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error as string },
      { status: 500, statusText: error as string },
    );
  }
}

function toBase64(str: string): string {
  return btoa(
    encodeURIComponent(str).replace(
      /%([0-9A-F]{2})/g,
      function (_, p1: string) {
        return String.fromCharCode(parseInt(p1, 16));
      },
    ),
  );
}
