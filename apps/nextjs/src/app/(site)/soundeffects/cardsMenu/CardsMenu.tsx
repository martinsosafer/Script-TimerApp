import { poppins } from "~/app/fonts";
import type { Blob } from "../types";

interface CardsMenuProps {
  data:
    | {
        type: string;
        sounds: Blob[];
      }[]
    | undefined;
  icons: JSX.Element[];
}

const CardsMenu = ({ data, icons }: CardsMenuProps) => {
  return (
    <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(160px,1fr))] justify-items-center gap-x-5 gap-y-10 py-3 max-sm:grid-cols-[repeat(auto-fill,minmax(140px,1fr))] max-sm:gap-x-2 max-sm:gap-y-6">
      {data?.map((section, i) => (
        <div
          key={i}
          className="flex h-[108px] w-[140px] flex-col items-center justify-between rounded-lg p-3 shadow-md"
        >
          <i>{icons[i]}</i>
          <p className={`${poppins.className} text-sm font-bold capitalize`}>
            {section.type}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CardsMenu;
