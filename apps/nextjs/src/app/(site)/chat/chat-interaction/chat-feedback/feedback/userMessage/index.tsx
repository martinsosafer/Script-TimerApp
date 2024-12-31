import {
  DarkMessageBubbleArrow,
  IconUser,
} from "@voiceai/ui/@/components/ui/icons";

import { roboto } from "~/app/fonts";

interface STMessageProps {
  messageContent: string[];
}

export default function UserMessage({ messageContent }: STMessageProps) {
  return (
    <div className="flex w-full items-start gap-[35px]">
      <div className="bg-cp-gray-500 relative mt-2 w-[523px] rounded-lg px-3 py-3 lg:px-6">
        {messageContent.map((item: string, idx: number) => {
          return (
            <p
              className={`${roboto.className} mb-3 text-white`}
              key={`${item}-${idx}`}
            >
              {item}
            </p>
          );
        })}
        <div className="absolute -right-6 top-0">
          <DarkMessageBubbleArrow />
        </div>
      </div>
      <div className="bg-cp-background flex h-[36px] w-[36px] flex-shrink-0 items-center justify-center rounded-full shadow-md">
        <IconUser className="text-cp-gray-500 h-7 w-7" strokeWidth={2} />
      </div>
    </div>
  );
}
