import OpenAI from "openai";

export const maxDuration = 60;

// export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request): Promise<Response> {
  try {
    const data = (await req.json()) as { text: string };

    console.log(data.text);

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: data.text,
      n: 1,
      size: "1792x1024",
      quality: "hd",
    });
    const image_url = response.data[0]?.url;

    return new Response(JSON.stringify(image_url));
  } catch (err) {
    console.error(err);
    return new Response((err as Error).message as BodyInit | null | undefined, {
      status: 500,
    });
  }
}
