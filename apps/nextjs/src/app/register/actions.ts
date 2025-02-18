"use server";

import { signIn } from "@voiceai/auth";

export async function RegisterFormWithGoogle(code: string | null) {
  const redirectULR = code ? `/?appSumoCode=${code}` : "/";
  console.log("redirectULR", redirectULR);
  await signIn("google", { redirectTo: redirectULR });
}
