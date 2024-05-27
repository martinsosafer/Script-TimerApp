"use client";

import React from "react";

import CustomButton from "../../custom-button";

interface VideoCategoriesProps {
  onSelectCategory: (category: string) => void;
}

const VideoCategories: React.FC<VideoCategoriesProps> = ({
  onSelectCategory,
}) => {
  const categories = [
    "Stories That Speed Sales",
    "Lights, Camera, Sales",
    "Demo and Sell: Shortcut to the Finals",
    "Delivering a Great Virtual Sales Pitch",
    "Building Rapport on Virtual Sales Calls",
  ];

  return (
    <div className="mb-4 flex gap-4">
      {categories.map((category) => (
        <CustomButton
          key={category}
          type="primary"
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </CustomButton>
      ))}
    </div>
  );
};

export default VideoCategories;
