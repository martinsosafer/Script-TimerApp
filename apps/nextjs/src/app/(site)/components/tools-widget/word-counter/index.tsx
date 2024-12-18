import { poppins, roboto } from "~/app/fonts";
import Counter from "./counter";

export default function WordsCounter() {
  return (
    <div className="flex w-[1024px] flex-col items-center px-[40px]">
      <div className="my-[40px] flex w-full flex-col items-start">
        <h2
          className={`${poppins.className} text-cp-primary text-[28px] font-bold`}
        >
          Word & Character Counter
        </h2>
        <p className={`${roboto.className} mt-[8px] text-[18px] font-normal`}>
          Get an accurate word count of your text with our easy-to-use word
          counter tool.
        </p>
      </div>
      <Counter />
    </div>
  );
}
