import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { copilot } from "@voiceai/ai";
import { auth } from "@voiceai/auth";

// import { db } from "@voiceai/db";

export const runtime = "edge";

/**
 * This handler initializes and calls an OpenAI Functions agent.
 * See the docs for more information:
 *
 * https://js.langchain.com/docs/modules/agents/agent_types/openai_functions_agent
 */
export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    return copilot(body.messages ?? []);
  } catch (e: any) {
    console.log("CAUGHT YOU", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
