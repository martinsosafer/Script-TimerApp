export default function RecorderPanel({
  isRecording,
  transcript,
}: {
  isRecording: boolean;
  transcript: string;
}) {
  return (
    <div className="m-auto w-full rounded-md border bg-white p-4">
      <div className="flex w-full justify-between space-y-1">
        <div>
          <p className="text-sm font-medium leading-none">Recorder</p>
          <p className="text-sm text-muted-foreground">
            {isRecording
              ? "Recording..."
              : "Press the button to record something!"}
          </p>
        </div>
        {isRecording && (
          <div className="h-4 w-4 animate-pulse rounded-full bg-red-400" />
        )}
      </div>
      <div className="mt-4 h-full rounded-md border p-2">
        <textarea
          className="h-40 w-full border p-2"
          value={transcript}
          readOnly
          placeholder="Transcript will appear here..."
        />
      </div>
    </div>
  );
}
