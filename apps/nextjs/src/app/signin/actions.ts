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
  name: z.string().min(1).optional(),
});

export async function createUser({
  email,
  name,
}: {
  email: string;
  name?: string;
}) {
  const validatedFields = schema.safeParse({
    email: email,
    ...(name ? { name } : {}),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      message: "Please enter a valid email",
    };
  }

  await signIn("resend", {
    email: email,
    redirectTo: "/",
  });
}

export async function credentialsLogin(formData: FormData) {
  const email = formData.get("email") as string;
  const parsedEmail = email.toLowerCase();

  try {
    const result = await signIn("credentials", {
      email: parsedEmail,
      password: formData.get("password") as string,
      redirect: false,
    });

    return result;
  } catch (error) {
    throw new Error((error as string) ?? "An error occurred while signing in");
  }
}
