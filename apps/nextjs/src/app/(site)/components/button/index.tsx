import type { SVGProps } from "react";

import { poppins } from "~/app/fonts";

interface ButtonProps {
  label: string;
  type: "primary" | "secondary" | "accent";
  onClick: () => void;
  icon?: ({
    className,
    ...props
  }: SVGProps<SVGSVGElement>) => React.JSX.Element;
  fit?: boolean;
  hight?: string; // Height of the button
  width?: string; // New width prop
  disabled?: boolean;
  className?: string; // Additional custom classes
}

const defaultStyle = `${poppins.className} rounded-md py-[12px] px-[24px] flex items-center justify-center text-center text-[16px] font-semibold`;

const style: Record<string, string> = {
  primary:
    "bg-cp-primary text-white hover:bg-cp-primary/80 hover:shadow-md transition-all duration-300 disabled:bg-cp-primary/50 disabled:cursor-default",
  secondary:
    "bg-white border-2 border-cp-primary text-cp-primary hover:border-cp-primary/80 hover:text-cp-primary/80 hover:shadow-md transition-all duration-300 disabled:border-cp-primary/50 disabled:text-cp-primary/50 disabled:cursor-default",
  accent:
    "bg-cp-secondary text-white hover:bg-cp-secondary-light hover:shadow-md transition-all duration-300 disabled:bg-cp-secondary-lightest disabled:cursor-default disabled:hover:shadow-none",
};

export default function Button({
  label,
  type,
  onClick,
  icon: Icon,
  fit = false,
  hight = "h-[48px]",
  width = "w-auto", // Default width is set to auto
  disabled = false,
  className = "",
}: ButtonProps) {
  return (
    <button
      className={`${defaultStyle} ${style[type]} ${fit ? "w-full" : width} ${hight} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}{" "}
      {Icon && (
        <Icon
          className={`ml-2 h-[20px] w-[20px] ${
            type === "secondary" ? "text-cp-primary" : "text-white"
          }`}
        />
      )}
    </button>
  );
}
