import { useState } from "react";

import { IconPencilLine, IconSpinner } from "@voiceai/ui/@/components/ui/icons";

import {
  addSpecial,
  updateSpecial,
} from "~/app/(site)/(admin)/admin-specials/actions";
import type { MonthlySpecial } from "~/app/(site)/(admin)/admin-specials/types";

interface ModalProps {
  onClose: () => void;
  special?: MonthlySpecial;
  refetch: () => void;
}

const pages = [
  "ALL",
  "VOICE",
  "CHAT",
  "IMAGES",
  "PLAGIARISM",
  "UNIVERSITY",
  "PLANS",
];

export default function AdminSpecialModal({
  onClose,
  special,
  refetch,
}: ModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (special) {
      await updateSpecial(form, special.id);
      refetch();
      return onClose();
    }
    await addSpecial(form);
    refetch();
    onClose();
    setIsLoading(false);
  }

  const [isActive, setIsActive] = useState(
    special ? special.is_active : "active",
  );

  if (special) {
    console.log(
      new Date(special.start_date).toISOString() <=
        new Date(special.end_date).toISOString(),
    );
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur">
      <div className="flex flex-col items-center justify-between rounded-lg bg-white p-4">
        <h2 className="flex w-full items-center gap-2 text-xl font-semibold text-gray-800">
          {" "}
          <IconPencilLine /> Add or Edit Monthly Special
        </h2>
        <form className="flex flex-col gap-2 p-2" onSubmit={handleSubmit}>
          <div className="flex w-full gap-2">
            <div className="flex w-[300px] flex-col gap-2">
              <label htmlFor="name" className="text-sm font-semibold">
                Monthly special name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={special?.name}
                placeholder={"Monthly Special Name"}
                className="w-full rounded-md border-2 border-primary p-2"
              />
              <label htmlFor="description" className="text-sm font-semibold">
                Special description
              </label>
              <textarea
                name="description"
                defaultValue={special?.description}
                placeholder={"Special Description"}
                rows={4}
                className="w-full rounded-md border-2 border-primary p-2"
              />
              <label htmlFor="pages_diplay" className="text-sm font-semibold">
                Display on pages:
              </label>
              <select
                name="pages_display"
                defaultValue={special?.pages_display}
                className="w-full rounded-md border-2 border-primary p-2"
              >
                <option value="" hidden>
                  Select a page to display
                </option>
                {pages.map((page) => (
                  <option key={page} value={page}>
                    {page}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex w-[500px] flex-col gap-2">
              <label htmlFor="promo_code" className="text-sm font-semibold">
                Promo Code
              </label>
              <input
                type="text"
                name="promo_code"
                defaultValue={special?.promo_code}
                placeholder={"Promo Code"}
                className="w-full rounded-md border-2 border-primary p-2"
              />
              <label htmlFor="link" className="text-sm font-semibold">
                Link
              </label>
              <input
                type="text"
                name="link"
                defaultValue={special?.link}
                placeholder={"Link"}
                className="w-full rounded-md border-2 border-primary p-2"
              />
              <label htmlFor="name" className="text-sm font-semibold">
                Start Date
              </label>
              <input
                type="date"
                name="start_date"
                defaultValue={special?.start_date}
                placeholder={"Promo Start Date"}
                className="w-full rounded-md border-2 border-primary p-2"
              />
              <label htmlFor="name" className="text-sm font-semibold">
                End Date
              </label>
              <input
                type="date"
                name="end_date"
                defaultValue={special?.end_date}
                placeholder={"Promo End Date"}
                className="w-full rounded-md border-2 border-primary p-2"
              />
              <div className="mt-2 flex items-center gap-2">
                <label htmlFor="name" className="text-sm font-semibold">
                  Is Active
                </label>
                <input
                  type="checkbox"
                  name="is_active"
                  value={isActive}
                  onChange={(e) =>
                    setIsActive(e.target.checked ? "active" : "inactive")
                  }
                  checked={isActive === "active"}
                  className="rounded-md border-2 border-primary p-2"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              className="rounded-md bg-gray-500 px-4 py-3 text-white hover:opacity-80"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="flex w-[140px] items-center justify-center rounded-md bg-primary px-4 py-3 text-white hover:opacity-80"
              type="submit"
            >
              {isLoading ? (
                <IconSpinner className="h-6 w-6 animate-spin" />
              ) : special ? (
                "Edit Special"
              ) : (
                "Save Special"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
