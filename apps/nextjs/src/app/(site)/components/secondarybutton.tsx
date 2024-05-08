import type { MouseEvent, ReactNode } from "react";
import React from "react";

interface ButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}

const SecondaryButton: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="relative flex h-10  w-20  items-center justify-between rounded-lg border-2 border-tertiary bg-orange-400  p-3 font-poppins text-base font-semibold text-primary-foreground hover:bg-orange-300"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
