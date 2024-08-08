"use client";

import { useParams } from "next/navigation";

import Dashboard from "~/app/_components/dashboard";
import Voiceboard from "~/app/_components/voiceboard";
import { api } from "~/utils/api";

export default function AdminVoicePage() {
  const {
    data: allVoices,
    isLoading,
    isError,
  } = api.voice.listAllVoices.useQuery({ name: "" });
  console.log("allVoices", allVoices);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className=" mt-9">
      <Voiceboard voiceList={allVoices} />
    </div>
  );
}
