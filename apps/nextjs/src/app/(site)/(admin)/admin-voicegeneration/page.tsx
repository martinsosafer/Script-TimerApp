"use client";

import { api } from "~/utils/api";
import VoiceGenerationDashboard from "./generationDashboard";

export default function VoiceGenerationPage() {
  const {
    data: generationList,
    isLoading,
    isError,
    refetch,
  } = api.user.voiceGenerationUsage.useQuery();

  if (isLoading) {
    return <div>Loading voice generation data...</div>;
  }

  if (isError || !generationList) {
    return <div>Error fetching voice generation data</div>;
  }

  return (
    <VoiceGenerationDashboard
      generationList={generationList}
      refetch={refetch}
    />
  );
}
