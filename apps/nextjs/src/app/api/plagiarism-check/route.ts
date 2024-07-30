import { NextResponse } from "next/server";

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

  console.log(aiCheckResult);

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

  console.log(text);

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

  const aiCheckResponse = await fetch(
    `https://api.copyleaks.com/v3/scans/submit/file/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify({
        base64: text,
        filename: "text.txt",
        properties: {
          //sandbox: true,
          webhooks: {
            newResult: `https://petite-rings-press.loca.lt/webhook/new-result`,
            status: `https://petite-rings-press.loca.lt/{STATUS}/${id}`,
          },
        },
      }),
    },
  );

  //const aiCheckResult = await aiCheckResponse.json();

  // console.log(
  //   "CHECK RESULT",
  //   aiCheckResponse.status,
  //   aiCheckResponse.text,
  //   aiCheckResponse.json,
  // );

  //const check = await fetch(`https://petite-rings-press.loca.lt/new-result`);
  console.log(aiCheckResponse);
  //console.log(url, `https://app.script-timer.com/webhook/{STATUS}/${id}`);

  try {
    return new Response(JSON.stringify("Succuess"));
  } catch (error) {
    return NextResponse.json(
      { error: error as string },
      { status: 500, statusText: error as string },
    );
  }
}
