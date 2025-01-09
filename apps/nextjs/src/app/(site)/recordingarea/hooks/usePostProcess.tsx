import { useCallback, useState } from "react";

export function usePostProcessing() {
  const [summary, setSummary] = useState("");
  const [bulletPoints, setBulletPoints] = useState<string[]>([]);
  const [sortedWords, setSortedWords] = useState([]);
  const [mainTheme, setMainTheme] = useState("");
  const [cutDowns, setCutDowns] = useState("");
  const [soundBites, setSoundBites] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const processTranscript = useCallback(
    async (whisperTranscription: string | null, type: string) => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/getRecorderTools", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            transcript: whisperTranscription,
            type,
          }),
        });
        const data = await response.json();
        console.log("CUTDOWN", data);
        switch (type) {
          case "summary":
            setSummary(data.content);
            break;
          case "bullet-points":
            setBulletPoints(
              Array.isArray(data.content) ? data.content : [data.content],
            );
            break;
          case "word-sorter":
            setSortedWords(data.content);
            break;
          case "main-topic":
            setMainTheme(data.content);
            break;
          case "useful-cutdowns":
            setCutDowns(
              typeof data.content === "string"
                ? data.content
                : data.content.join("\n"),
            );
            break;
          case "sound-bites":
            setSoundBites(data.content);
            break;
        }
      } catch (error) {
        console.error(`Error processing ${type}:`, error);
        alert(`Failed to process ${type}. Please try again.`);
      }
      setIsLoading(false);
    },
    [],
  );

  return {
    summary,
    bulletPoints,
    sortedWords,
    mainTheme,
    cutDowns,
    soundBites,
    isLoading,
    processTranscript,
  };
}
