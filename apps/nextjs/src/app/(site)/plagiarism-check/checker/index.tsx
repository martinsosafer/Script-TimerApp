"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";

import { IconSpinner } from "@voiceai/ui/@/components/ui/icons";
import { toast } from "@voiceai/ui/@/components/ui/toast";

import type { PlagiarismPayload } from "~/app/api/webhook/plagiarism-result/[status]/[id]/route";
import { pusherClient } from "~/lib/pusher";
import NoSessionModal from "../../components/modals/no-session-modal";
import ModeSelector from "./mode-selector";
import PercentageBar from "./percentage-bar";
import PlagiarismResult from "./plagiarism-result";
import { transformResults } from "./utils";
import WelcomeMessage from "./welcome-message";

interface CheckerProps {
  userId: string | undefined;
}

export interface CheckResult {
  results: { probability: number; classification: number }[];
  summary: { ai: number };
}

export default function Checker({ userId }: CheckerProps) {
  const [aiCheck, setAiCheck] = useState(false);
  const [aiCheckResult, setAiCheckResult] = useState<CheckResult | null>(null);
  const [plagiarismCheck, setPlagiarismCheck] =
    useState<PlagiarismPayload | null>(null);

  const [scanCheckId, setScanCheckId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const [text, setText] = useState<string>("");

  const [noSessionModalOpen, setNoSessionModalOpen] = useState<boolean>(false);

  async function handleCheck(e: FormEvent) {
    e.preventDefault();
    if (aiCheckResult ?? plagiarismCheck) {
      setPlagiarismCheck(null);
      return setAiCheckResult(null);
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

        if (aiCheck) {
          const result = (await response.json()) as CheckResult;
          setAiCheckResult(result);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    setLoading(false);
  }, [plagiarismCheck]);

  useEffect(() => {
    pusherClient.subscribe("plagiarism-check");

    pusherClient.bind("upcomming-message", (data: { message: string }) => {
      setScanCheckId(data.message);
    });
  }, []);

  async function handleScanCheck(id: string) {
    const response = await fetch(`/api/get-scan-results/${id}`);
    const scan = (await response.json()) as PlagiarismPayload;

    console.log("Scan", scan);
    setPlagiarismCheck(scan);
  }

  useEffect(() => {
    if (scanCheckId) {
      handleScanCheck(scanCheckId);
    }
  }, [scanCheckId]);

  return (
    <>
      <div className="flex w-[1024px] flex-col py-10">
        <WelcomeMessage />
        <ModeSelector
          aiCheck={aiCheck}
          setAiCheck={setAiCheck}
          setAiCheckResult={setAiCheckResult}
          setPlagiarismCheck={setPlagiarismCheck}
        />
        <div className="mt-10 flex w-full gap-2">
          <div className="flex w-[25%] flex-col rounded-sm border-2 border-gray-300 p-2">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-primary" />
              </div>
              <div className="relative flex justify-center text-sm uppercase ">
                <span className="bg-background px-2 text-primary">
                  Plagiarism Scans History
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
              {aiCheck && aiCheckResult && (
                <div>
                  {transformResults({
                    originalText: text,
                    results: aiCheckResult.results,
                  })}
                </div>
              )}
              {!aiCheck && plagiarismCheck && (
                <PlagiarismResult text={text} result={plagiarismCheck} />
              )}
              {!aiCheckResult && !plagiarismCheck && (
                <textarea
                  name="textarea"
                  rows={20}
                  placeholder="Enter text here..."
                  className=" w-full outline-none placeholder:text-lg"
                />
              )}
            </div>
            <div className="flex w-full justify-end gap-2">
              {aiCheckResult && (
                <PercentageBar
                  label="AI Content"
                  percentage={aiCheckResult.summary.ai}
                />
              )}

              {plagiarismCheck && (
                <PercentageBar
                  label="Plagiarism Content"
                  percentage={plagiarismCheck.aggregated_score / 100}
                />
              )}

              <button
                type="submit"
                className="flex h-[58px] min-w-[200px] items-center justify-center rounded-md bg-primary p-2 text-white"
              >
                {loading ? (
                  <IconSpinner className="h-6 w-6 animate-spin" />
                ) : aiCheckResult ?? plagiarismCheck ? (
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
