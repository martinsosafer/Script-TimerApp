import { useState } from "react";

import { IconSpinner } from "@voiceai/ui/@/components/ui/icons";

interface ModalProps {
  onClose: () => void;
  onConfirm: (userId: string) => Promise<void>;
  userId: string | undefined;
  refetch: () => void;
}

export default function ExtendFreeTrialModal({
  onClose,
  onConfirm,
  userId,
  refetch,
}: ModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSubmit() {
    setIsLoading(true);
    try {
      if (userId) {
        await onConfirm(userId);
        refetch();
      }
    } catch (error) {
      console.error(error);
    }
    onClose();
    setIsLoading(false);
  }
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur">
      <div className="flex w-[600px] flex-col items-center justify-between rounded-lg bg-white p-4">
        <h2 className="flex w-full items-center gap-2 text-xl font-semibold text-gray-800">
          {" "}
          Extend Free Trial Period
        </h2>
        <div className="my-6 flex gap-2">
          <button
            className="flex w-[120px] items-center justify-center rounded-md bg-primary px-4 py-3 text-white hover:opacity-80"
            type="submit"
            onClick={handleSubmit}
          >
            {isLoading ? (
              <IconSpinner className="h-6 w-6 animate-spin" />
            ) : (
              "Confirm"
            )}
          </button>

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
