import Image from "next/image";

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
      </div>
    </div>
  );
}
