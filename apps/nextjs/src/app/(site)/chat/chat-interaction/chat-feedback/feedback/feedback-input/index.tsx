import Image from "next/image";

import { IconSpinner } from "@voiceai/ui/@/components/ui/icons";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (arg: boolean) => void;
  loadingMessages: boolean;
  isDisabled: boolean;
}
export default function FeedbackInput({
  value,
  onChange,
  onSubmit,
  loadingMessages,
  isDisabled,
}: PromptInputProps) {
  return (
    <div className="flex h-[100px] w-full items-center gap-4 rounded-md border border-gray-400 bg-white p-3">
      <textarea
        className="w-full resize-none p-1 outline-none placeholder:text-lg"
        rows={2}
        placeholder="Continue chat or introduce a new request."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        className={`flex h-8 w-8 items-center justify-center rounded-md ${isDisabled ? "bg-gray-300" : "bg-[#0066FF]"} p-2`}
        disabled={isDisabled}
        onClick={() => {
          onSubmit(true);
          onChange("");
        }}
      >
        {loadingMessages ? (
          <IconSpinner className="animate-spin text-white" />
        ) : (
          <Image
            src="/icons/leftArrow.svg"
            height={20}
            width={20}
            alt="send prompt"
          />
        )}
      </button>
    </div>
  );
}
