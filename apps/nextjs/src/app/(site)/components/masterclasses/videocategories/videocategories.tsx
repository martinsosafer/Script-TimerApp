import React from "react";

import CustomButton from "../../custom-button";

const VideoCategories: React.FC = () => {
  return (
    <div className="mb-4  flex   gap-4">
      <CustomButton type="primary">Category 1</CustomButton>
      <CustomButton type="primary">Category 2</CustomButton>
      <CustomButton type="primary">Category 3</CustomButton>
      <CustomButton type="primary">Category 4</CustomButton>
    </div>
  );
};

export default VideoCategories;
