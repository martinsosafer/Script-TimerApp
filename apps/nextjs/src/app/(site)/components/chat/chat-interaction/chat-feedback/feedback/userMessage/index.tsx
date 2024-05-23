import Image from "next/image";

interface STMessageProps {
  messageContent: string[];
}

export default function UserMessage({ messageContent }: STMessageProps) {
  return (
    <div className="mb-6 flex w-full items-start justify-end gap-4 bg-gray-100 p-4">
      <div>
        {messageContent.map((item: string, idx: number) => {
          return <p key={`${item}-${idx}`}>{item}</p>;
        })}
      </div>
      <Image
        src="/icons/messageicon.svg"
        width={30}
        height={30}
        alt="feedback"
      />
    </div>
  );
}
