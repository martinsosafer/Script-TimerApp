"use server";

import { z } from "zod";

import { signIn } from "@voiceai/auth";

const schema = z.object({
  email: z
    .string({
      invalid_type_error: "Invalid Email",
    })
    .email()
    .min(1),
});

export async function createUser(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      message: "Please enter a valid email",
    };
  }

  await signIn("resend", {
    email: formData.get("email"),
    redirectTo: "/",
  });
}
