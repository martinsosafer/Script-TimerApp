interface AudioControlsProps {
  audioUrl: string | null;
  onDownload: () => void;
  onCopyTranscript: () => void;
  onSave: () => void;
  isLoading: boolean;
}

export function AudioControls({
  audioUrl,
  onDownload,
  onCopyTranscript,
  onSave,
  isLoading,
}: AudioControlsProps) {
  if (!audioUrl) return null;

  return (
    <div className="mt-6 text-center">
      <audio controls src={audioUrl} className="w-full" />
      <div className="mt-4 flex justify-center space-x-4">
        <button
          onClick={onDownload}
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-400"
        >
          Download Recording
        </button>
        <button
          onClick={onCopyTranscript}
          className="rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
        >
          Copy Transcript
        </button>
        <button
          onClick={onSave}
          className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-400"
          disabled={isLoading}
        >
          Save Recording
        </button>
      </div>
    </div>
  );
}
