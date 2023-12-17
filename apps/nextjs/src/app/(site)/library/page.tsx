import type { Metadata } from "next";

import { Library } from "./library";

export const metadata: Metadata = {
  title: "Library",
  description: "Example music app using the components.",
};

export default function LibraryPage() {
  return (
    <>
      <Library />
    </>
  );
}
