import { poppins, roboto } from "~/app/fonts";
import Grader from "./grader";

export default function GradeLevelge() {
  return (
    <div className="flex w-[1024px] flex-col items-center px-[40px]">
      <div className="my-[40px] flex w-full flex-col items-start">
        <h2
          className={`${poppins.className} text-cp-primary text-[28px] font-bold`}
        >
          Hemingway
        </h2>
        <p className={`${roboto.className} mt-[8px] text-[18px] font-normal`}>
          Your script's grade level
        </p>
      </div>
      <Grader />
    </div>
  );
}
