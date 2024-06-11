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
    ? "bg-blue-500 text-white"
    : "bg-gray-200 text-black";

  return (
    <button
      className={`rounded px-4 py-2 ${buttonStyle}`}
      onClick={() => onSelect(category)}
    >
      <h2 className=" font-poppins text-lg text-black">{category}</h2>
    </button>
  );
};

export default CategoryButton;
