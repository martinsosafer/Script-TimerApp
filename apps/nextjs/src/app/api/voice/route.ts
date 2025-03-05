import { NextResponse } from "next/server";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";

import { auth } from "@voiceai/auth";
import { db, eq, schema } from "@voiceai/db";
import { elevenLabsCredit } from "@voiceai/db/schema/11LabsCredits";

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

    let audioStream: ReadableStream;
    let generationType: "11LABS" | "GOOGLE";

    if (voice.type === "11LABS") {
      const { stream } = await handleElevenLabsGeneration(body);
      audioStream = stream;
      generationType = "11LABS";
    } else if (voice.type === "GOOGLE") {
      const { stream } = await handleGoogleGeneration(body);
      audioStream = stream;
      generationType = "GOOGLE";
    } else {
      return new NextResponse(
        JSON.stringify({ error: "Unsupported voice type." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    return new NextResponse(audioStream, {
      headers: {
        "Content-Type": "audio/mpeg",
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

  return { stream: response.body };
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

  const [response] = await client.synthesizeSpeech({
    input: { text: body.text },
    voice: {
      name: body.voice_id,
      languageCode: languageCode,
    },
    audioConfig: { audioEncoding: "MP3" },
  });

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

  return { stream };
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
