"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";

import { IconNoImage, IconSpinner } from "@voiceai/ui/@/components/ui/icons";

import WelcomeMessage from "./welcome-message/welcome-message";

export default function ImageGenerator() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const data = new FormData(event.currentTarget as HTMLFormElement);
    const text = data.get("text") ?? "";
    const frames = data.get("frames") ?? 9;

    const prompt = `Plase generate a ${String(frames)} frames storyboard for the following text: ${String(text)} \n, be sure to fit all the frames in the generated image.`;
    try {
      setLoading(true);
      const result = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: prompt }),
      });

      const url = (await result.json()) as string;
      setImage(url);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <div className="mt-20 flex w-[1024px] flex-col items-center">
      <WelcomeMessage />
      <form onSubmit={handleSubmit} className="mt-12 w-full">
        <div className="mb-2 rounded-md border border-gray-300 bg-gray-50 p-4">
          <textarea
            className="mb-2 block w-full bg-gray-50 text-sm text-gray-900 placeholder:text-lg focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
            rows={20}
            name="text"
            placeholder="Enter your script here"
          />
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            name="frames"
            className="rounded-md border border-primary p-2"
            placeholder="Number of frames"
          />
          <button
            type="submit"
            className=" flex w-full items-center justify-center rounded-md bg-primary p-3 text-white"
          >
            {loading ? (
              <IconSpinner className="h-6 w-6 animate-spin" />
            ) : (
              "Generate Image"
            )}
          </button>
        </div>
      </form>
      <div className="my-6 flex h-[600px] w-full items-center justify-center border border-gray-300">
        {image ? (
          <Image
            src={image ?? ""}
            width={1000}
            height={600}
            alt="Generates Image"
            className="mb-20 mt-10"
          />
        ) : loading ? (
          <IconSpinner className="h-10 w-10 animate-spin" />
        ) : (
          <IconNoImage className="h-10 w-10" />
        )}
      </div>
    </div>
  );
}
