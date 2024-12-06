import type { SVGProps } from "react";

import { poppins } from "~/app/fonts";

interface ButtonProps {
  label: string;
  type: "primary" | "secondary" | "accent" | "secondary-accent";
  onClick: () => void;
  icon?: ({
    className,
    ...props
  }: SVGProps<SVGSVGElement>) => React.JSX.Element;
  fit?: boolean;
  hight?: string;
  disabled?: boolean;
  className?: string; // Add className prop here
}

const defaultStyle = `${poppins.className} rounded-md py-[12px] px-[24px] flex items-center justify-center text-center text-[16px] font-semibold`;

const style: Record<string, string> = {
  primary:
    "bg-cp-primary text-white f hover:bg-cp-primary/80 hover:shadow-md transition-all duration-300 disabled:bg-cp-primary/50 disabled:cursor-default",
  secondary:
    "bg-transparent border-2 border-cp-primary text-cp-primary hover:border-cp-primary/80 hover:text-cp-primary/80 hover:shadow-md transition-all duration-300 disabled:border-cp-primary/50 disabled:text-cp-primary/50 disabled:cursor-default",
  accent:
    "bg-cp-secondary text-white hover:bg-cp-secondary-light hover:shadow-md transition-all duration-300 disabled:bg-cp-secondary-lightest disabled:cursor-default disabled:hover:shadow-none",
  "secondary-accent":
    "bg-transparent border-2 border-cp-secondary text-cp-secondary hover:border-cp-secondary/80 hover:text-cp-secondary/80 hover:shadow-md transition-all duration-300 disabled:border-cp-secondary/50 disabled:text-cp-secondary/50 disabled:cursor-default",
};

export default function Button({
  label,
  type,
  onClick,
  icon: Icon,
  fit = false,
  hight = "h-[48px]",
  disabled = false,
  className = "",
}: ButtonProps) {
  return (
    <button
      className={`${defaultStyle} ${style[type]} ${fit ? "w-full" : ""} ${hight} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}{" "}
      {Icon && (
        <Icon
          className={`ml-2 h-[20px] w-[20px] ${type === "secondary" ? "text-cp-primary" : "text-white"}`}
        />
      )}
    </button>
  );
}
