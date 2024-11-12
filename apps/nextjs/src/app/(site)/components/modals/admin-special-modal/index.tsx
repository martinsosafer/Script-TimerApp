import { useState } from "react";
import Select from "react-select";

import { IconPencilLine, IconSpinner } from "@voiceai/ui/@/components/ui/icons";

import {
  addSpecial,
  updateSpecial,
} from "~/app/(site)/(admin)/admin-specials/actions";
import type {
  Page,
  MonthlySpecial as Special,
} from "~/app/(site)/(admin)/admin-specials/types";
import MonthlySpecial from "../../monthySpecial";

interface ModalProps {
  onClose: () => void;
  special?: Special;
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
  const [type, setType] = useState<"promo" | "announcement">(
    special?.type ?? "promo",
  );

  const [previewValues, setPreviewValues] = useState({
    name: special?.name ?? "",
    description: special?.description ?? "",
    type: special?.type ?? "promo",
    promoCode: special?.promo_code ?? "",
    link: special?.link ?? "",
  });
  const [previewSpecial, setPreviewSpecial] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name") as string,
      description: form.get("description") as string,
      type,
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

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur">
      <div className="relative flex flex-col items-center justify-between rounded-lg bg-white p-4">
        <h2 className="flex w-full items-center gap-2 text-xl font-semibold text-gray-800">
          {" "}
          <IconPencilLine /> Add or Edit Monthly Special
        </h2>
        <form className="flex flex-col gap-2 p-2" onSubmit={handleSubmit}>
          <div className="flex w-full gap-2">
            <div className="flex w-[300px] flex-col gap-2">
              <label htmlFor="type" className="text-sm font-semibold">
                Special Type
              </label>
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value as "promo" | "announcement");
                  setPreviewValues({
                    ...previewValues,
                    type: e.target.value as "promo" | "announcement",
                  });
                }}
                className="rounded-md border border-gray-300 p-2"
              >
                <option value="promo">Promo</option>
                <option value="announcement">Announcement</option>
              </select>
              <label htmlFor="name" className="text-sm font-semibold">
                Monthly special name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={special?.name}
                placeholder={"Monthly Special Name"}
                className="w-full rounded-md border-2 border-primary p-2"
                maxLength={30}
                onChange={(e) =>
                  setPreviewValues({ ...previewValues, name: e.target.value })
                }
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
                maxLength={50}
                onChange={(e) =>
                  setPreviewValues({
                    ...previewValues,
                    description: e.target.value,
                  })
                }
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
              {type === "promo" && (
                <>
                  <label htmlFor="promo_code" className="text-sm font-semibold">
                    Promo Code
                  </label>
                  <input
                    type="text"
                    name="promo_code"
                    defaultValue={special?.promo_code ?? undefined}
                    placeholder={"Promo Code"}
                    className="w-full rounded-md border-2 border-primary p-2"
                    maxLength={8}
                    onChange={(e) =>
                      setPreviewValues({
                        ...previewValues,
                        promoCode: e.target.value,
                      })
                    }
                  />
                </>
              )}

              <label htmlFor="link" className="text-sm font-semibold">
                Link
              </label>
              <input
                type="text"
                name="link"
                defaultValue={special?.link ?? undefined}
                placeholder={"Link"}
                className="w-full rounded-md border-2 border-primary p-2"
                onChange={(e) =>
                  setPreviewValues({ ...previewValues, link: e.target.value })
                }
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
        <button
          className="text-cp-primary border-cp-primary absolute bottom-5 rounded-md border bg-white px-4 py-3 hover:opacity-80"
          onClick={() => {
            setPreviewSpecial(true);
          }}
        >
          Preview
        </button>
      </div>

      {previewSpecial && (
        <div className="mt-4 w-full">
          <MonthlySpecial
            description={previewValues.description}
            name={previewValues.name}
            link={previewValues.link}
            onClose={() => setPreviewSpecial(false)}
            promo_code={previewValues.promoCode}
            type={previewValues.type as "promo" | "announcement"}
          />
        </div>
      )}
    </div>
  );
}
