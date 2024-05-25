import { kv } from "@vercel/kv";
import OpenAI from "openai";

import { auth } from "@voiceai/auth";

import { nanoid } from "~/utils/helpers";

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
  try {
    const session = await auth();

    if (!session?.user) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }
    const { chatId, chatTitle, messages, prevMessages } = await req.json();

    console.log("REQUEST", prevMessages, messages, chatId, chatTitle);

    const result = await main(messages);

    const responseBody = prevMessages
      ? prevMessages.concat([
          { message: { role: "user", content: messages[1].content } },
          result,
        ])
      : [result];

    const id = (chatId as number) ?? nanoid();
    const title = chatTitle as string;
    const userId = session.user.id;
    const createdAt = Date.now();

    const dbPayload = {
      id,
      title,
      userId: session.user.id,
      createdAt,
      messages: responseBody,
    };

    console.log("DB PAYLOAD", dbPayload);

    await kv.hmset(`chat:${id}`, dbPayload);
    await kv.zadd(`user:chat:${userId}`, {
      score: createdAt,
      member: `chat:${id}`,
    });

    return new Response(JSON.stringify(responseBody));
  } catch (err) {
    console.error(err);
    return new Response(err.message, {
      status: 500,
    });
  }
}
