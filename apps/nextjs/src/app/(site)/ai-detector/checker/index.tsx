"use client";

import type { FormEvent } from "react";
import { useState } from "react";

import { IconSpinner } from "@voiceai/ui/@/components/ui/icons";
import { toast } from "@voiceai/ui/@/components/ui/toast";

import NoSessionModal from "../../components/modals/no-session-modal";
import ModeSelector from "../../components/mode-selector";
import PercentageBar from "../../components/percentage-bar";
import { consumedCreditsWarning, transformResults } from "./utils";
import WelcomeMessage from "./welcome-message";

interface CheckerProps {
  userId: string | undefined;
  credits: number;
}

export interface CheckResult {
  scannedDocument: { actualCredits: number };
  results: { probability: number; classification: number }[];
  summary: { ai: number };
}

export default function AiChecker({ userId, credits }: CheckerProps) {
  const [aiCheckResult, setAiCheckResult] = useState<CheckResult | null>(null);

  const [loading, setLoading] = useState(false);

  const [text, setText] = useState<string>("");

  const [noSessionModalOpen, setNoSessionModalOpen] = useState<boolean>(false);

  const [creditsLeft, setCreditsLeft] = useState<number>(credits);

  async function handleCheck(e: FormEvent) {
    e.preventDefault();
    if (aiCheckResult) {
      setText("");
      return setAiCheckResult(null);
    }
    setLoading(true);
    const data = new FormData(e.target as HTMLFormElement);
    const text = data.get("textarea") as string;
    setText(text);

    if (Math.ceil(text.length / 250) > creditsLeft) {
      toast({
        title: "Insufficient Credits",
        description: "You do not have enough credits to perform this scan.",
      });
      setLoading(false);
    } else if (text.length < 350) {
      toast({
        title: "More Text Required",
        description:
          "Our AI Content Detector requires 350 characters or more for accuracy purposes.",
      });
      setLoading(false);
    } else {
      try {
        const response = await fetch("/api/plagiarism-check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        });

        const result = (await response.json()) as CheckResult;
        setAiCheckResult(result);
        setCreditsLeft(creditsLeft - result.scannedDocument.actualCredits);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  }

  return (
    <>
      <div className="flex w-[1024px] flex-col py-10">
        <WelcomeMessage />
        <ModeSelector aiCheck={true} />
        <div className="mt-10 flex w-full gap-2">
          <form
            onSubmit={
              userId
                ? (e) => handleCheck(e)
                : (e) => {
                    e.preventDefault();
                    setNoSessionModalOpen(true);
                  }
            }
            className="flex w-full flex-col items-end gap-2"
          >
            <div className="min-h-[500px] w-full rounded-sm border-2 border-gray-300 p-4">
              {aiCheckResult && (
                <div className="flex h-full flex-col items-center justify-between">
                  <div>
                    {transformResults({
                      originalText: text,
                      results: aiCheckResult.results,
                    })}
                  </div>
                  <span className="rounded-md bg-red-200 px-4 py-2 text-sm">
                    All highlighted text is considered as AI generated content.
                  </span>
                </div>
              )}
              {!aiCheckResult && (
                <>
                  <textarea
                    name="textarea"
                    rows={20}
                    placeholder="Enter text here..."
                    onChange={(e) => setText(e.target.value)}
                    className=" w-full outline-none placeholder:text-lg"
                  />
                  {text.length > 0 && (
                    <div className="mt-2 flex w-full justify-center ">
                      {consumedCreditsWarning(text, creditsLeft)}
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="flex w-full justify-end gap-2">
              {aiCheckResult && (
                <PercentageBar
                  label="AI Content"
                  percentage={aiCheckResult.summary.ai}
                />
              )}

              <button
                type="submit"
                className="flex h-[58px] min-w-[200px] items-center justify-center rounded-md bg-primary p-2 text-white"
              >
                {loading ? (
                  <span className="flex gap-2">
                    <IconSpinner className="h-6 w-6 animate-spin" /> Working
                  </span>
                ) : aiCheckResult ? (
                  "New Scan"
                ) : (
                  "Scan"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      {noSessionModalOpen && (
        <NoSessionModal
          openModal={noSessionModalOpen}
          page="plagiarism"
          setOpenModal={setNoSessionModalOpen}
        />
      )}
    </>
  );
}
