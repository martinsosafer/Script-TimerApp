import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface TranslatorData {
  prompt?: string;
  sucess?: boolean;
  data?: string;
  error?: unknown;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TranslatorData>,
) {
  const { prompt } = req.body;
  try {
    const response = await openai.completions.create({
      model: "gpt-4o",
      prompt: `${prompt}`,
      max_tokens: 4096,
      temperature: 0.7,
    });
    res.status(200).json({
      sucess: true,
      data: response.choices[0]?.text,
    });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(400).json({
      sucess: false,
      error: "Failed to translate",
    });
  }
}
