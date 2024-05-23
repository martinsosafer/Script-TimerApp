import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main(messages) {
  const completion = await openai.chat.completions.create({
    messages,
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0];
}

export async function POST(req: Request): Promise<Response> {
  const { messages } = await req.json();

  console.log("REQUEST", messages);

  const result = await main(messages);

  console.log("RESULT", result);

  const isFeedBackResponse = messages.some(
    (m) => m.role === "assistant",
  ) as boolean;
  const userFeedback = isFeedBackResponse ? messages[1].content : null;
  return new Response(JSON.stringify({ ...result, userFeedback }));
}
