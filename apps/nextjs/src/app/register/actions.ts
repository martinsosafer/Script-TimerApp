"use server";

import { signIn } from "@voiceai/auth";

export async function RegisterFormWithGoogle() {
  await signIn("google", { redirectTo: "/" });
}
