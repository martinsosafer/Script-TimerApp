import React from "react";
import Link from "next/link";

import { IconUpgrades } from "@voiceai/ui/@/components/ui/icons";

const CHAR_LIMITS = {
  FREE: 300,
  FREE_TRIAL: 1600,
  STUDENT: 2000,
  CREATOR: 5000,
  BUSINESS: 5000,
};

const CharLimitModal = ({ onClose, subData }) => {
  const planCharacterLimit = CHAR_LIMITS[subData] || 0;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded bg-white p-4">
        <h2 className="mb-4 text-lg font-bold">
          <span className="text-red-500">Warning, </span>Character Limit Exceeded
        </h2>
        <p>
          You have exceeded the {planCharacterLimit} character limit for this
          plan.
        </p>
        <div className="mt-4 flex justify-between">
          <button className="rounded bg-blue-500 px-4 py-2 ">
            <Link
              href="/plans"
              className="group flex cursor-pointer items-center gap-2"
            >
              <span className=" font-poppins text-white group-hover:text-white/80 ">
                Upgrade
              </span>
              <IconUpgrades className="text-white group-hover:text-white/80 " />
            </Link>
          </button>
          <button
            className="rounded border-2 border-black px-4 py-2 text-black"
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
