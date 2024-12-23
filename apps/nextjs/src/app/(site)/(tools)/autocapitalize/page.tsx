import { poppins, roboto } from "~/app/fonts";
import Capitalizer from "./capitalizer";

export default function AutoCapitalize() {
  return (
    <div className="flex w-full flex-col items-center lg:w-[1024px] lg:px-10">
      <div className="my-6 flex w-full flex-col items-start lg:my-10">
        <h2
          className={`${poppins.className} text-cp-primary text-[22px] font-bold lg:text-[28px]`}
        >
          Autocapitalize Sentences
        </h2>
        <p
          className={`${roboto.className} mt-[8px] text-[14px] font-normal lg:text-[18px]`}
        >
          Easily capitalize every sentence in your script with our hassle-free
          tool. No more tedious manual editing!
        </p>
      </div>
      <Capitalizer />
    </div>
  );
}
