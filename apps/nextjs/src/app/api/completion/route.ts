// app/api/completion/route.ts

import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

// export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { prompt } = await req.json();

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    stream: true,
    // a precise prompt is important for the AI to reply with the correct tokens
    messages: [
      {
        role: "user",
        content: `Given the following text, correct any spelling or grammar errors:
Text: ${prompt}
Output the corrected text followed by a bullet point list of the errors found:

Corrected Text:
- Errors:
`,
      },
    ],
    max_tokens: 4096,
    temperature: 0, // you want absolute certainty for spell check
    top_p: 0,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  //    content: `Given the following text, correct any spelling or grammar errors:
  // Text: ${prompt}
  // Output:\n`,
  //       },
  //     ],
  // @ts-expect-error seems to be a bug in openai sdk
  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
