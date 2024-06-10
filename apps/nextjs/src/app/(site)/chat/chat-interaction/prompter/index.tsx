import Image from "next/image";

interface PrompterProps {
  uiPrompt: string | undefined;
}

export default function Prompter({ uiPrompt }: PrompterProps) {
  return (
    <div className="ml-4 mt-4 p-4">
      <div className="absolte">
        <div className="w-[600px] rounded-xl bg-[#26252A] p-3 text-white">
          {uiPrompt ?? "How can I help you today?"}
        </div>
        <div className="relative -left-16 bottom-1">
          <Image
            src="/icons/scriptTimerLogo.svg"
            width={50}
            height={50}
            alt="chat Logo"
          />
        </div>
        <div className="relative -left-3 bottom-16">
          <Image
            src="/icons/bubbleArrow.svg"
            width={25}
            height={25}
            alt="bubble"
          />
        </div>
      </div>
    </div>
  );
}
