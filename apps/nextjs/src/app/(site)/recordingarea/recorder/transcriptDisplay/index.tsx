interface TranscriptDisplayProps {
  isProcessingWhisper: boolean;
  completeTranscript: string;
  transcript: string;
}

export function TranscriptDisplay({
  isProcessingWhisper,
  completeTranscript,
  transcript,
}: TranscriptDisplayProps) {
  return (
    <div className="mt-4 h-full rounded-md border p-2">
      <textarea
        className="h-40 w-full border p-2"
        value={
          isProcessingWhisper
            ? "Processing your audio with Whisper AI..."
            : completeTranscript + transcript
        }
        readOnly
        placeholder="Transcript will appear here..."
      />
    </div>
  );
}
