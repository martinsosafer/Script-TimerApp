"use client";

import React, { useState } from "react";

import { RevealText } from "~/app/animations/RevealText";
import VideoCards from "../components/masterclasses/videocards/videocards";
import videoCardData from "../components/masterclasses/videocards/videocardsdata";
import VideoCategories from "../components/masterclasses/videocategories/videocategories";

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    "Stories That Speed Sales",
  );

  const filteredVideos = selectedCategory
    ? videoCardData.filter((video) => video.course === selectedCategory)
    : videoCardData;

  return (
    <section className="flex-start mb-16 flex-col px-5 py-6 lg:px-20">
      <div className="mt-3 flex items-center justify-center">
        <div>
          <h1 className="text-center font-poppins text-3xl  font-bold  text-secondary-foreground">
            Masterclasses
          </h1>
          <RevealText>
            <p className="mb-4 mt-4 text-center text-lg  font-medium text-secondary-foreground">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam
              ipsa voluptates nemo distinctio id! Atque accusamus itaque illum
              eos sapiente quis dolor repudiandae beatae. Nisi sequi praesentium
              corrupti. Atque, non!
            </p>
          </RevealText>
        </div>
      </div>
      <VideoCategories onSelectCategory={setSelectedCategory} />

      <VideoCards videos={filteredVideos} />
    </section>
  );
}
