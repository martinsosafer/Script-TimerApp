import { useState } from "react";
import Select from "react-select";

import { IconPencilLine, IconSpinner } from "@voiceai/ui/@/components/ui/icons";

import {
  addSpecial,
  updateSpecial,
} from "~/app/(site)/(admin)/admin-specials/actions";
import type {
  MonthlySpecial,
  Page,
} from "~/app/(site)/(admin)/admin-specials/types";

interface ModalProps {
  onClose: () => void;
  special?: MonthlySpecial;
  refetch: () => void;
}

const pageOptions = [
  { value: "ALL", label: "ALL" },
  { value: "VOICE", label: "VOICE" },
  { value: "CHAT", label: "CHAT" },
  { value: "IMAGES", label: "IMAGES" },
  { value: "PLAGIARISM", label: "PLAGIARISM" },
  { value: "UNIVERSITY", label: "UNIVERSITY" },
  { value: "PLANS", label: "PLANS" },
];

export default function AdminSpecialModal({
  onClose,
  special,
  refetch,
}: ModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pages, setPages] = useState<Page[]>(special?.pages_display ?? []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name") as string,
      description: form.get("description") as string,
      pages_display: pages,
      promo_code: form.get("promo_code") as string,
      link: form.get("link") as string,
      start_date: form.get("start_date") as string,
      end_date: form.get("end_date") as string,
      is_active: isActive,
    };

    if (special) {
      await updateSpecial(payload, special.id!);
      refetch();
      return onClose();
    }
    await addSpecial(payload);
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
              <Select
                options={pageOptions as any}
                isMulti
                defaultValue={() =>
                  special
                    ? special.pages_display.map((page) => ({
                        value: page,
                        label: page,
                      }))
                    : []
                }
                onChange={(option) => {
                  const selectedPages = option.map((opt) => opt.value);
                  setPages(selectedPages);
                }}
              />
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
                defaultValue={special?.link ?? undefined}
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
