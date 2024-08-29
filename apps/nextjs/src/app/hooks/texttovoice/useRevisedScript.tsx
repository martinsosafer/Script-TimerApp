import { useCallback, useState } from "react";
import { useCompletion } from "ai/react";

export function useReviseScript(setLoading) {
  const [revisedScript, setRevisedScript] = useState("");
  const { complete } = useCompletion({
    api: "/api/completion",
  });

  const checkAndPublish = useCallback(
    async (script) => {
      setLoading(true);
      try {
        const completion = await complete(script);
        if (!completion) throw new Error("Failed to check typos");
        setRevisedScript(completion);
      } catch (error) {
        console.error("Error fetching completion:", error);
        // Handle error appropriately
        setRevisedScript("Error processing request");
      } finally {
        setLoading(false);
      }
    },
    [complete, setLoading],
  );

  return { revisedScript, checkAndPublish, setRevisedScript };
}
