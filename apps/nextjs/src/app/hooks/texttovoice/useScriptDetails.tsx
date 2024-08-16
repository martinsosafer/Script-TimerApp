import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { api } from "~/utils/api";

export function useScriptDetails() {
  const { scriptId } = useParams();
  const [script, setScript] = useState("");
  const { data: scriptDetails } = api.script.get.useQuery(
    { id: scriptId?.[0] ?? "" },
    { enabled: Boolean(scriptId?.[0]) },
  );

  useEffect(() => {
    if (scriptDetails) {
      setScript(scriptDetails.script);
    }
  }, [scriptDetails]);

  return { script, setScript };
}
