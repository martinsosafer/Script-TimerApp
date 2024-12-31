import {
  IconBot,
  IconCopy,
  LightMessageBubbleArrow,
} from "@voiceai/ui/@/components/ui/icons";
import { toast } from "@voiceai/ui/@/components/ui/toast";

import { roboto } from "~/app/fonts";

interface STMessageProps {
  messageContent: string[];
}

export default function STMessage({ messageContent }: STMessageProps) {
  return (
    <div className="flex w-full items-start gap-[35px]">
      <div className="bg-cp-background flex h-[36px] w-[36px] flex-shrink-0 items-center justify-center rounded-full shadow-md">
        <IconBot className="text-cp-gray-500 h-7 w-7" strokeWidth={2} />
      </div>
      <div className="bg-cp-gray-200 relative mt-2 w-[523px] rounded-lg px-3 py-3 lg:px-6">
        <div className="absolute -left-6 top-0">
          <LightMessageBubbleArrow />
        </div>
        {messageContent.map((item: string, idx: number) => {
          return (
            <p className={`${roboto.className} mb-3`} key={`${item}-${idx}`}>
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
