import { poppins, roboto } from "~/app/fonts";
import TimeCalculator from "./timeCalculator";

export default function ScriptTimer() {
  return (
    <div className="flex w-[1024px] flex-col items-center px-[40px]">
      <div className="my-[40px] flex w-full flex-col items-start">
        <h2
          className={`${poppins.className} text-cp-primary text-[28px] font-bold`}
        >
          Script Timer
        </h2>
        <p className={`${roboto.className} mt-[8px] text-[18px] font-normal`}>
          Co-Producer instantly estimates your script time in minutes and
          seconds
        </p>
      </div>
      <TimeCalculator />
    </div>
  );
}
