import type { NextRequest } from "next/server";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";

export async function POST(request: NextRequest) {
  try {
    const { text, voice } = await request.json();

    if (!text || !voice) {
      return new Response(
        JSON.stringify({ error: "Text and voice are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Extract language code from the voice name (assuming format like "en-US-Standard-A")
    const languageCode = voice.split("-").slice(0, 2).join("-");

    // Create a client with credentials from environment variables
    const client = new TextToSpeechClient({
      credentials: {
        client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(
          /\\n/g,
          "\n",
        ),
      },
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    });

    // Configure the synthesis request
    const synthesisRequest = {
      input: { text },
      voice: {
        name: voice,
        languageCode: languageCode, // Add the language code here
      },
      audioConfig: { audioEncoding: "MP3" },
    };

    // Create a readable stream to stream the audio data
    const readable = new ReadableStream({
      async start(controller) {
        try {
          // Synthesize speech
          const [response] = await client.synthesizeSpeech(synthesisRequest);

          if (response.audioContent) {
            // Convert Buffer to Uint8Array and enqueue
            const audioData = new Uint8Array(response.audioContent as Buffer);

            // For streaming, we'll split the audio into chunks
            const chunkSize = 16 * 1024; // 16KB chunks
            for (let i = 0; i < audioData.length; i += chunkSize) {
              const chunk = audioData.slice(
                i,
                Math.min(i + chunkSize, audioData.length),
              );
              controller.enqueue(chunk);

              // Add a small delay to simulate streaming
              await new Promise((resolve) => setTimeout(resolve, 100));
            }
          }

          controller.close();
        } catch (error) {
          console.error("Error in synthesizeSpeech:", error);
          controller.error(error);
        }
      },
    });

    // Return the stream as the response
    return new Response(readable, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Error synthesizing speech:", error);
    return new Response(
      JSON.stringify({ error: "Failed to synthesize speech" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
