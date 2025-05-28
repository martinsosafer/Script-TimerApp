import { fal } from "@fal-ai/client";
import { kv } from "@vercel/kv";

import { auth } from "@voiceai/auth";
import { and, db, eq, schema, sql } from "@voiceai/db";

import { nanoid } from "~/utils/helpers";

export const maxDuration = 60;

// export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
  const session = await auth();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    const data = (await req.json()) as {
      text: string;
      planCredits: number;
      boosterCredits: number;
    };

    const response = await fal.subscribe("fal-ai/luma-photon", {
      input: {
        prompt: data.text,
        // image_size: { width: 1792, height: 1024 },
        // num_images: 1,
        aspect_ratio: "16:9",
      },
      logs: true,
    });

    const image_url = response?.data?.images[0]?.url ?? "";

    if (image_url) {
      if (data.planCredits === 0 && data.boosterCredits > 0) {
        // Find booster with credits
        const booster = await db.query.imgBooster.findFirst({
          where: (booster, { eq, gt }) =>
            and(eq(booster.userId, session?.user.id), gt(booster.credits, 0)),
        });
        // Substract credit from booster
        await db
          .update(schema.imgBooster)
          .set({ credits: sql`${schema.imgBooster.credits} - 1` })
          .where(eq(schema.imgBooster.id, booster?.id ?? ""));
      } else {
        // Substract credit from plan
        await db
          .update(schema.imgCredit)
          .set({ credits: sql`${schema.imgCredit.credits} - 1` })
          .where(eq(schema.imgCredit.userId, session?.user.id));
      }

      const id = nanoid();
      const createdAt = Date.now();

      await kv.hmset(`aiImage:${id}`, { prompt: data.text, image_url });

      await kv.zadd(`user:aiImage:${session?.user.id}`, {
        score: createdAt,
        member: `aiImage:${id}`,
      });
    }

    return new Response(JSON.stringify(image_url));
  } catch (err) {
    console.error(err);
    return new Response((err as Error).message as BodyInit | null | undefined, {
      status: 500,
    });
  }
}

// OpenAi Dall-E code //

// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY!,
// });

// export async function POST(req: Request): Promise<Response> {

//   try {
//     const data = (await req.json()) as { text: string };

//     const response = await openai.images.generate({
//       model: "dall-e-3",
//       prompt: data.text,
//       n: 1,
//       size: "1792x1024",
//       quality: "hd",
//     });

//     const image_url = response?.data[0]?.url ?? "";

//     if (image_url) {
//       await db
//         .update(schema.imgCredit)
//         .set({ credits: sql`${schema.imgCredit.credits} - 1` })
//         .where(eq(schema.imgCredit.userId, session?.user.id));

//       const id = nanoid();
//       const createdAt = Date.now();

//       await kv.hmset(`aiImage:${id}`, { prompt: data.text, image_url });

//       await kv.zadd(`user:aiImage:${session?.user.id}`, {
//         score: createdAt,
//         member: `aiImage:${id}`,
//       });
//     }

//     return new Response(JSON.stringify(image_url));
//   } catch (err) {
//     console.error(err);
//     return new Response((err as Error).message as BodyInit | null | undefined, {
//       status: 500,
//     });
//   }
// }
