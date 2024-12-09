"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Button } from "@voiceai/ui";
import { Card, CardContent } from "@voiceai/ui/@/components/ui/card";
import {
  FileImageIcon,
  IconAudioLines,
  IconBookPlus,
  IconBrainCog,
  IconClone,
  IconCopyright,
  IconEar,
  IconFileHeart,
  IconGlobe,
  IconGraduationCap,
  IconLibraryBig,
  IconMic2,
  IconNoAi,
} from "@voiceai/ui/@/components/ui/icons";
import { cn } from "@voiceai/ui/@/lib/utils";

import { poppins } from "~/app/fonts";
import { servicesData } from "./servicesdata";

const iconComponents = {
  IconAudioLines,
  IconBookPlus,
  IconBrainCog,
  IconFileHeart,
  IconGraduationCap,
  IconLibraryBig,
  IconMic2,
  IconClone,
  IconEar,
  IconGlobe,
  IconNoAi,
  FileImageIcon,
  IconCopyright,
};

export default function ServiceSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [fade, setFade] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth >= 1040 ? 6 : 3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(servicesData.length / itemsPerPage);

  const handlePageChange = (index: number) => {
    setFade(true);
    setTimeout(() => {
      setCurrentPage(index);
      setFade(false);
    }, 300);
  };

  const currentServices = servicesData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  return (
    <div
      className={`${poppins.className} h-full w-full items-center justify-center bg-[#E2E8F0] py-[32px] `}
    >
      <div className="mx-auto h-[68px] w-[263px]">
        <h2 className="text-cp-primary text-center text-[28px] font-bold leading-[34px]  lg:text-[42px] lg:leading-[50px]">
          Bring Your Ideas to Life
        </h2>
      </div>
      <div className=" mx-auto  mt-6 h-[305px] w-[312px] flex-col items-center justify-center lg:px-[83px] lg:py-[60px]">
        <div
          className={cn(
            "mt-8 grid grid-cols-1 gap-4 lg:mt-[48px] lg:grid-cols-2 lg:gap-6",
            fade ? "opacity-0 transition-opacity duration-300" : "opacity-100",
          )}
        >
          {currentServices.map((service) => {
            const Icon = iconComponents[service.icon] || (() => null);

            return (
              <Card
                key={service.id}
                className=" h-[94px]  w-[312px]  rounded-lg border-none shadow-sm transition-shadow hover:shadow-md"
              >
                <CardContent className="flex items-center p-[21px] lg:p-[40px]">
                  <div className="flex flex-row items-center space-y-2 text-left lg:space-y-4">
                    <Icon className="text-cp-secondary h-[52px] w-[52px] flex-shrink-0 lg:h-[70px] lg:w-[70px]" />
                    <div className="ml-3 flex flex-col items-start">
                      <h3 className="text-cp-primary text-[15px] font-bold leading-[21px] lg:text-[20px] lg:leading-[28px]">
                        {service.title}
                      </h3>
                      <p className="mt-1 text-[16px] font-normal leading-[17px] text-black lg:text-[16px] lg:leading-[22.5px]">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      <div className="mx-auto mt-6 flex items-center justify-center gap-4 lg:mt-[16px]">
        {Array.from({ length: totalPages }).map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            className={cn(
              "h-2 w-2 rounded-full p-0",
              currentPage === index ? "bg-blue-600" : "bg-blue-200",
            )}
            onClick={() => handlePageChange(index)}
          >
            <span className="sr-only">Page {index + 1}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
