import { kv } from "@vercel/kv";
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

import { auth } from "@voiceai/auth";

import { generateRandomString } from "~/utils/helpers";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export async function POST(req: Request) {
  const json = await req.json();
  const { messages, previewToken } = json;
  const userId = (await auth())?.user.id;

  if (!userId) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  if (previewToken) {
    openai.apiKey = previewToken;
  }

  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0.7,
    stream: true,
  });

  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
      const title = json.messages[0].content.substring(0, 100);
      const id = json.id ?? generateRandomString();
      const createdAt = Date.now();
      const path = `/chat/${id}`;
      const payload = {
        id,
        title,
        userId,
        createdAt,
        path,
        messages: [
          ...messages,
          {
            content: completion,
            role: "assistant",
          },
        ],
      };
      await kv.hmset(`chat:${id}`, payload);
      await kv.zadd(`user:chat:${userId}`, {
        score: createdAt,
        member: `chat:${id}`,
      });
    },
  });

  return new StreamingTextResponse(stream);
}
// // import type { NextRequest } from "next/server";
// // import { NextResponse } from "next/server";

// // import { copilot } from "@voiceai/ai";
// // import { auth } from "@voiceai/auth";

// // import { prompts } from "~/app/(site)/data/prompts";

// // import { db } from "@voiceai/db";

// // export const runtime = "edge";

// /**
//  * This handler initializes and calls an OpenAI Functions agent.
//  * See the docs for more information:
//  *
//  * https://js.langchain.com/docs/modules/agents/agent_types/openai_functions_agent
//  */
// export async function POST(req: NextRequest) {
//   try {
//     const session = await auth();

//     if (!session?.user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const body = await req.json();

//     let systemMessage = "";
//     if (body?.prompt) {
//       const promptContent = prompts.find(
//         (prompt) => prompt.id === body?.prompt,
//       );

//       systemMessage = promptContent?.prompt_ai ?? "";
//     }
//     return copilot(systemMessage, body.messages ?? []);
//   } catch (e: any) {
//     console.log("CAUGHT YOU", e);
//     return NextResponse.json({ error: e.message }, { status: 500 });
//   }
// }
