import Image from "next/image";

import { IconCopy } from "@voiceai/ui/@/components/ui/icons";
import { toast } from "@voiceai/ui/@/components/ui/toast";

interface STMessageProps {
  messageContent: string[];
}

export default function STMessage({ messageContent }: STMessageProps) {
  return (
    <div className="flex w-full items-start gap-4">
      <Image
        src="/icons/locoChatFeedback.svg"
        width={30}
        height={30}
        alt="feedback"
      />
      <div>
        {messageContent.map((item: string, idx: number) => {
          return (
            <p className="mb-3" key={`${item}-${idx}`}>
              {item}
            </p>
          );
        })}
        <div className="flex w-full justify-end">
          <IconCopy
            className="h-5 w-5 cursor-pointer text-primary hover:text-blue-400"
            onClick={() => {
              void window.navigator.clipboard.writeText(
                messageContent.join("\n"),
              );
              toast({
                title: "Copied to clipboard",
                description: "The response has been copied to the clipboard",
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}
