import React from "react";
import Link from "next/link";

import { IconUpgrades } from "@voiceai/ui/@/components/ui/icons";

const CHAR_LIMITS: Record<string, number> = {
  FREE: 500,
  FREE_TRIAL: 1000,
  STUDENT: 2000,
  CREATOR: 5000,
  BUSINESS: 10000,
  STUDENTCLMO: 2000,
  CREATORCLMO: 5000,
  BUSINESSCLMO: 10000,
  STUDENTCLYR: 2000,
  CREATORCLYR: 5000,
  BUSINESSCLYR: 10000,
};

interface ModalProps {
  onClose: () => void;
  subData: string | undefined;
}

const CharLimitModal = ({ onClose, subData }: ModalProps) => {
  const planCharacterLimit = subData ? CHAR_LIMITS[subData] : 0;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg border-4 border-blue-500 bg-white shadow-lg">
        <div className="flex flex-col items-center p-6">
          <h2 className="mb-4 text-center text-2xl font-bold text-primary">
            Character limit exceeded
          </h2>
          <p className="mb-8 max-w-[80%] text-center">
            You have exceeded the character limit
            <br />
            <span className="font-bold text-primary">
              {planCharacterLimit} characters
            </span>
            <br />
            for this plan
          </p>
          <div className="flex w-full justify-center space-x-4">
            <button
              onClick={onClose}
              className="text- rounded-md border-2 border-primary px-6 py-2 font-semibold text-primary transition-colors duration-200 hover:bg-blue-50"
            >
              Close
            </button>
            <Link
              href="/plans"
              className="rounded-md bg-primary px-6 py-2 font-semibold text-white transition-colors duration-200 hover:bg-blue-600"
            >
              Upgrade
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CharLimitModal };
