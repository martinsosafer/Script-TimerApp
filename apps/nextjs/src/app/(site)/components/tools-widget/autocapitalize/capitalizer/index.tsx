"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { IconArrowRight } from "@voiceai/ui/@/components/ui/icons";

import Button from "~/app/(site)/components/button";
import { roboto } from "~/app/fonts";

export default function Capitalizer() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [option, setOption] = useState("");

  function handleTransformText() {
    if (option === "capitalize") {
      const newText = text
        .split(". ")
        .map((sentence) => {
          return sentence.charAt(0).toUpperCase() + sentence.slice(1);
        })
        .join(". ");
      setText(newText);
    }
    if (option === "uppercase") {
      setText(text.toUpperCase());
    }
    if (option === "lowercase") {
      setText(text.toLowerCase());
    }
    if (option === "capitalizeWords") {
      const newText = text
        .split(" ")
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
      setText(newText);
    }
  }

  return (
    <main className="w-full lg:mb-[100px]">
      <div className="mb-6 flex w-full flex-col justify-between gap-4 lg:flex-row">
        <Button
          label="Listen to your script"
          type="secondary"
          className="lg:w-[300px]"
          onClick={() => router.push("/texttovoice")}
        />
        <Button
          label="Specialized AI rewriting"
          type="secondary"
          className="lg:w-[300px]"
          onClick={() => router.push("/chat")}
        />
        <Button
          label="Detect Plagiarism & AI"
          type="secondary"
          className="lg:w-[300px]"
          onClick={() => router.push("/plagiarism-detector")}
        />
      </div>
      <section
        className={`${roboto.className} border-cp-primary-lightest flex w-full flex-col rounded-lg border bg-white p-4`}
      >
        <textarea
          name="text"
          rows={20}
          className="w-full rounded-2xl bg-[#F2F2F5] p-4 outline-none"
          onChange={(e) => setText(e.currentTarget.value)}
          value={text}
          placeholder="Type or paste your text here..."
        />
        <select
          className={`${roboto.className} border-cp-primary-lightest bg-cp-background mt-3 h-[57px] w-full rounded-[4px] border px-[24px] py-[10px] text-lg font-bold text-[#212121]`}
          name="trasnformer"
          onChange={(e) => setOption(e.currentTarget.value)}
        >
          <option
            className={`${roboto.className} bg-white text-lg font-bold text-[#212121]`}
            value=""
          >
            Select text transformation
          </option>
          <option
            className={`${roboto.className} bg-white text-lg font-bold text-[#212121]`}
            value="capitalize"
          >
            Capitalize sentences
          </option>
          <option
            className={`${roboto.className} bg-white text-lg font-bold text-[#212121]`}
            value="uppercase"
          >
            Make all words uppercase
          </option>
          <option
            className={`${roboto.className} bg-white text-lg font-bold text-[#212121]`}
            value="lowercase"
          >
            Make all words lowercase
          </option>
          <option
            className={`${roboto.className} bg-white text-lg font-bold text-[#212121]`}
            value="capitalizeWords"
          >
            Capitalize each word
          </option>
        </select>
      </section>
      <Button
        label="Transform"
        type="primary"
        fit
        onClick={() => handleTransformText()}
        className="mt-[18px]"
      />
      <Button
        label="Listen to your script"
        type="accent"
        fit
        icon={IconArrowRight}
        onClick={() => router.push("/texttovoice")}
        className="mt-[12px]"
      />
    </main>
  );
}
