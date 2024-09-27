import React from "react";
import Link from "next/link";

import { IconUpgrades } from "@voiceai/ui/@/components/ui/icons";

const CHAR_LIMITS: Record<string, number> = {
  FREE: 500,
  FREE_TRIAL: 1000,
  STUDENT: 2000,
  CREATOR: 5000,
  BUSINESS: 10000,
};

interface ModalProps {
  onClose: () => void;
  subData: string | undefined;
}

const CharLimitModal = ({ onClose, subData }: ModalProps) => {
  const planCharacterLimit = subData ? CHAR_LIMITS[subData] : 0;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg border border-4  border-primary bg-white p-6 shadow-lg">
        <h2 className="mb-4 font-poppins text-lg font-bold">
          <span className="font-poppins   font-bold  text-red-500">
            Warning:{" "}
          </span>
          Character Limit Exceeded
        </h2>
        <p>
          You have exceeded the{" "}
          <span className="font-semibold text-primary">
            {planCharacterLimit}
          </span>{" "}
          character limit for this plan.
        </p>
        <div className="mt-6 flex justify-end space-x-4">
          <button className="rounded bg-blue-500 px-4 py-2 transition-colors duration-200 hover:bg-blue-600">
            <Link href="/plans" className="flex items-center gap-2 text-white">
              <span className="font-poppins">Upgrade</span>
              <IconUpgrades className="text-white" />
            </Link>
          </button>
          <button
            className="rounded border-2 border-black px-4 py-2 text-black transition-colors duration-200 hover:bg-gray-100"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export { CharLimitModal };
