import { useState } from "react";

import { IconSpinner } from "@voiceai/ui/@/components/ui/icons";

interface ModalProps {
  onClose: () => void;
  onSave: (userId: string, planId: string) => Promise<void>;
  userId: string | undefined;
  refetch: () => void;
}

export default function AddPlanIdModal({
  onClose,
  onSave,
  userId,
  refetch,
}: ModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log(userId);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const planId = form.get("planId") as string;
    try {
      if (userId) {
        await onSave(userId, planId);
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
          + Add subscription Id
        </h2>
        <div className="my-6 flex gap-2">
          <form className="flex gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              name="planId"
              placeholder="Add users subscription Id"
              className="rounded-md border-2 border-primary p-2"
            />

            <button
              className="flex w-[120px] items-center justify-center rounded-md bg-primary px-4 py-3 text-white hover:opacity-80"
              type="submit"
            >
              {isLoading ? (
                <IconSpinner className="h-6 w-6 animate-spin" />
              ) : (
                "Save"
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
