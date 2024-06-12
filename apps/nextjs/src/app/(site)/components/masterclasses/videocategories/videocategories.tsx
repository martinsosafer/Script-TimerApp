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
    "Stories That Transform Marketing",
    "How to Create Stunning Videos",
    "Present and Win Your Audience",
    "Create with Hollywood Movie Storylines",
    "How to Build Rapport with Your Audience",
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
