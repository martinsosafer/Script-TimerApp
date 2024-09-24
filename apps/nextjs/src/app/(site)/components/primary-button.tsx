import type { MouseEvent, ReactNode } from "react";
import React from "react";

interface ButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}

const PrimaryButton: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="group relative flex items-center justify-center rounded-lg border border-secondarybutton bg-tertiary px-[10px] py-3   font-poppins  text-base font-medium text-black transition-all duration-300 ease-in-out  hover:bg-white hover:text-tertiary"
      onClick={onClick}
    >
      {children}
      <span className="ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-1">
        →
      </span>
    </button>
  );
};

export default PrimaryButton;
