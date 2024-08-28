import { NextResponse } from "next/server";

export async function POST(req: { json: () => any }) {
  try {
    console.log("Received request:", req);
    const body = await req.json();

    const data = {
      model_id: "eleven_multilingual_v2",
      text: body.text,
      voice_actor: body.voice_actor,
      voice_settings: {
        similarity_boost: body.similarity,
        stability: body.stability,
      },
    };

    // Try with the first API key (e.g., for cloned voices)
    let response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${body.voice_id}/stream`,
      {
        method: "POST",
        headers: {
          accept: "audio/mpeg",
          "xi-api-key": process.env.INTEGRATION_11LABS_API_KEY ?? "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    // If the first attempt fails, try with the second API key (e.g., for standard voices)
    if (!response.ok) {
      console.error(
        "Failed with CLONE_11LABS_API_KEY, trying with STANDARD_11LABS_API_KEY...",
      );

      response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${body.voice_id}/stream`,
        {
          method: "POST",
          headers: {
            accept: "audio/mpeg",
            "xi-api-key": process.env.CLONE_11LABS_API_KEY ?? "",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from ElevenLabs:", errorText);
        throw new Error(
          "Failed to fetch the text-to-speech stream with both API keys.",
        );
      }
    }

    const responseBody = response.body;
    if (!responseBody) {
      throw new Error("Response body is null.");
    }

    const reader = responseBody.getReader();
    const stream = new ReadableStream({
      async start(controller) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          controller.enqueue(value);
        }
        controller.close();
      },
      cancel() {
        reader.cancel();
      },
    });

    return new NextResponse(stream, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (e) {
    console.error("ERROR STREAMING", e);
    return new NextResponse(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
