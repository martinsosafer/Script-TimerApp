import { NextResponse } from "next/server";



import { auth } from "@voiceai/auth";
import { db, eq, schema } from "@voiceai/db";
import { elevenLabsCredit } from "@voiceai/db/schema/11LabsCredits";





function addWatermark(message: string) {
  // const prefix = "Voice test";
  const suffix =
    "Unlock our best voices! Create your best scripts and videos. Click 'Upgrade Now' and thank you for trying Script Timer AI!";

  return `${message} -  - ${suffix}`;
}

export async function POST(req: { json: () => any }) {
  try {
    console.log("Received request:", req);

    // Get the authenticated user
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

    // Determine max message length based on subscription
    let maxMessageLength = 1000; // Default maximum message length for free users

    if (subscription?.status === "FREE_TRIAL") {
      maxMessageLength = 1600; // Updated maximum message length for free trials
    } else if (subscription?.status === "STUDENT") {
      maxMessageLength = 2000;
    } else if (subscription?.status === "CREATOR") {
      maxMessageLength = 5000;
    } else if (subscription?.status === "BUSINESS") {
      maxMessageLength = 10000;
    }

    // Check message length
    if (body.text.length > maxMessageLength) {
      return new NextResponse(
        JSON.stringify({
          error: `Maximum message length exceeded. Max length: ${maxMessageLength} characters.`,
        }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      );
    }

    // Fetch user credits from elevenLabsCredit table
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

    // Subtract credits
    await db
      .update(elevenLabsCredit)
      .set({
        credits: userCredits.credits - body.text.length,
        updated_at: new Date(), // Ensure fields are correctly updated
      })
      .where(eq(elevenLabsCredit.userId, userId));

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

    const data = {
      model_id: "eleven_multilingual_v2",
      text: message,
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
    const audioChunks: Uint8Array[] = [];
    const stream = new ReadableStream({
      async start(controller) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          controller.enqueue(value);

          // Collect the audio chunks to save later
          audioChunks.push(value);
        }
        controller.close();

        // Convert collected audio chunks to base64
        const audioBase64 = Buffer.concat(audioChunks).toString("base64");

        // Save generation to the database after the stream completes
        const generationId = await db
          .insert(schema.generations)
          .values({
            userId: userId,
            type: "11LABS",
            prompt: body.text,
            response: audioBase64,
            metadata: data,
          })
          .returning({ generationId: schema.generations.id })
          .then((res) => res?.[0]?.generationId);

        if (!generationId) throw new Error("Error creating voice");
        const creditsUsed = body.text.length; // Assuming each character equals one credit
        await db.insert(schema.credits).values({
          userId: userId,
          generationId: generationId, // Link to the generation ID
          type: "11LABS", // Specify the type based on your enum
          credits: -creditsUsed, // Negative value to show deduction
          metadata: {
            length: body.text.length,
            description: "Voice generation credit usage",
          },
          created_at: new Date(), // Automatically handles timestamp
          updated_at: new Date(), // Automatically handles timestamp
        });
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
      headers: { "Content-Type": "application/json" },
    });
  }
}