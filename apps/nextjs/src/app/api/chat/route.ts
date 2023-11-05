import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { StreamingTextResponse } from "ai";

import { copilot } from "@voiceai/ai";

export const runtime = "edge";

/**
 * This handler initializes and calls an OpenAI Functions agent.
 * See the docs for more information:
 *
 * https://js.langchain.com/docs/modules/agents/agent_types/openai_functions_agent
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    /**
     * We represent intermediate steps as system messages for display purposes,
     * but don't want them in the chat history.
     */

    const streamResponse = await copilot(body.messages ?? []);

    const textEncoder = new TextEncoder();
    const fakeStream = new ReadableStream({
      async start(controller) {
        for (const character of streamResponse.output) {
          controller.enqueue(textEncoder.encode(character));
          await new Promise((resolve) => setTimeout(resolve, 5));
        }
        controller.close();
      },
    });

    return new StreamingTextResponse(fakeStream);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
