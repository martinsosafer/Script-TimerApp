import type { SVGProps } from "react";

import { poppins, roboto } from "~/app/fonts";

interface ServiceCardProps {
  title: string;
  description: string;
  Icon: ({ className, ...props }: SVGProps<SVGSVGElement>) => React.JSX.Element;
}

export default function ServiceCard({
  title,
  description,
  Icon,
}: ServiceCardProps) {
  return (
    <div className="flex h-[125px] w-[417px] items-center rounded-lg bg-white px-[28px] py-[15px] shadow-md">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <Icon
          className="text-cp-secondary h-[70px] w-[70px]"
          strokeWidth={"1"}
        />
      </div>
      <div className="ml-3 flex flex-col">
        <h3
          className={`${poppins.className} text-cp-primary text-xl font-bold`}
        >
          {title}
        </h3>
        <p className={`${roboto.className} text-base text-black`}>
          {description}
        </p>
      </div>
    </div>
  );
}
