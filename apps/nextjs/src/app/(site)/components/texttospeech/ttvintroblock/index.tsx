// TTVIntroBlock.jsx
import React from "react";

import IntroParagraph from "./introparagraph/introparagraph";

const TTVIntroBlock = ({ subscriptionData, credits }) => {
  return (
    <div className="mb-6 mt-6 flex items-center justify-center">
      <div>
        <h1 className="mb-3 text-center font-poppins text-3xl font-bold text-secondary-foreground">
          Text to Voice
        </h1>
        <IntroParagraph status={subscriptionData?.status} credits={credits} />
      </div>
    </div>
  );
};

export default TTVIntroBlock;
