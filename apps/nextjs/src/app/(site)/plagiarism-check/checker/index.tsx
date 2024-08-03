"use client";

import type { FormEvent } from "react";
import { useState } from "react";

import { IconSpinner } from "@voiceai/ui/@/components/ui/icons";
import { toast } from "@voiceai/ui/@/components/ui/toast";

import NoSessionModal from "../../components/modals/no-session-modal";
import { transformResults } from "./utils";
import WelcomeMessage from "./welcome-message";

interface CheckerProps {
  userId: string | undefined;
}

interface CheckResult {
  results: { probability: number; classification: number }[];
  summary: { ai: number };
}

export default function Checker({ userId }: CheckerProps) {
  const [checkResult, setCheckResult] = useState<CheckResult | null>(null);
  const [aiCheck, setAiCheck] = useState(false);
  const [loading, setLoading] = useState(false);

  const [text, setText] = useState<string>("");

  const [noSessionModalOpen, setNoSessionModalOpen] = useState<boolean>(false);

  async function handleCheck(e: FormEvent) {
    e.preventDefault();
    if (checkResult) {
      return setCheckResult(null);
    }
    setLoading(true);
    const data = new FormData(e.target as HTMLFormElement);
    const text = data.get("textarea") as string;
    setText(text);

    if (text.length < 350) {
      toast({
        title: "More Text Required",
        description:
          "Our AI Content Detector requires 350 characters or more for accuracy purposes.",
      });
      setLoading(false);
    } else {
      try {
        const response = await fetch("/api/plagiarism-check", {
          method: aiCheck ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        });

        const result = await response.json();

        setCheckResult(result);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
      setLoading(false);
    }
  }

  function generatePercentage(result: number, classname?: boolean) {
    const percentage = Math.floor(result * 100);
    if (classname) {
      return `w-[${percentage}%]`;
    }
    return percentage;
  }

  return (
    <>
      <div className="flex w-[1024px] flex-col py-10">
        <WelcomeMessage />
        <div className="mt-10 flex w-full gap-2">
          <div className="flex w-[25%] flex-col rounded-sm border-2 border-gray-300 p-2">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-primary" />
              </div>
              <div className="relative flex justify-center text-sm uppercase ">
                <span className="bg-background px-2 text-primary">
                  Detection Modes
                </span>
              </div>
            </div>
          </div>

          <form
            onSubmit={
              userId
                ? (e) => handleCheck(e)
                : (e) => {
                    e.preventDefault();
                    setNoSessionModalOpen(true);
                  }
            }
            className="flex w-[75%] flex-col items-end gap-2"
          >
            <div className="min-h-[500px] w-full rounded-sm border-2 border-gray-300 p-4">
              {checkResult ? (
                <div>
                  {/* {transformResults({
                    originalText: text,
                    results: checkResult.results,
                  })} */}
                </div>
              ) : (
                <textarea
                  name="textarea"
                  rows={20}
                  placeholder="Enter text here..."
                  className=" w-full outline-none placeholder:text-lg"
                />
              )}
            </div>
            <div className="flex w-full justify-end gap-2">
              {checkResult && (
                <div className="flex w-full flex-col rounded-md border-2 border-gray-300 p-2">
                  <div className="flex justify-between">
                    <span>AI Content</span>
                    {/* <span>{generatePercentage(checkResult?.summary.ai)}%</span> */}
                  </div>
                  <div className="flex h-3 min-w-full justify-start overflow-hidden rounded-full bg-gray-400">
                    {/* <div
                      className={`${generatePercentage(
                        checkResult?.summary.ai,
                        true,
                      )} bg-primary`}
                    /> */}
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="flex h-[58px] min-w-[200px] items-center justify-center rounded-md bg-primary p-2 text-white"
              >
                {loading ? (
                  <IconSpinner className="h-6 w-6 animate-spin" />
                ) : checkResult ? (
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
