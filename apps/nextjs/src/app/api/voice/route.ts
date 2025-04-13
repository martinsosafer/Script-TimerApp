import { NextResponse } from "next/server";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";

import { auth } from "@voiceai/auth";
import { db, eq, schema } from "@voiceai/db";
import { elevenLabsCredit } from "@voiceai/db/schema/11LabsCredits";

function addWatermark(message: string) {
  const suffix = "Thank you for using Script-Timer ai";
  return `${message} -  - ${suffix}`;
}

export const maxDuration = 480; // This function can run for a maximum of 480 seconds

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

    const appSumoSubscription = await db.query.appSumoSubscription.findFirst({
      where: eq(schema.appSumoSubscription.userId, userId),
    });

    // Check message length based on subscription
    const maxMessageLength = getMaxMessageLength(
      appSumoSubscription ? appSumoSubscription.tier : subscription?.status,
    );

    console.log(`Max message length for user: ${maxMessageLength}`);

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

    // Special handling for cloned voices
    let voiceType = voice?.type || "11LABS";
    if (!voice && body.voice_id) {
      console.log("Voice not found in DB, assuming cloned 11Labs voice");
      voiceType = "11LABS_CLONED";
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
    const paidSubscriptionStatuses = [
      "BUSINESS",
      "STUDENT",
      "CREATOR" /* ... */,
    ];
    const paidAppSumoTiers = [1, 2];

    const hasPaidSubscription = paidSubscriptionStatuses.includes(
      subscription?.status,
    );
    const hasPaidAppSumo =
      appSumoSubscription &&
      paidAppSumoTiers.includes(appSumoSubscription.tier);

    if (!hasPaidSubscription && !hasPaidAppSumo) {
      message = addWatermark(message);
    }

    let audioStream: ReadableStream;
    let generationType: "11LABS" | "GOOGLE";
    let generationMetadata: any;

    if (voiceType === "11LABS" || voiceType === "11LABS_CLONED") {
      console.log(
        `Processing ${voiceType === "11LABS_CLONED" ? "cloned" : "standard"} 11Labs voice`,
      );
      const { stream, metadata } = await handleElevenLabsGeneration({
        ...body,
        text: message,
        isCloned: voiceType === "11LABS_CLONED",
      });
      audioStream = stream;
      generationType = "11LABS";
      generationMetadata = metadata;
    } else if (voiceType === "GOOGLE") {
      console.log("Processing Google voice");
      const { stream, metadata } = await handleGoogleGeneration({
        ...body,
        text: message,
      });
      audioStream = stream;
      generationType = "GOOGLE";
      generationMetadata = metadata;
    } else {
      return new NextResponse(
        JSON.stringify({ error: `Unsupported voice type: ${voiceType}` }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Save the audio data for generation records
    const reader = audioStream.getReader();
    const audioChunks: Uint8Array[] = [];

    const modifiedStream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            controller.enqueue(value);
            audioChunks.push(value);
          }
          controller.close();

          const audioBase64 = Buffer.concat(audioChunks).toString("base64");
          console.log("Audio base64 length:", audioBase64.length); // Debug

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

          if (!generationId) throw new Error("DB insertion failed");
          console.log("Saved generation:", generationId); // Debug

          // Deduct credits
          await db.insert(schema.credits).values({
            userId: userId,
            generationId: generationId,
            type: "11LABS", // Force all Google/11Labs usage to log as "11LABS"
            credits: -body.text.length,
            metadata: {
              length: body.text.length,
              description: `Voice generation (${generationType})`, // Clarify in metadata
            },
            created_at: new Date(),
            updated_at: new Date(),
          });
        } catch (error) {
          console.error("DB SAVE ERROR:", error);
          throw error;
        }
      },
      cancel() {
        reader.cancel();
      },
    });

    return new NextResponse(modifiedStream, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Access-Control-Allow-Origin": "*",
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
    voice_settings: {
      similarity_boost: body.similarity,
      stability: body.stability,
    },
  };

  const firstApiKey = body.isCloned
    ? process.env.CLONE_11LABS_API_KEY
    : process.env.INTEGRATION_11LABS_API_KEY;

  const secondApiKey = body.isCloned
    ? process.env.INTEGRATION_11LABS_API_KEY
    : process.env.CLONE_11LABS_API_KEY;

  let response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${body.voice_id}/stream`,
    {
      method: "POST",
      headers: {
        accept: "audio/mpeg",
        "xi-api-key": firstApiKey ?? "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${body.voice_id}/stream`,
      {
        method: "POST",
        headers: {
          accept: "audio/mpeg",
          "xi-api-key": secondApiKey ?? "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    if (!response.ok) throw new Error("11Labs TTS failed");
  }

  return { stream: response.body!, metadata: data };
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
    voice: { name: body.voice_id, languageCode },
    audioConfig: { audioEncoding: "MP3" },
  });

  if (!response.audioContent) {
    throw new Error("Google TTS returned no audio");
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
      voice_id: body.voice_id,
      languageCode,
      audioEncoding: "MP3",
    },
  };
}

function getMaxMessageLength(subscriptionStatus: string | number | undefined) {
  switch (subscriptionStatus) {
    case "FREE_TRIAL":
      return 1600;
    case "STUDENT":
      return 2000;
    case "CREATOR":
      return 5000;
    case "BUSINESS":
      return 10000;
    case 1:
      return 5000;
    case 2:
      return 10000;
    default:
      return 1000;
  }
}
