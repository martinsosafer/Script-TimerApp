import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { StreamingTextResponse } from "ai";

export const runtime = "edge";

// async function* getIterableStream(body) {
//   const reader = body.getReader();
//   const decoder = new TextDecoder();
//   const chunks = [];

//   try {
//     while (true) {
//       const { done, value } = await reader.read();
//       if (done) {
//         break;
//       }
//       chunks.push(decoder.decode(value, { stream: true }));
//     }
//   } finally {
//     reader.releaseLock();
//   }

//   for (const chunk of chunks) {
//     yield chunk;
//   }
// }

// function iteratorToStream(iterator) {
//   const readableStream = new ReadableStream({
//     async start(controller) {
//       const { value, done } = await iterator.next();
//       if (done) {
//         controller.close();
//       } else {
//         controller.enqueue(value);
//       }
//     },
//     async pull(controller) {
//       const { value, done } = await iterator.next();
//       if (done) {
//         controller.close();
//       } else {
//         controller.enqueue(value);
//       }
//     },
//     async cancel(reason) {
//       iterator.return(reason);
//     },
//   });

//   return readableStream;
// }
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
    const data = {
      text: body.message,
    };
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${body.voice_id}/stream`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
          accept: "audio/mpeg",
          "xi-api-key": process.env.INTEGRATION_11LABS_API_KEY ?? "",
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data), // body data type must match "Content-Type" header
      },
    );

    console.log("response", response.body);
    return new NextResponse(response.body, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (e: any) {
    console.log("ERROR STREAMING", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
