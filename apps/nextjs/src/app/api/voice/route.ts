import { NextResponse } from "next/server";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";

import { auth } from "@voiceai/auth";
import { db, eq, schema } from "@voiceai/db";
import { elevenLabsCredit } from "@voiceai/db/schema/11LabsCredits";

function addWatermark(message: string) {
  const suffix = "Thank you for using Script-Timer ai";
  return `${message} -  - ${suffix}`;
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "User not authenticated." }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      );
    }

    const body = await req.json();

    // Retrieve user subscription
    const subscription = await db.query.subscriptions.findFirst({
      where: eq(schema.subscriptions.userId, userId),
    });

    // Check message length based on subscription
    const maxMessageLength = getMaxMessageLength(subscription?.status);
    if (body.text.length > maxMessageLength) {
      return new NextResponse(
        JSON.stringify({
          error: `Maximum message length exceeded. Max length: ${maxMessageLength} characters.`,
        }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      );
    }

    // Fetch voice details
    const voice = await db.query.voices.findFirst({
      where: eq(schema.voices.external_id, body.voice_id),
    });

    if (!voice) {
      return new NextResponse(JSON.stringify({ error: "Voice not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check user credits
    const userCredits = await db.query.elevenLabsCredit.findFirst({
      where: eq(elevenLabsCredit.userId, userId),
    });

    if (!userCredits || userCredits.credits < body.text.length) {
      return new NextResponse(
        JSON.stringify({
          error: "Not enough credits to process the request.",
        }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      );
    }

    // Deduct credits
    await db
      .update(elevenLabsCredit)
      .set({
        credits: userCredits.credits - body.text.length,
        updated_at: new Date(),
      })
      .where(eq(elevenLabsCredit.userId, userId));

    // Apply watermark if needed
    let message = body.text;
    if (
      ![
        "BUSINESS",
        "STUDENT",
        "CREATOR",
        "STUDENTCLMO",
        "STUDENTCLMO",
        "CREATORCLMO",
        "BUSINESSCLMO",
        "STUDENTCLYR",
        "CREATORCLYR",
        "BUSINESSCLYR",
      ].includes(subscription?.status)
    ) {
      message = addWatermark(message);
    }

    let audioStream: ReadableStream;
    let generationType: "11LABS" | "GOOGLE";
    let generationMetadata: any;

    if (voice.type === "11LABS") {
      const { stream, metadata } = await handleElevenLabsGeneration({
        ...body,
        text: message,
      });
      audioStream = stream;
      generationType = "11LABS";
      generationMetadata = metadata;
    } else if (voice.type === "GOOGLE") {
      const { stream, metadata } = await handleGoogleGeneration({
        ...body,
        text: message,
      });
      audioStream = stream;
      generationType = "GOOGLE";
      generationMetadata = metadata;
    } else {
      return new NextResponse(
        JSON.stringify({ error: "Unsupported voice type." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Save the audio data for generation records
    const reader = audioStream.getReader();
    const audioChunks: Uint8Array[] = [];

    const modifiedStream = new ReadableStream({
      async start(controller) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          controller.enqueue(value);
          audioChunks.push(value);
        }
        controller.close();

        const audioBase64 = Buffer.concat(audioChunks).toString("base64");

        const generationId = await db
          .insert(schema.generations)
          .values({
            userId: userId,
            type: generationType,
            prompt: body.text,
            response: audioBase64,
            metadata: generationMetadata,
          })
          .returning({ generationId: schema.generations.id })
          .then((res) => res?.[0]?.generationId);

        if (!generationId) throw new Error("Error creating voice");

        const creditsUsed = body.text.length;
        await db.insert(schema.credits).values({
          userId: userId,
          generationId: generationId,
          type: generationType,
          credits: -creditsUsed,
          metadata: {
            length: body.text.length,
            description: `${generationType} voice generation credit usage`,
          },
          created_at: new Date(),
          updated_at: new Date(),
        });
      },
      cancel() {
        reader.cancel();
      },
    });

    return new NextResponse(modifiedStream, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Access-Control-Allow-Origin": "*", // Add CORS for iOS compatibility
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("ERROR STREAMING", error);
    return new NextResponse(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

// Helper functions
async function handleElevenLabsGeneration(body: any) {
  const data = {
    model_id: "eleven_multilingual_v2",
    text: body.text,
    voice_actor: body.voice_actor,
    voice_settings: {
      similarity_boost: body.similarity,
      stability: body.stability,
    },
  };

  const response = await fetch(
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

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`ElevenLabs API error: ${errorText}`);
  }

  return { stream: response.body, metadata: data };
}

async function handleGoogleGeneration(body: any) {
  const client = new TextToSpeechClient({
    credentials: {
      client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  });

  const languageCode = body.voice_id.split("-").slice(0, 2).join("-");

  const request = {
    input: { text: body.text },
    voice: {
      name: body.voice_id,
      languageCode: languageCode,
    },
    audioConfig: { audioEncoding: "MP3" },
  };

  const [response] = await client.synthesizeSpeech(request);

  if (!response.audioContent) {
    throw new Error("Google TTS returned no audio content");
  }

  const audioData = new Uint8Array(response.audioContent as Buffer);
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(audioData);
      controller.close();
    },
  });

  return {
    stream,
    metadata: {
      ...request,
      voice_actor: body.voice_id,
    },
  };
}

function getMaxMessageLength(subscriptionStatus: string | undefined) {
  switch (subscriptionStatus) {
    case "FREE_TRIAL":
      return 1600;
    case "STUDENT":
      return 2000;
    case "CREATOR":
      return 5000;
    case "BUSINESS":
      return 10000;
    default:
      return 1000;
  }
}
