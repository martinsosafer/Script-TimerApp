"use server";

import { signIn } from "@voiceai/auth";

export async function RegisterFormWithGoogle() {
  const result = await signIn("google", { redirectTo: "/" });
  return result;
}
