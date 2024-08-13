"use client";

import { useParams } from "next/navigation";

import CloneBoard from "~/app/_components/cloneboard";
import Voiceboard from "~/app/_components/voiceboard";
import { api } from "~/utils/api";

export default function AdminVoicePage() {
  const {
    data: allVoices,
    isLoading,
    isError,
  } = api.voiceCustom.listAllVoices.useQuery();
  console.log("allVoices", allVoices);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className=" mt-9">
      <CloneBoard voiceList={allVoices} />
    </div>
  );
}
