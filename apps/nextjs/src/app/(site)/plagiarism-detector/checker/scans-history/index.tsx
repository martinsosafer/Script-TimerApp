import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

import {
  IconCopyright,
  IconPencilLine,
  IconSpinner,
  IconTrash,
} from "@voiceai/ui/@/components/ui/icons";

import type { PlagiarismPayload } from "~/app/api/webhook/plagiarism-result/[status]/[id]/route";
import { deleteScan } from "../../actions";

interface PlagiarismScan extends PlagiarismPayload {
  title: string;
}

interface ScansHistoryProps {
  scanHistory: PlagiarismPayload[];
  setScansHistory: Dispatch<SetStateAction<PlagiarismPayload[]>>;
  setPlagiarismCheck: (arg: PlagiarismPayload | null) => void;
  setIsEditingScanTitle: Dispatch<SetStateAction<boolean>>;
  creditsLeft: number | undefined;
}

export default function ScansHistory({
  scanHistory,
  setScansHistory,
  setPlagiarismCheck,
  setIsEditingScanTitle,
  creditsLeft,
}: ScansHistoryProps) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="flex h-full min-h-[580px] w-[25%] flex-col justify-between rounded-sm border-2 border-gray-300 p-2">
      <div>
        <p className="text-md p-2 text-start font-semibold text-gray-900">
          Plagiarism Scans History
        </p>
        <div className="flex h-full w-full flex-col overflow-y-auto ">
          {scanHistory?.length === 0 ? (
            <p className="mt-4 text-center text-gray-500">
              Plagiarism Scans History Empty
            </p>
          ) : (
            <>
              {scanHistory.map((item: PlagiarismScan) => {
                return (
                  <div
                    key={`${item.id}`}
                    className="group flex w-full items-center justify-between hover:bg-gray-100"
                  >
                    <div
                      className="flex cursor-pointer items-start justify-start gap-2 p-2 "
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        setPlagiarismCheck(item);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          // Handle the key press event here
                        }
                      }}
                    >
                      <div className="flex h-5 w-5 items-center justify-center">
                        <IconCopyright className="mt-1" />
                      </div>

                      <p className="w-full">{item.title}</p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        className="flex h-6 w-6 items-center justify-center"
                        onClick={() => {
                          setIsEditingScanTitle(true);
                          setPlagiarismCheck(item);
                        }}
                      >
                        <IconPencilLine className="invisible h-5 w-5 cursor-pointer text-green-800 hover:text-green-400 group-hover:visible" />
                      </button>
                      <button
                        className="flex h-6 w-6 items-center justify-center"
                        onClick={async () => {
                          setIsLoading(true);
                          await deleteScan(item.id);
                          const newScanHistory = scanHistory.filter(
                            (chat) => chat.id !== item.id,
                          );
                          setScansHistory(newScanHistory);
                          setIsLoading(false);
                          setPlagiarismCheck(null);
                        }}
                      >
                        {isLoading ? (
                          <IconSpinner className="invisible h-5 w-5 animate-spin group-hover:visible" />
                        ) : (
                          <IconTrash className="invisible h-5 w-5 cursor-pointer text-[#FF0000] hover:text-red-400 group-hover:visible" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
      <div className="flex h-10 w-full items-center justify-center rounded-md bg-primary text-white">
        {" "}
        {creditsLeft} credits left
      </div>
    </div>
  );
}
