"use server";

import { redirect } from "next/navigation";
import { kv } from "@vercel/kv";

import { auth } from "@voiceai/auth";

import type { Chat } from "~/lib/types";

export async function getChats(userId?: string | null) {
  if (!userId) {
    return [];
  }

  try {
    const pipeline = kv.pipeline();
    const chats: string[] = await kv.zrange(`user:newChat:${userId}`, 0, -1, {
      rev: true,
    });

    for (const chat of chats) {
      pipeline.hgetall(chat);
    }

    const results = await pipeline.exec();

    return results as Chat[];
  } catch (error) {
    return [];
  }
}

export async function editChatSubject(id: string, subject: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "Unauthorized",
    };
  }
  try {
    const payload = { title: subject };
    await kv.hset(`newChat:${id}`, payload);
    return payload;
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
}

export async function getChat(id: string, userId: string) {
  const chat = await kv.hgetall<Chat>(`chat:${id}`);

  if (!chat || (userId && chat.userId !== userId)) {
    return null;
  }

  return chat;
}

export async function removeChat({ id }: { id: string | null }) {
  const session = await auth();

  if (!id) return;

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  const uid = await kv.hget<string>(`newChat:${id}`, "userId");

  if (uid !== session?.user?.id) {
    return {
      error: "Unauthorized",
    };
  }

  await kv.del(`newChat:${id}`);
  await kv.zrem(`user:newChat:${session.user.id}`, `newChat:${id}`);
}

export async function clearChats() {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "Unauthorized",
    };
  }

  const chats: string[] = await kv.zrange(
    `user:newChat:${session.user.id}`,
    0,
    -1,
  );
  if (!chats.length) {
    return redirect("/chat");
  }
  const pipeline = kv.pipeline();

  for (const chat of chats) {
    pipeline.del(chat);
    pipeline.zrem(`user:newChat:${session.user.id}`, chat);
  }

  await pipeline.exec();
}

export async function getSharedChat(id: string) {
  const chat = await kv.hgetall<Chat>(`chat:${id}`);

  if (!chat?.sharePath) {
    return null;
  }

  return chat;
}

export async function shareChat(id: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "Unauthorized",
    };
  }

  const chat = await kv.hgetall<Chat>(`chat:${id}`);

  if (!chat || chat.userId !== session.user.id) {
    return {
      error: "Something went wrong",
    };
  }

  const payload = {
    ...chat,
    sharePath: `/share/${chat.id}`,
  };

  await kv.hmset(`chat:${chat.id}`, payload);

  return payload;
}
