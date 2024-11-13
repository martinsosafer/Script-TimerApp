interface ButtonProps {
  label: string;
  type: "primary" | "secondary" | "accent";
  onClick: () => void;
  icon?: React.ReactNode;
  fit?: boolean;
  hight?: string;
  disabled?: boolean;
  className?: string; // Add className prop here
}

const style: Record<string, string> = {
  primary:
    "bg-cp-primary rounded-md py-[12px] px-[24px] text-white flex items-center justify-center text-center text-[16px] font-medium hover:bg-cp-primary/80 hover:shadow-md transition-all duration-300 disabled:bg-cp-primary/50 disabled:cursor-default",
  secondary:
    "bg-white border-2 border-cp-primary text-cp-primary rounded-md py-[12px] px-[24px] flex items-center justify-center text-center text-[16px] font-medium hover:border-cp-primary/80 hover:text-cp-primary/80 hover:shadow-md transition-all duration-300 disabled:border-cp-primary/50 disabled:text-cp-primary/50 disabled:cursor-default",
  accent:
    "bg-cp-secondary rounded-md py-[12px] px-[24px] text-white flex items-center text-center justify-center text-[16px] font-medium hover:bg-cp-secondary-light hover:shadow-md transition-all duration-300 disabled:bg-cp-secondary-lightest disabled:cursor-default disabled:hover:shadow-none",
};

export default function Button({
  label,
  type,
  onClick,
  icon,
  fit = false,
  hight = "h-[48px]",
  disabled = false,
  className = "",
}: ButtonProps) {
  return (
    <button
      className={`${style[type]} ${fit ? "w-full" : ""} ${hight} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label} {icon}
    </button>
  );
}
