import type { MouseEvent, ReactNode } from "react";
import React from "react";

interface ButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}

const PrimaryButton: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="group relative flex items-center justify-center rounded-lg border border-secondarybutton bg-white px-[10px] py-3  text-base font-medium text-secondarybutton transition-all duration-300 ease-in-out hover:bg-secondarybutton hover:text-white"
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
