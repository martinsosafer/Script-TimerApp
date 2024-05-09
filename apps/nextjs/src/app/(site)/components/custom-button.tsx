import type { MouseEvent, ReactNode } from "react";
import React from "react";

interface ButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  color?: string;
  type?: string;
}

const CustomButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  color = "orange",
  type = "primary",
}) => {
  // Define colors based on the type
  const colors = {
    primary: {
      background: `bg-${color}-400`,
      hoverBackground: `hover:bg-${color}-300`,
      text: "text-primary-foreground",
    },
    secondary: {
      background: `bg-gradient-to-r from-${color}-300 to-${color}-500`,
      hoverBackground: `hover:from-${color}-200 hover:to-${color}-400`,
      text: "text-primary-foreground",
    },
    tertiary: {
      background: `bg-${color}-100`,
      hoverBackground: `hover:bg-${color}-50`,
      text: "text-primary-foreground",
    },
  };

  const colorStyles = colors[type] || colors.primary;

  return (
    <button
      className={`relative flex h-10  w-20 items-center justify-between rounded-lg border-2 border-tertiary p-3 font-poppins text-base font-semibold ${colorStyles.background} ${colorStyles.text} ${colorStyles.hoverBackground}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CustomButton;
