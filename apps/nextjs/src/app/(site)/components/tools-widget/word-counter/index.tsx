import { poppins, roboto } from "~/app/fonts";
import Counter from "./counter";

export default function WordsCounter() {
  return (
    <div className="flex w-full flex-col items-center lg:w-[1024px] lg:px-10">
      <div className="my-6 flex w-full flex-col items-start lg:my-10">
        <h2
          className={`${poppins.className} text-cp-primary text-[22px] font-bold lg:text-[28px]`}
        >
          Word & Character Counter
        </h2>
        <p
          className={`${roboto.className} mt-[8px] text-[14px] font-normal lg:text-[18px]`}
        >
          Get an accurate word count of your text with our easy-to-use word
          counter tool.
        </p>
      </div>
      <Counter />
    </div>
  );
}
