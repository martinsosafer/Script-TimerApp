import { fal } from "@ai-sdk/fal";
import { kv } from "@vercel/kv";
import { experimental_generateImage as generateImage } from "ai";
import OpenAI from "openai";

import { auth } from "@voiceai/auth";
import { db, eq, schema, sql } from "@voiceai/db";

import { nanoid } from "~/utils/helpers";

export const maxDuration = 60;

// export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request): Promise<Response> {
  const session = await auth();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    const data = (await req.json()) as { text: string };

    const { image } = await generateImage({
      model: fal.image("fal-ai/flux-lora"),
      prompt: "A serene mountain landscape at sunset",
    });

    console.log("IMAGE", image);

    // const response = await openai.images.generate({
    //   model: "dall-e-3",
    //   prompt: data.text,
    //   n: 1,
    //   size: "1792x1024",
    //   quality: "hd",
    // });

    // const image_url = response?.data[0]?.url ?? "";

    // if (image_url) {
    //   await db
    //     .update(schema.imgCredit)
    //     .set({ credits: sql`${schema.imgCredit.credits} - 1` })
    //     .where(eq(schema.imgCredit.userId, session?.user.id));

    //   const id = nanoid();
    //   const createdAt = Date.now();

    //   await kv.hmset(`aiImage:${id}`, { prompt: data.text, image_url });

    //   await kv.zadd(`user:aiImage:${session?.user.id}`, {
    //     score: createdAt,
    //     member: `aiImage:${id}`,
    //   });
    // }

    // return new Response(JSON.stringify(image_url));
  } catch (err) {
    console.error(err);
    return new Response((err as Error).message as BodyInit | null | undefined, {
      status: 500,
    });
  }
}
