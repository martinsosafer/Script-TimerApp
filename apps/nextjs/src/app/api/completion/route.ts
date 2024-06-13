;
// app/api/completion/route.ts

import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";





// export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    stream: true,
    // a precise prompt is important for the AI to reply with the correct tokens
    messages: [
      {
        role: "user",
        content: `Please check my spelling with a USA based dictionary, and make sure all grammar rules apply to this exact passage. Only correct spelling and grammar errors, but do not rewrite the script 
Respond with a revised copy of the speech only, do not add anything to the speech before or after. Speech content:
${prompt}
        
Output:\n`,
      },
    ],
    max_tokens: 4096,
    temperature: 0, // you want absolute certainty for spell check
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  });

  // @ts-expect-error seems to be a bug in openai sdk
  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}