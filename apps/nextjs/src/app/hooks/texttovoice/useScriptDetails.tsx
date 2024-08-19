import { useEffect } from "react";

import { api } from "~/utils/api";

export function useScriptDetails(scriptId, setScript) {
  const { data: scriptDetails } = api.script.get.useQuery(
    { id: scriptId?.[0] ?? "" },
    { enabled: Boolean(scriptId?.[0]) },
  );

  useEffect(() => {
    if (scriptDetails) {
      setScript(scriptDetails.script);
    }
  }, [scriptDetails, setScript]);
}
