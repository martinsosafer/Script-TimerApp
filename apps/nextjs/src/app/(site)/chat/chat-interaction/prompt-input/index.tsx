import type { FormEvent } from "react";
import Image from "next/image";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@voiceai/ui/@/components/ui/hover-card";
import { IconSpinner } from "@voiceai/ui/@/components/ui/icons";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  loadingMessages: boolean;
  isEnabled: boolean;
  setOpenMopdal: () => void;
  userId: string | undefined;
}

export default function PromptInput({
  value,
  onChange,
  onSubmit,
  loadingMessages,
  isEnabled,
  setOpenMopdal,
  userId,
}: PromptInputProps) {
  return (
    <div className="flex w-full flex-col items-center">
      <form
        onSubmit={(e) => onSubmit(e)}
        className="mt-4 flex w-full items-center gap-4 rounded-md border border-gray-400 bg-white p-3"
      >
        <textarea
          placeholder="Topic, Audience, Goals, Problems solved, or current script.  I will help you improve it."
          className="w-full resize-none p-4 outline-none placeholder:text-lg"
          rows={6}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <HoverCard>
          <HoverCardTrigger>
            <button
              className={`flex h-8 w-8 items-center justify-center rounded-md ${isEnabled ? "bg-[#0066FF]" : "bg-gray-400"}  p-2`}
              disabled={!isEnabled}
              type="submit"
              onClick={() => {
                userId ? null : setOpenMopdal();
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
          </HoverCardTrigger>
          {!isEnabled && (
            <HoverCardContent>
              <p className="text-sm text-gray-500">
                Please, select a prompt above to continue.
              </p>
            </HoverCardContent>
          )}
        </HoverCard>
      </form>
    </div>
  );
}
