import { NextResponse } from "next/server";

import { auth } from "@voiceai/auth";

import { nanoid } from "~/utils/helpers";

export async function POST(request: Request) {
  const { text } = (await request.json()) as {
    text: string;
  };

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

  const aiCheckResult = await aiCheckResponse.json();

  try {
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

    const result = await fetch(
      `https://api.copyleaks.com/v3/scans/submit/file/${id}`,
      {
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
      },
    );
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error as string },
      { status: 500, statusText: error as string },
    );
  }
}

function toBase64(str: string): string {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (_, p1) {
      return String.fromCharCode(parseInt(p1, 16));
    }),
  );
}
