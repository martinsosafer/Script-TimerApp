import { useState } from "react";

import { IconPencilLine, IconSpinner } from "@voiceai/ui/@/components/ui/icons";

import {
  addLanding,
  updateLanding,
} from "~/app/(site)/(admin)/admin-landings/actions";
import type { LandingPage } from "~/app/(site)/(admin)/admin-landings/types";

interface ModalProps {
  onClose: () => void;
  landing?: LandingPage;
  refetch: () => void;
}

export default function AdminLandingModal({
  onClose,
  landing,
  refetch,
}: ModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [type, setType] = useState<"regular" | "tools" | "saasy">(
    landing?.type ?? "regular",
  );

  const [previewValues, setPreviewValues] = useState({
    title: landing?.title ?? "",
    description: landing?.description ?? "",
    type: landing?.type ?? "regular",
    segment: landing?.segment ?? "",
    videoUrl: landing?.video_url ?? "",
    isActive: landing?.is_active ?? "",
  });

  const [previewLanding, setPreviewLanding] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      title: form.get("title") as string,
      description: form.get("description") as string,
      segment: form.get("segment") as string,
      type,
      video_url: form.get("videoUrl") as string,
      is_active: isActive,
    };

    if (landing) {
      await updateLanding(payload, landing.id!);
      refetch();
      return onClose();
    }
    await addLanding(payload);
    refetch();
    onClose();
    setIsLoading(false);
  }

  const [isActive, setIsActive] = useState(
    landing ? landing.is_active : "active",
  );

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur">
      <div className="relative flex flex-col items-center justify-between rounded-lg bg-white p-4">
        <h2 className="flex w-full items-center gap-2 text-xl font-semibold text-gray-800">
          {" "}
          <IconPencilLine /> Add or Edit Langing Page
        </h2>
        <form className="flex flex-col gap-2 p-2" onSubmit={handleSubmit}>
          <div className="flex w-full gap-2">
            <div className="flex w-[300px] flex-col gap-2">
              <label htmlFor="type" className="text-sm font-semibold">
                Langing Type
              </label>
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value as "regular" | "tools" | "saasy");
                  setPreviewValues({
                    ...previewValues,
                    type: e.target.value as "regular" | "tools" | "saasy",
                  });
                }}
                className="rounded-md border border-gray-300 p-2"
              >
                <option value="regular">Regular</option>
                <option value="toole">Tools</option>
                <option value="saasy">Saasy</option>
              </select>
              <label htmlFor="name" className="text-sm font-semibold">
                Landing Page Title
              </label>
              <input
                type="text"
                name="title"
                defaultValue={landing?.title}
                placeholder="Landing title"
                className="w-full rounded-md border-2 border-primary p-2"
                maxLength={30}
                onChange={(e) =>
                  setPreviewValues({ ...previewValues, title: e.target.value })
                }
              />
              <label htmlFor="description" className="text-sm font-semibold">
                Landing description
              </label>
              <textarea
                name="description"
                defaultValue={landing?.description}
                placeholder="Landind Description or Subtitle"
                rows={4}
                className="w-full rounded-md border-2 border-primary p-2"
                maxLength={120}
                onChange={(e) =>
                  setPreviewValues({
                    ...previewValues,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex w-[500px] flex-col gap-2">
              <label htmlFor="voideoUrl" className="text-sm font-semibold">
                URL Segment
              </label>
              <input
                type="text"
                name="segment"
                defaultValue={landing?.segment ?? undefined}
                placeholder="URL segment"
                className="w-full rounded-md border-2 border-primary p-2"
                onChange={(e) =>
                  setPreviewValues({
                    ...previewValues,
                    segment: e.target.value,
                  })
                }
              />
              <label htmlFor="videoUrl" className="text-sm font-semibold">
                Video URL
              </label>
              <input
                type="text"
                name="videoUrl"
                defaultValue={landing?.video_url ?? undefined}
                placeholder="Video URL"
                className="w-full rounded-md border-2 border-primary p-2"
                onChange={(e) =>
                  setPreviewValues({
                    ...previewValues,
                    videoUrl: e.target.value,
                  })
                }
              />
              <div className="mt-2 flex items-center gap-2">
                <label htmlFor="isActive" className="text-sm font-semibold">
                  Is Active
                </label>
                <input
                  type="checkbox"
                  name="isActive"
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
              className="flex items-center justify-center rounded-md bg-primary px-4 py-3 text-white hover:opacity-80"
              type="submit"
            >
              {isLoading ? (
                <IconSpinner className="h-6 w-6 animate-spin" />
              ) : landing ? (
                "Edit Landing Page"
              ) : (
                "Save Landing Page"
              )}
            </button>
          </div>
        </form>
        <button
          className="text-cp-primary border-cp-primary absolute bottom-5 rounded-md border bg-white px-4 py-3 hover:opacity-80"
          onClick={() => {
            setPreviewLanding(true);
          }}
        >
          Preview
        </button>
      </div>

      {/* {previewLanding && (
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
      )} */}
    </div>
  );
}
