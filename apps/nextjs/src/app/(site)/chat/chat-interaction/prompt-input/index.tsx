import type { Dispatch, FormEvent, SetStateAction } from "react";
import { useRouter } from "next/navigation";

import { IconSpinner } from "@voiceai/ui/@/components/ui/icons";

import type { Prompt } from "~/app/(site)/(admin)/admin-prompts/types";
import Button from "~/app/(site)/components/button";
import { roboto } from "~/app/fonts";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  loadingMessages: boolean;
  isEnabled: boolean;
  userId: string | undefined;
  selectedPromptName: string | undefined;
  isInputMinimized: boolean;
  setIsInputMinimized: Dispatch<SetStateAction<boolean>>;
  prompt: Prompt | undefined;
  setAdditionalFields: Dispatch<SetStateAction<Record<string, string> | null>>;
  additionalFields: Record<string, string> | null;
  isUsingMagicPrompt: boolean;
}

export default function PromptInput({
  value,
  onChange,
  onSubmit,
  loadingMessages,
  isEnabled,
  selectedPromptName,
  isInputMinimized,
  setIsInputMinimized,
  prompt,
  setAdditionalFields,
  additionalFields,
  isUsingMagicPrompt,
}: PromptInputProps) {
  function placeholderText() {
    if (isInputMinimized) {
      return "We are procesing your entry, please see the response below.";
    }
    if (selectedPromptName === "Add Your Own Prompt") {
      return `Enter your prompt here, with important details.`;
    }
    return "Topic, Audience, Goals, Problems solved, or current script.  I will help you improve it.";
  }

  const router = useRouter();

  return (
    <div className={`${roboto.className} flex w-full flex-col items-center`}>
      <form
        onSubmit={(e) => {
          setIsInputMinimized(true);
          router.push(`#chatFeedback`);
          onSubmit(e);
        }}
        className={`${isUsingMagicPrompt ? "mt-10 lg:mt-7" : "mt-4 lg:mt-6"}  flex w-full flex-col items-center `}
      >
        {prompt?.additional_fields && (
          <div className="flex w-full flex-col">
            <span className="text-[16px] font-bold">
              Give us more details to help you
            </span>
            <div className="mt-3 flex w-full flex-wrap justify-between gap-3 lg:mt-5">
              {prompt?.additional_fields.map((field, index) => {
                return (
                  <div
                    key={index}
                    className="flex w-full flex-col gap-2 lg:w-[410px]"
                  >
                    <label className="text-sm" htmlFor={field}>
                      {field}
                    </label>
                    <input
                      type="text"
                      name={field}
                      placeholder="Enter additional information"
                      className="border-cp-gray-400 h-[42px] w-full rounded-lg border bg-white p-2 outline-none placeholder:text-lg"
                      value={additionalFields?.[field] ?? ""}
                      onChange={(e) =>
                        setAdditionalFields((prev) => ({
                          ...prev,
                          [field]: e.target.value,
                        }))
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="mt-[28px] flex w-full flex-col lg:mt-[36px]">
          <label htmlFor="prompt" className="text-[16px] font-bold">
            {!isUsingMagicPrompt
              ? "Add your prompt or the result you want"
              : "Add even more details or the result your want"}
          </label>
          <textarea
            name="prompt"
            placeholder={placeholderText()}
            className="mt-[6px] w-full resize-none rounded-md border border-gray-400 bg-white p-4 outline-none placeholder:text-lg"
            rows={isInputMinimized ? 1 : 8}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>

        <Button
          disabled={!isEnabled}
          type="primary"
          label={loadingMessages ? "" : "Create"}
          fit
          icon={
            loadingMessages
              ? () => <IconSpinner className="animate-spin text-white" />
              : undefined
          }
          className="mt-2"
        />
      </form>
    </div>
  );
}
