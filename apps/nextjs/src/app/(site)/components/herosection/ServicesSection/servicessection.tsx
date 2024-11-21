"use client";

import React, { useState } from "react";
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

  const itemsPerPage = 6;
  const totalPages = Math.ceil(servicesData.length / itemsPerPage);

  const handlePageChange = (index: number) => {
    setFade(true); // Trigger fade-out
    setTimeout(() => {
      setCurrentPage(index);
      setFade(false); // Trigger fade-in
    }, 300); // Match this with the fade-out duration
  };

  const currentServices = servicesData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  return (
    <div className={`${poppins.className} w-full bg-[#E2E8F0]`}>
      <div className="flex flex-col items-center justify-center px-[83px] py-[60px]">
        <h2 className="text-cp-primary text-center text-[42px] font-bold leading-[50px]">
          Bring Your Ideas to Life
        </h2>

        <div
          className={cn(
            "mt-[48px] grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2",
            fade ? "opacity-0 transition-opacity duration-300" : "opacity-100",
          )}
        >
          {currentServices.map((service) => {
            const Icon = iconComponents[service.icon] || (() => null);

            return (
              <Card
                key={service.id}
                className="h-[125px] w-[417px] rounded-lg border-none shadow-sm transition-shadow hover:shadow-md"
              >
                <CardContent className="flex h-full items-center px-[40px] py-[15px]">
                  <div className="flex flex-row items-center space-y-4 text-center">
                    <Icon className="text-cp-secondary h-[70px] w-[70px]" />
                    <div className="ml-3 flex flex-col items-start">
                      <h3 className="text-cp-primary text-[20px] font-bold leading-[28px]">
                        {service.title}
                      </h3>
                      <p className="text-[16px] font-normal leading-[22.5px] text-black">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-[16px] flex justify-center gap-6">
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
    </div>
  );
}
