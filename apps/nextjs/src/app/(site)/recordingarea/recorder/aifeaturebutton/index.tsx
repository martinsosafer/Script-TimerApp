interface AIFeatureButtonsProps {
  onGenerateSummary: () => void;
  onGenerateBulletPoints: () => void;
  onSortWords: () => void;
  onMainTheme: () => void;
  onUsefulCutdowns: () => void;
  onGenerateSoundBites: () => void;
  isLoading: boolean;

  audioUrl: string | null;
  videoUrl: string | null;
}

export function AIFeatureButtons({
  onGenerateSummary,
  onGenerateBulletPoints,
  onSortWords,
  onMainTheme,
  onUsefulCutdowns,
  onGenerateSoundBites,
  isLoading,
  audioUrl,
  videoUrl,
}: AIFeatureButtonsProps) {
  return (
    <>
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        <button
          onClick={onGenerateSummary}
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-400"
          disabled={isLoading}
        >
          Generate Summary
        </button>
        <button
          onClick={onGenerateBulletPoints}
          className="rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-400"
          disabled={isLoading}
        >
          Generate Bullet Points
        </button>
        <button
          onClick={onSortWords}
          className="rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-400"
          disabled={isLoading}
        >
          {isLoading ? "Sorting..." : "Word Sorter"}
        </button>
        <button
          onClick={onMainTheme}
          className="rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-400"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Main Theme"}
        </button>
        <button
          onClick={onUsefulCutdowns}
          className="rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-400"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Cut Downs"}
        </button>
        <button
          onClick={onGenerateSoundBites}
          className="rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-400"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Sound Bites"}
        </button>
      </div>
    </>
  );
}
