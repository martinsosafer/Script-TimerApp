import type { Dispatch, SetStateAction } from "react";

interface ToogleProps {
  period: "monthly" | "yearly";
  setPeriod: Dispatch<SetStateAction<"monthly" | "yearly">>;
}

const style = {
  active:
    "bg-cp-primary text-white w-[50%] rounded-sm flex items-center justify-center",
  inactive:
    "bg-white text-cp-primary w-[50%] rounded-sm flex items-center justify-center",
};

export default function MonthlyYearlyToogle({
  period,
  setPeriod,
}: ToogleProps) {
  return (
    <div
      className={
        "border-cp-primary mt-[68px] flex h-[48px] w-[314px] rounded-md border-2 bg-white p-1 text-[16px]"
      }
    >
      <button
        className={period === "monthly" ? style.active : style.inactive}
        onClick={() => setPeriod("monthly")}
      >
        Monthly
      </button>
      <button
        className={period === "yearly" ? style.active : style.inactive}
        onClick={() => setPeriod("yearly")}
      >
        Yearly
      </button>
    </div>
  );
}
