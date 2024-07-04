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

export async function credentialsLogin(formData: FormData) {
  try {
    const result = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });

    return result;
  } catch (error) {
    throw new Error((error as string) ?? "An error occurred while signing in");
  }
}
