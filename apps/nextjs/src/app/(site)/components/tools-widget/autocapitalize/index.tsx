import { poppins, roboto } from "~/app/fonts";
import Capitalizer from "./capitalizer";

export default function AutoCapitalize() {
  return (
    <div className="flex w-[1024px] flex-col items-center px-[40px]">
      <div className="my-[40px] flex w-full flex-col items-start">
        <h2
          className={`${poppins.className} text-cp-primary text-[28px] font-bold`}
        >
          Autocapitalize Sentences
        </h2>
        <p className={`${roboto.className} mt-[8px] text-[18px] font-normal`}>
          Easily capitalize every sentence in your script with our hassle-free
          tool. No more tedious manual editing!
        </p>
      </div>
      <Capitalizer />
    </div>
  );
}
