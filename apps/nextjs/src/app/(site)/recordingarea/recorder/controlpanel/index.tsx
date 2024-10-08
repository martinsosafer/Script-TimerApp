import { RecordIcon, StopIcon } from "../utils/utils";

export default function ControlPanel({
  isRecording,
  handleToggleRecording,
}: {
  isRecording: boolean;
  handleToggleRecording: () => void;
}) {
  return (
    <div className="flex w-full justify-center">
      <div className="flex items-center justify-center rounded-lg bg-gray-200 p-6">
        <button
          onClick={handleToggleRecording}
          className={`m-auto flex h-16 w-16 items-center justify-center rounded-full ${
            isRecording
              ? "bg-red-400 hover:bg-red-500"
              : "bg-blue-400 hover:bg-blue-500"
          } focus:outline-none`}
        >
          {isRecording ? <StopIcon /> : <RecordIcon />}
        </button>
      </div>
    </div>
  );
}
