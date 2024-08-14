"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";

import { IconSpinner } from "@voiceai/ui/@/components/ui/icons";
import { toast } from "@voiceai/ui/@/components/ui/toast";

import type { PlagiarismPayload } from "~/app/api/webhook/plagiarism-result/[status]/[id]/route";
import { pusherClient } from "~/lib/pusher";
import EditScanTitleModal from "../../components/modals/edit-scan-title";
import NoSessionModal from "../../components/modals/no-session-modal";
import ModeSelector from "../../components/mode-selector";
import PercentageBar from "../../components/percentage-bar";
import { addContentToScan } from "../utils";
import PlagiarismResult from "./plagiarism-result";
import ScansHistory from "./scans-history";
import WelcomeMessage from "./welcome-message";

interface CheckerProps {
  userId: string | undefined;
  scans: PlagiarismPayload[] | [];
}

export interface CheckResult {
  results: { probability: number; classification: number }[];
  summary: { ai: number };
}

export default function Checker({ userId, scans }: CheckerProps) {
  const [scansHistory, setScansHistory] = useState<PlagiarismPayload[] | []>(
    scans,
  );
  const [aiCheckResult, setAiCheckResult] = useState<CheckResult | null>(null);
  const [plagiarismCheck, setPlagiarismCheck] =
    useState<PlagiarismPayload | null>(null);

  const [scanCheckId, setScanCheckId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const [text, setText] = useState<string>("");

  const [noSessionModalOpen, setNoSessionModalOpen] = useState<boolean>(false);

  const [isEditingScanTitle, setIsEditingScanTitle] = useState<boolean>(false);

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
          "Our Plagiarism Detector requires 350 characters or more for accuracy purposes.",
      });
      setLoading(false);
    } else {
      try {
        await fetch("/api/plagiarism-check", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        });
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
    const scan = (await addContentToScan(id, text)) as PlagiarismPayload;
    setPlagiarismCheck(scan);
    setScansHistory([...scansHistory, scan]);
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
        <ModeSelector aiCheck={false} />
        <div className="mt-10 flex w-full gap-2">
          <ScansHistory
            scanHistory={scansHistory}
            setScansHistory={setScansHistory}
            setPlagiarismCheck={setPlagiarismCheck}
            setIsEditingScanTitle={setIsEditingScanTitle}
          />

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
              {plagiarismCheck && (
                <PlagiarismResult text={text} result={plagiarismCheck} />
              )}
              {!plagiarismCheck && (
                <textarea
                  name="textarea"
                  rows={20}
                  placeholder="Enter text here..."
                  className=" w-full outline-none placeholder:text-lg"
                />
              )}
            </div>
            <div className="flex w-full justify-end gap-2">
              {plagiarismCheck && (
                <PercentageBar
                  label="Plagiarism likelihood"
                  percentage={plagiarismCheck.aggregated_score / 100}
                />
              )}

              <button
                type="submit"
                className="flex h-[58px] min-w-[200px] items-center justify-center rounded-md bg-primary p-2 text-white"
              >
                {loading ? (
                  <IconSpinner className="h-6 w-6 animate-spin" />
                ) : plagiarismCheck ? (
                  "New Scan"
                ) : (
                  "Scan"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      {isEditingScanTitle && (
        <EditScanTitleModal
          onClose={() => {
            setIsEditingScanTitle(false);
            setPlagiarismCheck(null);
          }}
          setScansHistory={setScansHistory}
          scansHistory={scansHistory}
          plagiarismCheck={plagiarismCheck}
        />
      )}
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
