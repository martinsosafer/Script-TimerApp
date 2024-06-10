import { kv } from "@vercel/kv";
import OpenAI from "openai";

import { auth } from "@voiceai/auth";

import type {
  Chat,
  ChatMessage,
} from "~/app/(site)/chat/chat-interaction/types";
import { nanoid } from "~/utils/helpers";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main(messages: ChatMessage[]) {
  const completion = await openai.chat.completions.create({
    messages,
    model: "gpt-4o",
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
    const {
      id: chatId,
      title: chatTitle,
      messages,
      prevMessages,
    } = (await req.json()) as Chat;

    const result = await main(messages);

    const mappedResult = [result].map((message) => {
      return {
        role: message?.message.role as "user" | "assistant" | "system",
        content: message?.message.content ?? "",
      };
    });

    const responseBody = prevMessages
      ? prevMessages.concat([
          { role: "user", content: messages[1]?.content },
          result?.message,
        ])
      : mappedResult;

    const id = chatId ?? nanoid();
    const title = chatTitle! ?? "New chat";
    const userId = session.user.id;
    const createdAt = Date.now();

    const dbPayload = {
      id,
      title,
      userId: session.user.id,
      createdAt,
      messages: responseBody,
    };

    await kv.hmset(`newChat:${id}`, dbPayload);

    await kv.zadd(`user:newChat:${userId}`, {
      score: createdAt,
      member: `newChat:${id}`,
    });

    return new Response(JSON.stringify(dbPayload));
  } catch (err) {
    console.error(err);
    return new Response((err as Error).message as BodyInit | null | undefined, {
      status: 500,
    });
  }
}
