import React from "react";

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  type?: "primary" | "secondary" | "tertiary";
}

const CustomButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "primary",
}) => {
  // Define styles based on the type
  const styles = {
    primary: {
      background: "bg-blue-400",
      hoverBackground: "hover:bg-blue-300",
      text: "text-primary-foreground",
      border: "border-blue-500",
    },
    secondary: {
      background: "bg-orange-400",
      hoverBackground: "hover:bg-orange-300",
      text: "text-primary-foreground",
      border: "border-orange-500",
    },
    tertiary: {
      background: "bg-gray-400",
      hoverBackground: "hover:bg-gray-300",
      text: "text-primary-foreground",
      border: "border-gray-500",
    },
  };

  const buttonStyles = styles[type] || styles.primary;

  return (
    <button
      className={`min-w-20 relative flex h-10 items-center justify-between rounded-lg border-2 p-3 font-poppins text-base font-semibold ${buttonStyles.background} ${buttonStyles.text} ${buttonStyles.hoverBackground} ${buttonStyles.border}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CustomButton;
