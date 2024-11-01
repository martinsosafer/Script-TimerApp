import React from "react";

const Logo = ({ className = "" }) => {
  return (
    <div className={`flex items-center `}>
      <span className="font-poppins text-5xl font-bold text-black">
        C
        <span className="relative -top-[5px] font-poppins text-4xl  font-bold">
          o
        </span>
        {/* Move "o" a bit higher */}
      </span>
      <span className="mx-1 text-black">-</span>
      <span className="font-poppins text-5xl font-bold text-primary">P</span>
      <span className="relative -top-[2.5px] font-poppins text-4xl font-bold text-primary">
        roducer
      </span>
    </div>
  );
};
// this is not updating
export default Logo;
