import { poppins, roboto } from "~/app/fonts";
import WordsSorter from "./wordsSorter";

export default function WordsSorterPage() {
  return (
    <div className="flex w-[1024px] flex-col items-center px-[40px]">
      <div className="my-[40px] flex w-full flex-col items-start">
        <h2
          className={`${poppins.className} text-cp-primary text-[28px] font-bold`}
        >
          Sort Words in alphabetical order
        </h2>
        <p className={`${roboto.className} mt-[8px] text-[18px] font-normal`}>
          Sort your words in alphabetical order quickly and easily
        </p>
      </div>
      <WordsSorter />
    </div>
  );
}
