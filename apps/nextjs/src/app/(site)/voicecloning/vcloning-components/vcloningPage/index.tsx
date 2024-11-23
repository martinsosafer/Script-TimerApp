"use client";

import * as React from "react";

import NoSessionModal from "~/app/(site)/components/modals/no-session-modal";
import { api } from "~/utils/api";
import CustomVoiceCards from "../cloningCard";
import VoiceCloningForm from "../cloningForm";

export default function VoiceCloningPage({
  subData,
}: {
  subData: SubscriptionData | null | undefined;
}) {
  // Use the query hook directly inside the functional component
  const { data: customVoices = [], refetch } =
    api.voiceCustom.listAllCustomVoices.useQuery("", {
      refetchOnWindowFocus: true,
    });
  const [openNoSessionModal, setOpenNoSessionModal] =
    React.useState<boolean>(false);

  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center">
      <main className="flex w-full flex-col items-center px-4 text-center">
        <hr className="border-1 mb-4 bg-gray-700 dark:bg-gray-700" />
        <VoiceCloningForm
          onVoiceCreated={refetch}
          subData={subData}
          setOpenNoSessionModal={() => setOpenNoSessionModal(true)}
        />
        {openNoSessionModal && (
          <NoSessionModal
            page="clone"
            openModal={openNoSessionModal}
            setOpenModal={setOpenNoSessionModal}
            subData={subData}
          />
        )}
      </main>
      <div className="mb-4 mt-4">
        <CustomVoiceCards customVoices={customVoices} refetch={refetch} />
      </div>
    </div>
  );
}
