import type { SendVerificationRequestParams } from "next-auth/providers";

import { resend } from "@voiceai/email/resend/client";

export const sendVerificationRequest = async ({
  identifier,
  url,
}: SendVerificationRequestParams) => {
  try {
    await resend.emails.send({
      from: "login@script-timer.ai",
      to: identifier,
      subject: "LogIn to Script Timer",
      html: `Sign into Script Timer: ${url}`,
    });
  } catch (error) {
    console.log({ error });
  }
};
