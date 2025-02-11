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
    userPrompt = `Please count the frequency of each word in the following transcript and return a list of words in descending order by frequency:\n\n${transcript} if you are not able to get the words please tell the user that word sotter only works when you repeat more than 3 words.Please do not forget about telling the user that they need a longer speech in order "word-sorter works!`;
  } else if (type === "main-topic") {
    systemPrompt =
      "You are an intelligent assistant that extracts the main topic of a presentation.";
    userPrompt = `Based on the following transcript, what is the main topic of the presentation? Please provide a concise and clear answer:\n\n${transcript}`;
  } else if (type === "useful-cutdowns") {
    systemPrompt =
      "You are a highly skilled assistant that identifies impactful statements from a transcript.";
    userPrompt = `From the following transcript, identify and extract the most significant and impactful statements. Condense them into brief, actionable cutdowns:\n\n${transcript} if there is none please tell the user there are not impactful statements`;
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
  } else if (type === "filler-counter") {
    systemPrompt =
      "You are an expert speech analyzer focusing on filler words and phrases.";
    userPrompt = `Analyze the following transcript for filler words and phrases. Include common fillers like "um", "uh", "like", "you know", "sort of", "kind of", "basically", and any other speech patterns that don't add substantive meaning. If you dont find any please provide feedback to the user

    Please provide:
    1. A list of all filler words/phrases found and their counts
    2. The total number of filler words
    3. The total word count
    4. The percentage of filler words in the speech
    
    Format the response as a JSON object with these keys:
    - fillerWords: array of {word: string, count: number}
    - statistics: {totalFillers: number, totalWords: number, fillerPercentage: string}

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
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter((word) => word.trim() !== "")
        .forEach((word) => {
          wordCounts[word] = (wordCounts[word] || 0) + 1;
        });

      const sortedWords = Object.entries(wordCounts)
        .filter(([_, count]) => count > 3)
        .sort((a, b) => b[1] - a[1])
        .map(([word, count]) => `${word}: ${count}`);

      if (sortedWords.length === 0) {
        content =
          "The text is too short or lacks sufficient repeated words. Please provide a longer transcript with repeated words for the word-sorter to work.";
      } else {
        content = sortedWords;
      }
    } else if (type === "filler-counter") {
      try {
        console.log("OpenAI Response:", content);

        if (typeof content === "string") {
          // Check if the content is a valid JSON string
          try {
            content = JSON.parse(content);
          } catch (error) {
            console.error("Error parsing JSON:", error);
            return NextResponse.json(
              { error: "Invalid JSON response from OpenAI" },
              { status: 500 },
            );
          }
        }

        // Check if no filler words were found
        if (content.fillerWords && content.fillerWords.length === 0) {
          content = ["No filler words detected! Great job!"];
        } else if (content.fillerWords) {
          // Transform to array of "word: count" strings
          content = content.fillerWords.map(
            (item) => `${item.word}: ${item.count}`,
          );
        } else {
          console.error("Unexpected response structure:", content);
          return NextResponse.json(
            { error: "Unexpected response structure from OpenAI" },
            { status: 500 },
          );
        }
      } catch (error) {
        console.error("Error parsing filler counter response:", error);
        return NextResponse.json(
          { error: "Failed to analyze filler words" },
          { status: 500 },
        );
      }
    }

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Error in generate-content:", error);
    return NextResponse.json(
      { error: "Failed to generate content." },
      { status: 500 },
    );
  }
}
