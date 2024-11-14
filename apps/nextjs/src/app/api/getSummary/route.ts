import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { transcript, type } = await req.json();

  let systemPrompt, userPrompt;

  if (type === "summary") {
    systemPrompt = "You are a helpful assistant that summarizes text.";
    userPrompt = `Please provide a concise summary of the following transcript:\n\n${transcript}`;
  } else if (type === "bullet-points") {
    systemPrompt =
      "You are a helpful assistant that creates bullet point lists.";
    userPrompt = `Please provide a bullet point list of key points from the following transcript:\n\n${transcript}`;
  } else {
    return NextResponse.json(
      { error: "Invalid content type" },
      { status: 400 },
    );
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    let content = response.choices[0].message.content;

    if (type === "bullet-points") {
      content = content
        .split("\n")
        .filter((point) => point.trim().startsWith("-"))
        .map((point) => point.trim().substring(1).trim());
    }

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Error in generate-content:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 },
    );
  }
}
