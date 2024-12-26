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
  } else if (type === "word-sorter") {
    systemPrompt = "You are a helpful assistant that analyzes text.";
    userPrompt = `Please count the frequency of each word in the following transcript and return a list of words in descending order by frequency:\n\n${transcript}`;
  } else if (type === "main-topic") {
    systemPrompt =
      "You are an intelligent assistant that extracts the main topic of a presentation.";
    userPrompt = `Based on the following transcript, what is the main topic of the presentation? Please provide a concise and clear answer:\n\n${transcript}`;
  } else if (type === "useful-cutdowns") {
    systemPrompt =
      "You are a highly skilled assistant that identifies impactful statements from a transcript.";
    userPrompt = `From the following transcript, identify and extract the most significant and impactful statements. Condense them into brief, actionable cutdowns:\n\n${transcript}`;
  } else if (type === "sound-bites") {
    systemPrompt =
      "You are a skilled content curator specializing in creating memorable sound bites.";
    userPrompt = `Please extract 3-5 powerful, quotable sound bites from the following transcript. Focus on statements that are:
    - Memorable and impactful
    - 10-15 words maximum per bite
    - Self-contained and make sense without context
    - Capture key insights or powerful moments
    
    Format each sound bite on a new line, preceded by a bullet point.
    
    Transcript:\n\n${transcript}`;
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

    if (type === "word-sorter") {
      const wordCounts = {};
      transcript
        .toLowerCase()
        .replace(/[^\w\s]/g, "") // Remove punctuation
        .split(/\s+/) // Split by whitespace
        .filter((word) => word.trim() !== "") // Filter out empty strings
        .forEach((word) => {
          wordCounts[word] = (wordCounts[word] || 0) + 1;
        });

      content = Object.entries(wordCounts)
        .filter(([_, count]) => count > 3) // Filter words occurring more than 3 times
        .sort((a, b) => b[1] - a[1]) // Sort by frequency descending
        .map(([word, count]) => `${word}: ${count}`);
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
