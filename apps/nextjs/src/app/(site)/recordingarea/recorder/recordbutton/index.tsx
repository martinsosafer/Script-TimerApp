import { IconMic2 } from "@voiceai/ui/@/components/ui/icons";

interface RecordButtonProps {
  isRecording: boolean;
  onClick: () => void;
}

export function RecordButton({ isRecording, onClick }: RecordButtonProps) {
  return (
    <button
      onClick={onClick}
      className="hover:bg-primary-dark flex w-full items-center justify-center rounded-md bg-primary py-2 font-semibold text-white focus:outline-none"
    >
      <div className="mr-2 flex items-center justify-center">
        {isRecording ? (
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="white" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          <IconMic2 className="h-6 w-6 text-white" />
        )}
      </div>
      {isRecording ? "Stop Recording" : "Start Recording"}
    </button>
  );
}
