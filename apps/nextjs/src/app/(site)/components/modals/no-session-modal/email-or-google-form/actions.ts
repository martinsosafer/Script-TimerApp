"use server";

import { signIn } from "@voiceai/auth";

export async function handleGoogleSignIn() {
  await signIn("google", { redirectTo: "/" });
}
