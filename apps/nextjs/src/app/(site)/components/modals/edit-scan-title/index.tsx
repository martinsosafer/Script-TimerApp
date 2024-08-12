import { useState } from "react";

import { IconPencilLine, IconSpinner } from "@voiceai/ui/@/components/ui/icons";

import { editScanTitle } from "~/app/(site)/plagiarism-detector/utils";
import type { PlagiarismPayload } from "~/app/api/webhook/plagiarism-result/[status]/[id]/route";

interface ModalProps {
  onClose: () => void;
  plagiarismCheck: PlagiarismPayload | null;
  scansHistory: PlagiarismPayload[];
  setScansHistory: (value: PlagiarismPayload[]) => void;
}

export default function EditScanTitleModal({
  onClose,
  plagiarismCheck,
  scansHistory,
  setScansHistory,
}: ModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newTitle = form.get("title") as string;
    if (plagiarismCheck?.id) {
      await editScanTitle(plagiarismCheck.id, newTitle);
    }
    const newScanHistory = scansHistory.map((scan) => {
      if (scan.id === plagiarismCheck?.id) {
        return { ...scan, title: newTitle };
      }
      return scan;
    });

    setScansHistory(newScanHistory);
    onClose();
    setIsLoading(false);
  }
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur">
      <div className="flex w-[600px] flex-col items-center justify-between rounded-lg bg-white p-4">
        <h2 className="flex w-full items-center gap-2 text-xl font-semibold text-gray-800">
          {" "}
          <IconPencilLine /> Edit Scan Title
        </h2>
        <div className="my-6 flex gap-2">
          <form className="flex gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder={plagiarismCheck?.title}
              className="rounded-md border-2 border-primary p-2"
            />

            <button
              className="flex w-[120px] items-center justify-center rounded-md bg-primary px-4 py-3 text-white hover:opacity-80"
              type="submit"
            >
              {isLoading ? (
                <IconSpinner className="h-6 w-6 animate-spin" />
              ) : (
                "Edit Title"
              )}
            </button>
          </form>
          <button
            className="rounded-md bg-gray-500 px-4 py-3 text-white hover:opacity-80"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
