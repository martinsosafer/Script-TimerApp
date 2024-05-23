import Image from "next/image";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export default function PromptInput({
  value,
  onChange,
  onSubmit,
}: PromptInputProps) {
  return (
    <div className="flex w-full flex-col items-center">
      <h4 className="p-2 text-center text-lg font-semibold text-gray-900">
        Paste your script below.
      </h4>
      <div className="mt-4 flex w-full items-center gap-4 rounded-md border border-gray-400 bg-white p-3">
        <textarea
          name=""
          id=""
          className="w-full"
          rows={6}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0066FF] p-2"
          onClick={() => onSubmit()}
        >
          <Image
            src="/icons/leftArrow.svg"
            height={20}
            width={20}
            alt="send prompt"
          />
        </button>
      </div>
    </div>
  );
}
