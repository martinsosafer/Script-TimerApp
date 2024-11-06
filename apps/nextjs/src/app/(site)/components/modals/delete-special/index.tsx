import { useState } from "react";
import Image from "next/image";

import { IconSpinner } from "@voiceai/ui/@/components/ui/icons";

interface ModalProps {
  onConfirm: () => void;
  onClose: () => void;
}

export default function DeleteSpecialModal({ onConfirm, onClose }: ModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  function handleConfirm() {
    onConfirm();
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur">
      <div className="flex w-[600px] flex-col items-center justify-between rounded-lg bg-white p-4">
        <h2 className="flex w-full items-center gap-2 text-xl font-semibold text-gray-800">
          {" "}
          <Image
            src="/icons/trash.svg"
            alt="delete history"
            width={20}
            height={20}
          />{" "}
          Delete Monthly Special
        </h2>
        <p className="w-400 my-6 text-center text-lg text-gray-800">
          If you click <strong>DELETE SPECIAL</strong> the monthly special will
          be erased from the data base.
        </p>
        <div className="flex w-full items-center justify-end gap-4">
          <button
            className="h-12 rounded-md bg-gray-400 px-4 py-3 hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="flex h-12 w-52 items-center justify-center rounded-md bg-red-700 px-2 py-3 text-white hover:bg-red-500"
            onClick={() => {
              setIsLoading(true);
              handleConfirm();
            }}
          >
            {isLoading ? <IconSpinner className="h-6 w-6" /> : "DELETE SPECIAL"}
          </button>
        </div>
      </div>
    </div>
  );
}
