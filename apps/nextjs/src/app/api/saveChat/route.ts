import { kv } from "@vercel/kv";

import { auth } from "@voiceai/auth";

import type { Chat } from "~/app/(site)/chat/chat-interaction/types";
import { nanoid } from "~/utils/helpers";

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
    } = (await req.json()) as Chat;

    const id = chatId ?? nanoid();
    const title = chatTitle! ?? "New chat";
    const userId = session.user.id;
    const createdAt = Date.now();

    const dbPayload = {
      id,
      title,
      userId: session.user.id,
      createdAt,
      messages: messages,
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
