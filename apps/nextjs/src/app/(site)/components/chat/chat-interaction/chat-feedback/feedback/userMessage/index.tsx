import { IconMessage } from "@voiceai/ui/@/components/ui/icons";

interface STMessageProps {
  messageContent: string[];
}

export default function UserMessage({ messageContent }: STMessageProps) {
  return (
    <div className="mb-6 flex w-full items-start justify-end gap-4 bg-gray-100 p-4">
      <div className="mt-1">
        {messageContent.map((item: string, idx: number) => {
          return <p key={`${item}-${idx}`}>{item}</p>;
        })}
      </div>
      <IconMessage className="h-8 w-8" />
    </div>
  );
}
