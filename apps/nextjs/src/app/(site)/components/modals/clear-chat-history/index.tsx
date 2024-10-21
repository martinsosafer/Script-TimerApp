import { useState } from "react";
import Image from "next/image";

import { Button } from "@voiceai/ui";
import { IconSpinner, IconTrash } from "@voiceai/ui/@/components/ui/icons";

interface ModalProps {
  onConfirm: () => void;
  onClose: () => void;
}

export default function ClearChatHistoryModal({
  onConfirm,
  onClose,
}: ModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  function handleConfirm() {
    onConfirm();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
      <div className="w-full max-w-md rounded-lg border-4 border-blue-500 bg-white shadow-lg">
        <div className="flex flex-col items-center p-6">
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-primary">
            <IconTrash className="h-6 w-6 text-primary" />
            Clear Chat History
          </h2>
          <p className="mb-8 max-w-[80%] text-center">
            If you click <strong>DELETE</strong>, all your chats will be
            deleted. Are you sure you want to proceed?
          </p>
          <div className="flex w-full justify-center space-x-4">
            <Button
              size="lg"
              onClick={onClose}
              variant="outline"
              className="border-2 border-red-500 font-poppins text-lg font-semibold text-red-500"
            >
              Cancel
            </Button>
            <Button
              size="lg"
              className="bg-red-500 font-poppins text-lg font-semibold hover:bg-red-300"
              onClick={() => {
                setIsLoading(true);
                handleConfirm();
              }}
            >
              {isLoading ? <IconSpinner className="h-6 w-6" /> : "DELETE "}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
