import { roboto } from "~/app/fonts";

interface Option {
  label: string;
  active: boolean;
  action: () => void;
}

export default function Tabs({ options }: { options: Option[] }) {
  return (
    <div className="flex items-center ">
      {options.map((option, index) => {
        return (
          <button
            key={index}
            onClick={option.action}
            className={`h-[49px] min-w-[184px] p-[12px] text-[18px] ${roboto.className} ${option.active ? "text-cp-primary border-cp-primary border-b-2 font-bold" : "border-b border-[#6B7588] text-[#212121]"}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
