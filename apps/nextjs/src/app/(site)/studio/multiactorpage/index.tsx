"use client";

import { api } from "~/utils/api";
import MultiActorVoice from "./multiactorvoice";

export default function MultiActorPage({ subData }) {
  // Use tRPC hooks for data fetching
  const { data: voicesData, isLoading: voicesLoading } =
    api.voice.publicVoices.useQuery();

  const isLoading = voicesLoading;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4">
      <MultiActorVoice allVoices={voicesData} subData={subData} />
    </div>
  );
}
