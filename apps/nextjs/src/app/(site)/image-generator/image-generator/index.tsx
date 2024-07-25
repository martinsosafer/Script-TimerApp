"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";

import { IconEar } from "@voiceai/ui/@/components/ui/icons";

export default function ImageGenerator() {
  const [image, setImage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const data = new FormData(event.currentTarget as HTMLFormElement);
    const text = data.get("text");

    const result = await fetch("/api/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const url = (await result.json()) as string;
    setImage(url);
  }

  return (
    <div className="mt-20 flex w-[1024px] flex-col items-center">
      <form onSubmit={handleSubmit}>
        <textarea
          className="mb-2 block w-[800px] cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
          rows={10}
          name="text"
        />
        <button type="submit">Submit</button>
      </form>
      <Image
        src={image ?? ""}
        width={1000}
        height={600}
        alt="Generates Image"
        className="mb-20 mt-10"
      />
    </div>
  );
}
