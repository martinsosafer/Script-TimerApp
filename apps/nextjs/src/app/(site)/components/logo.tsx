import React from "react";

const Logo = ({ className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="font-poppins font-bold text-black">
        C<span className="relative -top-[2px]">o</span>
        {/* Move "o" a bit higher */}
      </span>
      <span className="mx-1 text-black">-</span>
      <span className="font-poppins font-bold text-primary">Producer</span>
    </div>
  );
};

export default Logo;
