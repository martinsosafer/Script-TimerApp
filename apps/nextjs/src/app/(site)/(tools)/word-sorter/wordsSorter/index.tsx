"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { IconArrowRight } from "@voiceai/ui/@/components/ui/icons";

import Button from "~/app/(site)/components/button";
import { roboto } from "~/app/fonts";

export default function WordsSorter() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [separator, setSeparator] = useState("");
  const [sortType, setSortType] = useState("");
  const [sortedText, setSortedText] = useState("");

  function handleSort() {
    if (!text) return;
    const words = text.trim().split(/\s+/);

    if (separator === "line") {
      const sorted = words
        .sort((a, b) =>
          sortType === "asc" ? a.localeCompare(b) : b.localeCompare(a),
        )
        .join("\n");
      setSortedText(sorted);
    }

    if (separator === "comma") {
      const sorted = words
        .sort((a, b) =>
          sortType === "asc" ? a.localeCompare(b) : b.localeCompare(a),
        )
        .join(", ");
      setSortedText(sorted);
    }

    if (separator === "space") {
      const sorted = words
        .sort((a, b) =>
          sortType === "asc" ? a.localeCompare(b) : b.localeCompare(a),
        )
        .join(" ");
      setSortedText(sorted);
    }
  }

  return (
    <main className="mb-[100px] w-full">
      <div className="mb-4 flex w-full justify-between gap-4">
        <Button
          label="Listen to your script"
          type="secondary"
          className="w-[300px]"
          onClick={() => router.push("/texttovoice")}
        />
        <Button
          label="Specialized AI rewriting"
          type="secondary"
          className="w-[300px]"
          onClick={() => router.push("/chat")}
        />
        <Button
          label="Detect Plagiarism & AI"
          type="secondary"
          className="w-[300px]"
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
          placeholder="Type or paste your text here..."
          onChange={(e) => setText(e.currentTarget.value)}
        />
        <select
          className={`${roboto.className} border-cp-primary-lightest bg-cp-background mt-3 h-[57px] w-full rounded-[4px] border px-[24px] py-[10px] text-lg font-bold text-[#212121]`}
          name="separator"
          onChange={(e) => setSeparator(e.currentTarget.value)}
        >
          <option
            className={`${roboto.className} bg-white text-lg font-bold text-[#212121]`}
            value=""
          >
            Select a separator
          </option>
          <option
            className={`${roboto.className} bg-white text-lg font-bold text-[#212121]`}
            value="line"
          >
            Line Break
          </option>
          <option
            className={`${roboto.className} bg-white text-lg font-bold text-[#212121]`}
            value="comma"
          >
            Comma
          </option>
          <option
            className={`${roboto.className} bg-white text-lg font-bold text-[#212121]`}
            value="space"
          >
            Space 4
          </option>
        </select>
        <select
          className={`${roboto.className} border-cp-primary-lightest bg-cp-background mt-3 h-[57px] w-full rounded-[4px] border px-[24px] py-[10px] text-lg font-bold text-[#212121]`}
          name="sortType"
          onChange={(e) => setSortType(e.currentTarget.value)}
        >
          <option
            className={`${roboto.className} bg-white text-lg font-bold text-[#212121]`}
            value=""
          >
            Select a Sort order
          </option>
          <option
            className={`${roboto.className} bg-white text-lg font-bold text-[#212121]`}
            value="asc"
          >
            A to Z
          </option>
          <option
            className={`${roboto.className} bg-white text-lg font-bold text-[#212121]`}
            value="desc"
          >
            Z to A
          </option>
        </select>
      </section>
      {sortedText && (
        <textarea
          className={`${roboto.className} bg-cp-primary-lightest mt-[18px] w-full rounded-lg p-[12px]`}
          readOnly
          rows={10}
          value={sortedText}
        />
      )}
      <Button
        label="Sort"
        type="primary"
        fit
        onClick={() => handleSort()}
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
