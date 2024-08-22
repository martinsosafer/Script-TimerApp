"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";

import { IconSpinner } from "@voiceai/ui/@/components/ui/icons";
import { toast } from "@voiceai/ui/@/components/ui/toast";

import JokesLoader from "~/app/_components/jokes-loader";
import type { PlagiarismPayload } from "~/app/api/webhook/plagiarism-result/[status]/[id]/route";
import { pusherClient } from "~/lib/pusher";
import EditScanTitleModal from "../../components/modals/edit-scan-title";
import NoSessionModal from "../../components/modals/no-session-modal";
import ModeSelector from "../../components/mode-selector";
import PercentageBar from "../../components/percentage-bar";
import { addContentToScan } from "../actions";
import { consumedCreditsWarning } from "../utils";
import PlagiarismResult from "./plagiarism-result";
import ScansHistory from "./scans-history";
import WelcomeMessage from "./welcome-message";

interface CheckerProps {
  userId: string | undefined;
  scans: PlagiarismPayload[] | [];
  credits: number;
}

export interface CheckResult {
  results: { probability: number; classification: number }[];
  summary: { ai: number };
}

export default function Checker({ userId, scans, credits }: CheckerProps) {
  const [scansHistory, setScansHistory] = useState<PlagiarismPayload[] | []>(
    scans,
  );
  const [plagiarismCheck, setPlagiarismCheck] =
    useState<PlagiarismPayload | null>(null);

  const [scanCheckId, setScanCheckId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const [text, setText] = useState<string>("");

  const [noSessionModalOpen, setNoSessionModalOpen] = useState<boolean>(false);

  const [isEditingScanTitle, setIsEditingScanTitle] = useState<boolean>(false);

  const [creditsLeft, setCreditsLeft] = useState<number>(credits);

  async function handleCheck(e: FormEvent) {
    e.preventDefault();
    if (plagiarismCheck) {
      setPlagiarismCheck(null);
      setText("");
      return;
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
    setCreditsLeft(creditsLeft - scan.credits_used);
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
            creditsLeft={creditsLeft}
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
              {!loading && plagiarismCheck && (
                <PlagiarismResult result={plagiarismCheck} />
              )}
              {!loading && !plagiarismCheck && (
                <>
                  <textarea
                    name="textarea"
                    onChange={(e) => setText(e.target.value)}
                    rows={20}
                    placeholder="Enter text here..."
                    className=" w-full outline-none placeholder:text-lg"
                  />
                  {text.length > 0 && (
                    <div className="mt-2 flex w-full justify-center ">
                      {consumedCreditsWarning(text)}
                    </div>
                  )}
                </>
              )}
              {loading && <JokesLoader />}
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
                  <span className="flex gap-2">
                    <IconSpinner className="h-6 w-6 animate-spin" /> Working
                  </span>
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
