"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";

import { IconNoImage, IconSpinner } from "@voiceai/ui/@/components/ui/icons";
import { toast } from "@voiceai/ui/@/components/ui/toast";

import { magicPrompt } from "../prompt";
import PromptSelector from "../prompt-type-selector";
import WelcomeMessage from "./welcome-message/welcome-message";

export default function ImageGenerator({ credits }: { credits: number }) {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [creditsLeft, setCreditsLeft] = useState<number>(credits);

  const [isMagicPrompt, setIsMagicPrompt] = useState<boolean>(true);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const data = new FormData(event.currentTarget as HTMLFormElement);
    const prompt = isMagicPrompt ? magicPrompt : data.get("prompt");
    const text = data.get("text") ?? "";
    // const frames = data.get("frames") ?? 9;

    const finalPrompt = `${String(prompt)}:\n ${String(text)}.`;
    setLoading(true);
    if (credits < 1) {
      toast({
        title: "Insufficient Credits",
        description: "You do not have enough credits to generate this image.",
      });
      setLoading(false);
    } else {
      try {
        const result = await fetch("/api/generate-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: finalPrompt }),
        });

        const url = (await result.json()) as string;
        setImage(url);
        setLoading(false);
        setCreditsLeft(creditsLeft - 1);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  }

  return (
    <div className="mt-20 flex w-[1024px] flex-col items-center">
      <WelcomeMessage />
      <PromptSelector
        isMagicPrompt={isMagicPrompt}
        setIsMagicPrompt={setIsMagicPrompt}
      />
      <form
        onSubmit={handleSubmit}
        className="mt-12 flex w-full flex-col items-center"
      >
        {!isMagicPrompt && (
          <>
            <label
              htmlFor="prompt"
              className="mb-2 text-lg font-semibold text-primary"
            >
              Enter Your Own Prompt
            </label>
            <div className="mb-4 w-full rounded-md border border-gray-300 bg-gray-50 p-4">
              <textarea
                className="mb-2 block w-full bg-gray-50 text-sm text-gray-900 placeholder:text-lg focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
                rows={8}
                name="prompt"
                id="prompt"
                placeholder="Enter your prompt here"
              />
            </div>
          </>
        )}
        <label
          htmlFor="text"
          className="mb-2 text-lg font-semibold text-primary"
        >
          Enter your Script
        </label>
        <div className="mb-2 flex w-full flex-col items-center rounded-md border border-gray-300 bg-gray-50 p-4">
          <textarea
            className="mb-2 block w-full bg-gray-50 text-sm text-gray-900 placeholder:text-lg focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
            rows={20}
            name="text"
            id="text"
            placeholder="Enter your script here"
          />
          <span className="rounded-md bg-red-200 px-4 py-2 text-sm">
            This scan will consume 1 credit. - Credits left:{" "}
            <strong>{creditsLeft}</strong>
          </span>
        </div>

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
      </form>
      <div className="relative my-6 flex h-[600px] w-full items-center justify-center border border-gray-300">
        {image ? (
          <Image
            src={image ?? ""}
            fill
            objectFit="cover"
            alt="Generates Image"
            //className="mb-20 mt-10"
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
