"use client";

import { useState } from "react";

import { IconPencilLine, IconTrash } from "@voiceai/ui/@/components/ui/icons";

import AdminLandingModal from "~/app/(site)/components/modals/admin-landings-modal";
import DeletePromptModal from "~/app/(site)/components/modals/delete-prompt";
import { api } from "~/utils/api";
import { deleteLanding } from "../actions";
import type { LandingPage } from "../types";

export default function LandingsDashboard() {
  const [landingModalOpen, setLandingModalOpen] = useState(false);
  const [selectedLanding, setSelectedLanding] = useState<
    LandingPage | undefined
  >();
  const [isDeletingPrompt, setIsDeletingPrompt] = useState(false);

  const {
    data: allLandings,
    isLoading,
    isError,
    refetch,
  } = api.landings.listAllLandings.useQuery();

  return (
    <>
      <div className="mb-20 flex w-[1200px] flex-col items-center">
        <h2 className="text-2xl font-bold text-primary">Landings Dashboard</h2>
        <button
          className="mt-8 rounded-sm bg-primary p-2 text-lg text-white"
          onClick={() => setLandingModalOpen(true)}
        >
          <span className="text-xl">+</span> Add a New Landing Page
        </button>
        <div className="mt-8 translate-x-[340px] lg:translate-x-0">
          {isLoading && <div>Loading...</div>}
          {isError && <div>Error fetching data</div>}
          {allLandings && allLandings.length === 0 && (
            <div>No landing pages found</div>
          )}
          {allLandings && allLandings.length > 0 && (
            <div>
              <div className="mb-2 flex w-[1024px] text-lg">
                <div className="w-[240px] p-1 font-bold">Title</div>
                <div className="w-[400px] p-1 font-bold">Description</div>
                <div className="w-[240px] p-1 font-bold">Type</div>
                <div className="w-[140px] p-1 font-bold">Segment</div>
                <div className="w-[140px] p-1 text-center font-bold">
                  Actions
                </div>
              </div>
            </div>
          )}

          {allLandings?.map((landing) => (
            <div key={landing.id} className="flex w-[1024px]">
              <div className="w-[240px] border border-gray-300 p-1">
                {landing.title}
              </div>
              <div className="w-[400px] border border-gray-300 p-1">
                {landing.description}
              </div>
              <div className="w-[240px] border border-gray-300 p-1">
                {landing.lp_type}
              </div>
              <div className="w-[140px] border border-gray-300 p-1">
                {landing.segment}
              </div>
              <div className="flex w-[140px] justify-around p-2">
                <button
                  onClick={() => {
                    setSelectedLanding(landing as LandingPage);
                    setLandingModalOpen(true);
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-white"
                >
                  <IconPencilLine className="h-6 w-6" />
                </button>
                <button
                  onClick={() => {
                    setSelectedLanding(landing as LandingPage);
                    setIsDeletingPrompt(true);
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-md bg-red-500 text-white"
                >
                  <IconTrash className="h-6 w-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {landingModalOpen && (
        <AdminLandingModal
          onClose={() => {
            setSelectedLanding(undefined);
            setLandingModalOpen(false);
          }}
          landing={selectedLanding}
          refetch={refetch}
        />
      )}
      {isDeletingPrompt && (
        <DeletePromptModal
          onClose={() => setIsDeletingPrompt(false)}
          onConfirm={async () => {
            if (selectedLanding) {
              await deleteLanding(selectedLanding.id!);
              await refetch();
              setIsDeletingPrompt(false);
            }
          }}
        />
      )}
    </>
  );
}
