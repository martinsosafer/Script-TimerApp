"use client";

import React, { useState } from "react";

import CategoryButton from "../categorybutton/categorybutton";

interface VideoCategoriesProps {
  onSelectCategory: (category: string) => void;
}

const VideoCategories: React.FC<VideoCategoriesProps> = ({
  onSelectCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    "Stories That Speed Sales",
  );

  const categories = [
    "Stories That Speed Sales",
    "Lights, Camera, Sales",
    "Demo and Sell: Shortcut to the Finals",
    "Delivering a Great Virtual Sales Pitch",
    "Building Rapport on Virtual Sales Calls",
  ];

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  return (
    <div className="mb-4 flex gap-4">
      {categories.map((category) => (
        <CategoryButton
          key={category}
          category={category}
          isSelected={category === selectedCategory}
          onSelect={handleSelectCategory}
        />
      ))}
    </div>
  );
};

export default VideoCategories;
