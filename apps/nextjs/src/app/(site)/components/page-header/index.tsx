import type { ReactElement } from "react";

import { poppins } from "~/app/fonts";

export default function PageHeader({
  title,
  subtitle,
  padding = "",
}: {
  title: string;
  subtitle: string | ReactElement;
  padding?: string;
}) {
  return (
    <header
      className={`mb-[40px] mt-[60px] flex flex-col items-center justify-center ${padding} ${poppins.className}`}
    >
      <h2 className="text-cp-primary w-[650px] text-center text-[42px] font-bold">
        {title}
      </h2>
      <h4 className="mt-[12px] w-[650px] text-center text-[16px]">
        {subtitle}
      </h4>
    </header>
  );
}
