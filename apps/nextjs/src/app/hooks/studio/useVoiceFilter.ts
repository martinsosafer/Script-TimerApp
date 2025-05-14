import { useMemo, useState } from "react";

import type { FilterType, Voice } from "~/constants/types/voice";

export function useVoiceFilter(allVoices: Voice[]) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [filterValue, setFilterValue] = useState("");
  const [favoriteVoicesOnly, setFavoriteVoicesOnly] = useState(false);

  const genderOptions = useMemo(() => {
    return [...new Set(allVoices.map((voice) => voice.gender))];
  }, [allVoices]);

  const typeOptions = useMemo(() => {
    return [...new Set(allVoices.map((voice) => voice.type))];
  }, [allVoices]);

  const filteredVoices = useMemo(() => {
    return allVoices.filter((voice) => {
      const matchesSearch = searchQuery
        ? voice.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          voice.description
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          voice.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
          voice.type.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      const matchesFavorites = favoriteVoicesOnly ? voice.favorite : true;

      let matchesTypeGender = true;
      if (filterType === "gender" && filterValue) {
        matchesTypeGender =
          voice.gender.toLowerCase() === filterValue.toLowerCase();
      } else if (filterType === "type" && filterValue) {
        matchesTypeGender =
          voice.type.toLowerCase() === filterValue.toLowerCase();
      }

      return matchesSearch && matchesFavorites && matchesTypeGender;
    });
  }, [allVoices, searchQuery, filterType, filterValue, favoriteVoicesOnly]);

  const toggleFavorite = (voice: Voice) => {
    console.log("Toggle favorite for voice:", voice.name);
    // Here you would implement the actual favorite toggling logic
    // This would likely involve an API call or state update
  };

  return {
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    filterValue,
    setFilterValue,
    favoriteVoicesOnly,
    setFavoriteVoicesOnly,
    genderOptions,
    typeOptions,
    filteredVoices,
    toggleFavorite,
  };
}
