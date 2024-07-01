"use client";

import React from "react";

interface CategoryButtonProps {
  category: string;
  isSelected: boolean;
  onSelect: (category: string) => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  category,
  isSelected,
  onSelect,
}) => {
  const buttonStyle = isSelected
    ? "bg-blue-500 text-white border-black border"
    : "bg-white  text-blue-500 border-black border";

  return (
    <button
      className={`rounded px-4 py-2 hover:bg-blue-200 ${buttonStyle}`}
      onClick={() => onSelect(category)}
    >
      <h2 className=" font-poppins text-lg font-semibold ">{category}</h2>
    </button>
  );
};

export default CategoryButton;
