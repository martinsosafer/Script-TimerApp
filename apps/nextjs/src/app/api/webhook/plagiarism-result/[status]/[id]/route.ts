import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";

import { sendMessage } from "~/app/actions/messageAction";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(
  request: NextRequest,
  { params }: { params: { status: string; id: string } },
) {
  const { status, id } = params;

  console.log("WebHook", status, id);
  try {
    const body = await request.json();

    console.log("WebHook Body", body);

    await sendMessage(body);

    // await resend.emails.send({
    //   from: "login@script-timer.ai",
    //   to: "agustinsant@hotmail.com",
    //   subject: "Reset Password",
    //   text: JSON.stringify(body),
    // });

    return NextResponse.json(body);
  } catch (error) {
    return NextResponse.json(
      { error: error as string },
      { status: 500, statusText: error as string },
    );
  }
}
