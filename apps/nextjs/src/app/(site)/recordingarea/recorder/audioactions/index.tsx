export default function AudioActions({
  audioUrl,
  handleDownload,
  handleCopyTranscript,
}: {
  audioUrl: string;
  handleDownload: () => void;
  handleCopyTranscript: () => void;
}) {
  return (
    <div className="mt-6 text-center">
      <audio controls src={audioUrl} className="w-full" />
      <div className="mt-4 flex justify-center space-x-4">
        <button
          onClick={handleDownload}
          className="rounded-md bg-primary px-4 py-2 text-white hover:bg-blue-400"
        >
          Download Recording
        </button>
        <button
          onClick={handleCopyTranscript}
          className="rounded-md bg-primary px-4 py-2 text-white hover:bg-gray-600"
        >
          Copy Transcript
        </button>
      </div>
    </div>
  );
}
