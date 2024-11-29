import type { SVGProps } from "react";

import { poppins } from "~/app/fonts";

interface ButtonProps {
  label: string;
  type: "primary" | "secondary" | "accent" | "custom";
  onClick: () => void;
  icon?: (props: SVGProps<SVGSVGElement>) => React.JSX.Element;
  iconPosition?: "left" | "right";
  iconColor?: string;
  fit?: boolean;
  hight?: string;
  width?: string;
  disabled?: boolean;
  className?: string;
}

const defaultStyle = `${poppins.className} rounded-md py-[12px] px-[24px] flex items-center justify-center text-center text-[16px]`;

const style: Record<string, string> = {
  primary:
    "bg-cp-primary text-white hover:bg-cp-primary/80 hover:shadow-md transition-all duration-300 disabled:bg-cp-primary/50 disabled:cursor-default",
  secondary:
    "bg-white border-2 border-cp-primary text-cp-primary hover:border-cp-primary/80 hover:text-cp-primary/80 hover:shadow-md transition-all duration-300 disabled:border-cp-primary/50 disabled:text-cp-primary/50 disabled:cursor-default",
  accent:
    "bg-cp-secondary text-white hover:bg-cp-secondary-light hover:shadow-md transition-all duration-300 disabled:bg-cp-secondary-lightest disabled:cursor-default disabled:hover:shadow-none",
  custom: "",
};

export default function Button({
  label,
  type,
  onClick,
  icon: Icon,
  iconPosition = "right",
  iconColor = "#0066FF",
  fit = false,
  hight = "h-[48px]",
  width = "w-auto",
  disabled = false,
  className = "",
}: ButtonProps) {
  const appliedIconColor = type === "custom" && iconColor ? iconColor : "";
  const fontWeight = type !== "custom" ? "font-semibold" : "";

  return (
    <button
      className={`${defaultStyle} ${fontWeight} ${style[type]} ${fit ? "w-full" : width} ${hight} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {iconPosition === "left" && Icon && (
        <Icon
          className={`mr-2 h-[20px] w-[20px] ${appliedIconColor ? appliedIconColor : ""}`}
          color={appliedIconColor}
        />
      )}
      {label}
      {iconPosition === "right" && Icon && (
        <Icon
          className={`ml-2 h-[20px] w-[20px] ${appliedIconColor ? appliedIconColor : ""}`}
          color={appliedIconColor}
        />
      )}
    </button>
  );
}
