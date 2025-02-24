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
      className={`my-3 flex w-full flex-col items-center justify-center p-6 lg:mb-[40px] lg:mt-[60px] lg:p-0 ${padding} ${poppins.className}`}
    >
      <h2 className="text-cp-primary w-full text-center text-[28px] font-bold lg:w-[650px] lg:text-[42px]">
        {title}
      </h2>
      <h4 className="mt-[12px] w-full text-center text-[14px] lg:w-[650px] lg:text-[16px]">
        {subtitle}
      </h4>
    </header>
  );
}
