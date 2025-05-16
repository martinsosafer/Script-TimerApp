import { useEffect, useRef, useState } from "react";

export function useUIState() {
  const [activeActorId, setActiveActorId] = useState<string | null>(null);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [stability, setStability] = useState(0.5);
  const [similarity, setSimilarity] = useState(0.75);
  const [masterVolume, setMasterVolume] = useState(1);
  const [mergeType, setMergeType] = useState<MergeType>("sequential");
  const [overlapDuration, setOverlapDuration] = useState(500);

  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeActorId) {
        const dropdown = dropdownRefs.current[activeActorId];
        if (dropdown && !dropdown.contains(event.target as Node)) {
          setActiveActorId(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeActorId]);

  return {
    activeActorId,
    setActiveActorId,
    showAdvancedSettings,
    setShowAdvancedSettings,
    stability,
    setStability,
    similarity,
    setSimilarity,
    masterVolume,
    setMasterVolume,
    mergeType,
    setMergeType,
    overlapDuration,
    setOverlapDuration,
    dropdownRefs,
  };
}
