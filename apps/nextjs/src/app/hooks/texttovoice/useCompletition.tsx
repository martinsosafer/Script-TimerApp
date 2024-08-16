import { useCallback, useState } from "react";
import { useCompletion } from "ai/react";

export function useCompletionCheck() {
  const [revisedScript, setRevisedScript] = useState("");
  const [loading, setLoading] = useState(false);
  const { complete } = useCompletion({
    api: "/api/completion",
  });

  const checkAndPublish = useCallback(
    async (c: string) => {
      setLoading(true);
      try {
        const completion = await complete(c);
        if (!completion) throw new Error("Failed to check typos");
        setRevisedScript(completion);
      } catch (error) {
        console.error("Error fetching completion:", error);
        setRevisedScript("Error processing request");
      } finally {
        setLoading(false);
      }
    },
    [complete],
  );

  return { revisedScript, checkAndPublish, loading };
}
