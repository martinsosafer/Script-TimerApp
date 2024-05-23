import Image from "next/image";

interface ChatHistoryProps {
  chatHistory: string[];
}

export default function ChatHistory({ chatHistory }: ChatHistoryProps) {
  return (
    <div className="flex w-[30%] flex-col gap-2">
      <div className="flex h-[898px] w-full flex-col justify-between rounded-md border border-gray-400 bg-white p-6">
        <div>
          <p className="p-2 text-start text-lg font-semibold text-gray-900">
            Chat History
          </p>
          {chatHistory?.length === 0 ? (
            <p className="mt-4 text-center text-gray-500">Chat History Empty</p>
          ) : (
            <>
              {chatHistory?.map((item, idx) => {
                return (
                  <div
                    key={`${item}-${idx}`}
                    className="flex items-center justify-start gap-4 p-2"
                  >
                    <Image
                      src="/icons/messageIcon.svg"
                      width={20}
                      height={20}
                      alt="feedback"
                    />
                    <p className="w-full">{item}</p>
                  </div>
                );
              })}
            </>
          )}
        </div>
        <button className="flex items-center justify-center gap-4 bg-gray-200 p-4 hover:bg-gray-100">
          <Image
            src="/icons/trash.svg"
            width={20}
            height={20}
            alt="delete conversation"
          />
          <span>Clear Chat History</span>
        </button>
      </div>
    </div>
  );
}
