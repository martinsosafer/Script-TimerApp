import type { Metadata } from "next";

import { History } from "../../_components/history";

export const metadata: Metadata = {
  title: "History",
  description: "Example music app using the components.",
};

export default function HistoryPage() {
  return (
    <>
      <div className="col-span-3 lg:col-span-4 lg:border-l">
        <div className="h-full px-4 py-6 lg:px-8">
          <History />
        </div>
      </div>
    </>
  );
}
