import type { SVGProps } from "react";

import { poppins } from "~/app/fonts";

interface ButtonProps {
  label: string;
  type: "primary" | "secondary" | "accent" | "secondary-accent" | "custom";
  onClick: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  icon?: ({
    className,
    ...props
  }: SVGProps<SVGSVGElement>) => React.JSX.Element;
  fit?: boolean;
  height?: string; // Fixed typo from hight to height
  width?: string;
  disabled?: boolean;
  className?: string;
  iconPosition?: "left" | "right"; // Added missing prop
  iconColor?: string; // Added missing prop
}

const defaultStyle = `${poppins.className} rounded-md py-[12px] px-[24px] flex items-center justify-center text-center text-[16px]`;

const style: Record<string, string> = {
  primary:
    "bg-cp-primary text-white hover:bg-cp-primary/80 hover:shadow-md transition-all duration-300 disabled:bg-cp-primary/50 disabled:cursor-default",
  secondary:
    "bg-transparent border-2 border-cp-primary text-cp-primary hover:border-cp-primary/80 hover:text-cp-primary/80 hover:shadow-md transition-all duration-300 disabled:border-cp-primary/50 disabled:text-cp-primary/50 disabled:cursor-default",
  accent:
    "bg-cp-secondary text-white hover:bg-cp-secondary-light hover:shadow-md transition-all duration-300 disabled:bg-cp-secondary-lightest disabled:cursor-default disabled:hover:shadow-none",
  "secondary-accent":
    "bg-transparent border-2 border-cp-secondary text-cp-secondary hover:border-cp-secondary/80 hover:text-cp-secondary/80 hover:shadow-md transition-all duration-300 disabled:border-cp-secondary/50 disabled:text-cp-secondary/50 disabled:cursor-default",
  custom: "", // Added placeholder for custom type
};

export default function Button({
  label,
  type,
  onClick,
  icon: Icon,
  iconPosition = "right", // Default value
  iconColor = "#0066FF", // Default value
  fit = false,
  height = "h-[48px]", // Fixed typo and added default value
  width = "w-auto",
  disabled = false,
  className = "",
}: ButtonProps) {
  const fontWeight = type !== "custom" ? "font-semibold" : "";

  return (
    <button
      className={`${defaultStyle} ${fontWeight} ${style[type]} ${height} ${
        fit ? "w-full" : ""
      } ${className} ${!fit && !className?.includes("w-") ? width : ""}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={label} // Added accessibility
    >
      {iconPosition === "left" && Icon && (
        <Icon
          className={`mr-2 h-[20px] w-[20px]`}
          color={type === "custom" ? iconColor : ""}
        />
      )}
      {label}
      {iconPosition === "right" && Icon && (
        <Icon
          className={`ml-2 h-[20px] w-[20px]`}
          color={type === "custom" ? iconColor : ""}
        />
      )}
    </button>
  );
}
