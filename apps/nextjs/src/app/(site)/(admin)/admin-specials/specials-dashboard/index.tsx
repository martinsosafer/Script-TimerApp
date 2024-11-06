"use client";

import { useState } from "react";

import { IconPencilLine, IconTrash } from "@voiceai/ui/@/components/ui/icons";

import AdminSpecialModal from "~/app/(site)/components/modals/admin-special-modal";
import DeleteSpecialModal from "~/app/(site)/components/modals/delete-special";
import { api } from "~/utils/api";
import { deleteSpecial } from "../actions";
import type { MonthlySpecial } from "../types";

export default function SpecialsDashboard() {
  const [selectedSpecial, setSelectedSpecial] = useState<
    MonthlySpecial | undefined
  >(undefined);
  const [specialModalOpen, setSpecialModalOpen] = useState(false);
  const [isDeletingSpecial, setIsDeletingSpecial] = useState(false);

  const {
    data: allSpecials,
    isLoading,
    isError,
    refetch,
  } = api.specials.listAllSpecials.useQuery();

  return (
    <>
      <div className="mb-20 flex w-[1200px] flex-col items-center">
        <h2 className="mt-10 text-2xl font-bold text-primary">
          Monthly Specials Dashboard
        </h2>

        <button
          className="mt-8 rounded-sm bg-primary p-2 text-lg text-white"
          onClick={() => setSpecialModalOpen(true)}
        >
          <span className="text-xl">+</span> Add a New Special
        </button>
        <div className="mt-8 w-full">
          {isLoading && <div>Loading...</div>}
          {isError && <div>Error fetching data</div>}
          {allSpecials && allSpecials.length === 0 && (
            <div>No specials found</div>
          )}
          {allSpecials && allSpecials.length > 0 && (
            <div className="mb-2 flex w-full text-lg">
              <div className="w-[20%] p-1 font-bold">Name</div>
              <div className="w-[30%] p-1 font-bold">Description</div>
              <div className="w-[10%] p-1 font-bold">Pages</div>
              <div className="w-[10%] p-1 font-bold">Promo code</div>
              <div className="w-[10%] p-1 font-bold">Start Date</div>
              <div className="w-[10%] p-1 font-bold">End Date</div>
              <div className="w-[10%] p-1 text-center font-bold">Actions</div>
            </div>
          )}

          {allSpecials?.map((special) => (
            <div key={special.id} className="flex w-full">
              <div className="w-[20%] border border-gray-300 p-2">
                {special.name}
              </div>
              <div className="w-[30%] border border-gray-300 p-2">
                {special.description}
              </div>
              <div className="w-[10%] border border-gray-300 p-2">
                {special.pages_display}
              </div>
              <div className="w-[10%] border border-gray-300 p-2">
                {special.promo_code}
              </div>
              <div className="w-[10%] border border-gray-300 p-2">
                {special.start_date}
              </div>
              <div className="w-[10%] border border-gray-300 p-2">
                {special.end_date}
              </div>
              <div className="flex w-[10%] justify-around p-2">
                <button
                  onClick={() => {
                    setSelectedSpecial(special as MonthlySpecial);
                    setSpecialModalOpen(true);
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-white"
                >
                  <IconPencilLine className="h-6 w-6" />
                </button>
                <button
                  onClick={() => {
                    setSelectedSpecial(special as MonthlySpecial);
                    setIsDeletingSpecial(true);
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
      {specialModalOpen && (
        <AdminSpecialModal
          onClose={() => {
            setSelectedSpecial(undefined);
            setSpecialModalOpen(false);
          }}
          special={selectedSpecial}
          refetch={refetch}
        />
      )}
      {isDeletingSpecial && (
        <DeleteSpecialModal
          onClose={() => setIsDeletingSpecial(false)}
          onConfirm={async () => {
            if (selectedSpecial) {
              await deleteSpecial(selectedSpecial.id);
              await refetch();
              setIsDeletingSpecial(false);
            }
          }}
        />
      )}
    </>
  );
}
