"use client";

import { useState } from "react";

import { IconCaretDown } from "@voiceai/ui/@/components/ui/icons";

import faqsData from "./faqs.json";

const { faqs } = faqsData;

interface Question {
  q: string;
  a: string;
}

export default function FAQs() {
  const [selectedQuestion, setSelectedQuestion] = useState<
    Question | undefined
  >(undefined);

  return (
    <div className="mb-10 flex w-full flex-col items-center justify-center bg-gray-100 p-10">
      <h2 className="mb-8 text-5xl font-bold text-primary">FAQs</h2>
      <div className="flex w-full flex-col gap-2 text-xl text-primary xl:w-[800px]">
        {faqs.map((faq, index) => {
          const isSelected = selectedQuestion?.q === faq.q;
          return (
            <button
              key={`${index}-${faq.q.slice(0, 5)}`}
              className="flex flex-col gap-1"
              onClick={() => {
                if (isSelected) {
                  return setSelectedQuestion(undefined);
                }
                setSelectedQuestion(faq);
              }}
            >
              <div className="flex items-start gap-1 text-left font-bold">
                <div className="h-6 w-6 p-1">
                  <IconCaretDown
                    className={`text-black ${isSelected ? "rotate-180" : "rotate-90"}`}
                  />
                </div>
                {faq.q}
              </div>
              {isSelected && (
                <div className="ml-6 p-2 text-left text-[18px] text-gray-700">
                  {faq.a}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
