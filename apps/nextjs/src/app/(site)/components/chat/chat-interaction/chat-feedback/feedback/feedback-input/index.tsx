import Image from "next/image";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (arg: boolean) => void;
}
export default function FeedbackInput({
  value,
  onChange,
  onSubmit,
}: PromptInputProps) {
  return (
    <div className="flex w-full items-center gap-4 rounded-md border border-gray-400 bg-white p-3">
      <textarea
        className="w-full"
        rows={2}
        placeholder="Continue chat or introduce a new request."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0066FF] p-2"
        onClick={() => onSubmit(true)}
      >
        <Image
          src="/icons/leftArrow.svg"
          height={20}
          width={20}
          alt="send prompt"
        />
      </button>
    </div>
  );
}
