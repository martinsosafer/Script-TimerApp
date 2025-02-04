"use client";

import { useEffect, useState } from "react";

import { poppins } from "~/app/fonts";
import ServiceCard from "./service-card";
import { servicesData } from "./servicesdata";

export default function ServiceSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth >= 1040 ? 6 : 3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(servicesData.length / itemsPerPage);

  const currentServices = servicesData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  return (
    <div
      className={`${poppins.className} flex w-full flex-col items-center justify-center bg-[#E2E8F0] py-8`}
    >
      <div className="flex w-[1024] flex-col items-center px-6 lg:px-10">
        <h2 className="text-cp-primary w-full text-center text-[28px] font-bold leading-[33px] lg:w-[720px] lg:text-[34px] lg:leading-[40px]">
          Bring Your Ideas to Life
        </h2>
      </div>

      <div className="-mt-6 flex scale-75 flex-col items-center gap-6 lg:mt-12 lg:max-h-[440px] lg:w-[860px] lg:scale-100 lg:flex-wrap lg:justify-center lg:gap-6">
        {currentServices.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            Icon={service.icon}
          />
        ))}
      </div>

      <div className="-mt-4 flex items-center justify-center gap-4 lg:mt-[16px]">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full p-0 ${currentPage === index ? "bg-cp-primary" : "bg-blue-200"}`}
            onClick={() => setCurrentPage(index)}
          />
        ))}
      </div>
    </div>
  );
}
