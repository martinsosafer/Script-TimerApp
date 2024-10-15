"use server";

import { openai } from "@ai-sdk/openai";
import { kv } from "@vercel/kv";
import { streamText } from "ai";
import type { CoreMessage } from "ai";
import { createStreamableValue } from "ai/rsc";

import { auth } from "@voiceai/auth";

import type { Chat } from "~/app/(site)/chat/chat-interaction/types";

function formatDate(date: Date): string {
  const pad = (num: number) => num.toString().padStart(2, "0");

  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const year = date.getFullYear();

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${month}/${day}/${year} - ${hours}:${minutes}`;
}

async function saveChat({
  messages,
  selectedChatHistory,
  feedbackChatId,
}: {
  messages: CoreMessage[];
  selectedChatHistory: Chat | undefined;
  feedbackChatId: string | undefined;
}) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const id = selectedChatHistory?.id ?? feedbackChatId;
    const title =
      selectedChatHistory?.title ?? `New Chat - ${formatDate(new Date())}`;
    const userId = session.user.id;
    const createdAt = Date.now();

    const dbPayload = {
      id,
      title,
      userId: session.user.id,
      createdAt,
      messages: messages,
    };

    console.log("dbPayload", dbPayload);

    await kv.hmset(`newChat:${id}`, dbPayload);

    await kv.zadd(`user:newChat:${userId}`, {
      score: createdAt,
      member: `newChat:${id}`,
    });

    return dbPayload;
  } catch (err) {
    console.error(err);
  }
}

export async function continueConversation(
  messages: CoreMessage[],
  selectedChatHistory: Chat | undefined,
  feedbackChatId: string | undefined,
) {
  const result = await streamText({
    model: openai("gpt-4-turbo"),
    temperature: 0.7,
    messages,
    async onFinish({ text }) {
      const resultedMessages = [
        ...messages,
        { role: "assistant", content: text },
      ] as CoreMessage[];

      await saveChat({
        messages: resultedMessages,
        selectedChatHistory,
        feedbackChatId,
      });
    },
  });

  //result.fullStream;

  const stream = createStreamableValue(result.textStream);

  return {
    value: stream.value,
  };
}
