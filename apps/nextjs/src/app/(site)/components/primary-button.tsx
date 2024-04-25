import type { MouseEvent, ReactNode } from "react";
import React from "react";

interface ButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}

const PrimaryButton: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="rounded-lg border-2 border-primary bg-gradient-to-br from-blue-300 to-blue-700 px-4 py-3 font-semibold text-white transition duration-300 hover:border-blue-900 hover:bg-blue-900"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
