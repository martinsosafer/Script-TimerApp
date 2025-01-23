"use server";

import { revalidatePath } from "next/cache";

export async function convertSpeechToText(formData: FormData) {
  const audio = formData.get("audio") as File;

  if (!audio) {
    throw new Error("No audio file provided");
  }

  const response = await fetch("/api/speech-to-text", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to convert speech to text");
  }

  const data = await response.json();
  revalidatePath("/");
  return data.transcription;
}
