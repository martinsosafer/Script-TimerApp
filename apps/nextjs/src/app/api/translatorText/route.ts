import { NextResponse } from "next/server";
import OpenAI from "openai";

import deductOpenAiCredits from "~/app/actions/openAiCredits";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface TranslatorData {
  prompt?: string;
  success?: boolean;
  data?: string;
  error?: unknown;
}

export async function POST(req: Request) {
  const { prompt } = (await req.json()) as { prompt: string };

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 4096,
      temperature: 0.2,
    });

    await deductOpenAiCredits(prompt.length);

    return NextResponse.json(
      {
        success: true,
        data: response.choices[0]?.message.content ?? "",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error from OpenAI API:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to translate",
      },
      {
        status: 500,
      },
    );
  }
}
