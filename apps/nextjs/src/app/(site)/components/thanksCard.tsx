"use client";

import React from "react";


function ThanksCard() {
  return (
    <div className="relative w-full max-w-sm rounded-lg bg-gray-50/90 p-8 shadow-xl backdrop-blur-sm backdrop-filter">
       <div className="pointer-events-none absolute left-0 top-0 h-full w-full">
    
      </div>
      <div className="space-y-4">
        <div>SCRIPT TIMER LOGO</div>
        <h1 className="text-xl font-bold tracking-tighter text-primary sm:text-2xl">
          Thank you for your joining script-timer!
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 md:text-base/relaxed">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt
          consequatur repudiandae reprehenderit! Laboriosam magni quasi possimus
          sed officia?
        </p>
      </div>
     
    </div>
  );
}

export default ThanksCard;
