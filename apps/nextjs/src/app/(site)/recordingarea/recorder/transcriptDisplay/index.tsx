interface TranscriptDisplayProps {
  isProcessingWhisper: boolean;
  completeTranscript: string;
  transcript: string;
  whisperTranscription: string | null;
}

export function TranscriptDisplay({
  isProcessingWhisper,
  completeTranscript,
  transcript,
  whisperTranscription,
}: TranscriptDisplayProps) {
  return (
    <div className="mt-4 h-full rounded-md border p-2">
      <textarea
        className="h-40 w-full border p-2"
        value={
          isProcessingWhisper
            ? "We are processing your audio transcription, please wait..."
            : whisperTranscription || completeTranscript + transcript
        }
        readOnly
        placeholder="Transcript will appear here..."
      />
    </div>
  );
}
