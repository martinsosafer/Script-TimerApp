import { NextResponse } from "next/server";

export async function POST(req: { json: () => any }) {
  try {
    console.log("Received request:", req);
    const body = await req.json();
    console.log("Request body:", body);

    const data = {
      text: body.text,
      model_id: body.model_id,
    };

    console.log("Data to be sent to ElevenLabs:", data);

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/uKXXYU7Wjzmgv5joQom3/stream`, // Hardcoded voice_id
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

    console.log("Response from ElevenLabs:", response);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response from ElevenLabs:", errorText);
      throw new Error("Failed to fetch the text-to-speech stream.");
    }

    const reader = response.body.getReader();
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
