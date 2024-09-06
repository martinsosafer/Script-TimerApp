// TTVIntroBlock.jsx
import React from "react";

import IntroParagraph from "./introparagraph/introparagraph";

const TTVIntroBlock = ({ subscriptionData, credits }) => {
  return (
    <div className="mb-6 mt-8 flex items-center justify-center">
      <div>
        <h1 className="text-center font-poppins text-3xl font-bold leading-tight tracking-tight text-primary xl:text-3xl xl:font-extrabold">
          Text to Voice
        </h1>
        <IntroParagraph status={subscriptionData?.status} credits={credits} />
      </div>
    </div>
  );
};

export default TTVIntroBlock;
